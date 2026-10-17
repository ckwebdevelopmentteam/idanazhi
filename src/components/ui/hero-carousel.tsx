"use client"

// A full-bleed editorial hero driven by a filmstrip.
//
// Every card shares one top edge. The focused card unfurls to full height while
// its neighbours stay clipped to half, so the strip reads as a row of cropped
// heads with one complete portrait standing in the middle of it. Changing the
// focus re-grades the whole background to that image.
//
// Geometry is measured, never hard-coded: one ResizeObserver reads the stage and
// every size below is a ratio of it, so the same component is pixel-identical in
// a 600px preview box and on a 4K display.
import * as React from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface HeroCarouselItem {
  /** Stable key; falls back to the index. @default undefined */
  id?: string | number
  /** Headline for the active slide. Newlines become separate reveal lines. */
  title: string
  /** Image URL, used both in the card and as the graded background. */
  image: string
  /** Byline printed beside the headline, e.g. "BY AURELIA STUDIO." @default undefined */
  credit?: string
  /** Right-aligned facts, e.g. ["SAT NOV 15", "5-10 PM", "MIAMI"]. @default undefined */
  meta?: string[]
  /**
   * CSS colour the background is graded to. The photo keeps its luminance and
   * takes this hue, which is what makes the backdrop swing on every change.
   * @default "#8a8a8a"
   */
  accent?: string
  /** Optional subtitle or room category for card badges/captions */
  subtitle?: string
}

export interface HeroCarouselProps {
  /** Slides, in strip order. */
  items: HeroCarouselItem[]
  /** Focused slide when controlled. Leave unset for internal state. @default undefined */
  index?: number
  /** Focused slide on mount when uncontrolled. @default 0 */
  defaultIndex?: number
  /** Fires on every focus change, from any input. @default undefined */
  onIndexChange?: (index: number) => void
  /** Wordmark in the middle of the top bar. @default undefined */
  brand?: React.ReactNode
  /** Renders the "Back" control when provided. @default undefined */
  onBack?: () => void
  /** Renders the "Menu" control when provided. @default undefined */
  onMenu?: () => void
  /** Advance on a timer. Pauses on hover, drag and focus. @default false */
  autoplay?: boolean
  /** Milliseconds between autoplay steps. @default 4000 */
  autoplayDelay?: number
  /** Extra classes for the stage. @default undefined */
  className?: string
  /**
   * Display mode:
   * - "full": Complete editorial hero with background swap, top bar, and large headline
   * - "cards-only": Pure filmstrip carousel of cards without background image, text overlays, or top bar
   * @default "full"
   */
  mode?: "full" | "cards-only"
  /** Explicit height for active card in cards-only mode. Defaults to responsive clamp. */
  cardHeight?: number
  /** Color theme for rail and controls: "light" (on dark backgrounds) or "dark" (on light paper backgrounds) @default "light" */
  theme?: "light" | "dark"
  /** Whether to show card title/metadata overlay on the focused card in cards-only mode @default true */
  showCardOverlay?: boolean
  /** Action button text on the expanded card in cards-only mode. Set to false to disable. @default "BOOK NOW" */
  actionLabel?: string | false
  /** Callback fired when the expanded card action button is clicked */
  onCardAction?: (item: HeroCarouselItem, index: number) => void
}

/* Ratios lifted from the reference layout, all relative to the stage box. */
const CARD_H = 0.264 // active card height ÷ stage height
const CARD_AR = 0.75 // active card is 3:4
const GAP = 0.038 // gap ÷ card width
const STRIP_TOP = 0.5 // strip's shared top edge, down the stage
const TITLE = 0.067 // headline cap size ÷ stage height
const LABEL = 0.0103 // small mono label ÷ stage height
const PAD = 0.017 // page gutter ÷ stage width

/** Wheel distance that commits to a step, and the lockout after one. */
const WHEEL_THRESHOLD = 60
const WHEEL_COOLDOWN = 420

/* Film grain, as a self-contained SVG so the component carries no assets. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

export function HeroCarousel({
  items,
  index: controlled,
  defaultIndex = 0,
  onIndexChange,
  brand,
  onBack,
  onMenu,
  autoplay = false,
  autoplayDelay = 4000,
  className,
  mode = "full",
  cardHeight,
  theme = "light",
  showCardOverlay = true,
  actionLabel = "BOOK NOW",
  onCardAction,
}: HeroCarouselProps) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
    h: typeof window !== "undefined" ? window.innerHeight : 700,
  })
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const [dragging, setDragging] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [hoveredRailIndex, setHoveredRailIndex] = React.useState<number | null>(null)
  const [hoverRailRatio, setHoverRailRatio] = React.useState(0.5)
  const [showNumberPicker, setShowNumberPicker] = React.useState(false)
  const reduced = useReducedMotion()

  const isCardsOnly = mode === "cards-only"
  const isDarkTheme = theme === "dark" // "dark" means dark text/lines for light paper background

  const last = items.length - 1
  const index = clamp(controlled ?? uncontrolled, 0, Math.max(0, last))

  const go = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, Math.max(0, last))
      if (controlled === undefined) setUncontrolled(clamped)
      if (clamped !== index) onIndexChange?.(clamped)
    },
    [controlled, index, last, onIndexChange]
  )

  // One observer feeds every measurement below.
  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const read = () =>
      setBox({ w: stage.clientWidth, h: stage.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  // In cards-only mode, compute card dimensions gracefully relative to stage width
  const fullH = isCardsOnly
    ? (cardHeight
        ? Math.min(cardHeight, Math.round(box.w * 0.84))
        : clamp(Math.round(box.w < 640 ? box.w * 0.78 : box.w < 1024 ? 380 : 420), 260, 460))
    : clamp(box.h * CARD_H, 96, 360)

  const halfH = Math.round(fullH * 0.5)
  const cardW = Math.round(fullH * CARD_AR)
  const gap = Math.max(12, Math.round(cardW * (isCardsOnly ? 0.05 : GAP)))
  const step = cardW + gap
  const pad = Math.max(16, Math.round(box.w * (isCardsOnly ? 0.03 : PAD)))
  const label = Math.max(11, Math.round(isCardsOnly ? 12 : box.h * LABEL))

  // Centre the focused card: the track slides, the card never moves itself.
  const xFor = React.useCallback(
    (i: number) => box.w / 2 - (i * step + cardW / 2),
    [box.w, step, cardW]
  )
  const x = useMotionValue(xFor(index))
  const target = xFor(index)

  const swing = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: "easeOut" as const }
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 34, mass: 0.9 }

  // The track is driven by a motion value rather than an `animate` prop so a
  // drag that starts mid-spring reads the real position, not where the spring
  // was headed - otherwise the release snaps a card off.
  React.useEffect(() => {
    if (dragging) return
    const run = animate(x, target, spring)
    return () => run.stop()
  }, [target, dragging, reduced, x]) // eslint-disable-line react-hooks/exhaustive-deps

  // Wheel and trackpad. Both axes step the strip.
  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let acc = 0
    let until = 0

    const onWheel = (e: WheelEvent) => {
      // Trackpads report the dominant axis; take whichever is stronger.
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      // Scroll chaining: once the strip is against an end, hand the gesture
      // back to the page.
      const stuck = (delta > 0 && index === last) || (delta < 0 && index === 0)
      if (stuck) {
        acc = 0
        return
      }
      e.preventDefault()
      const now = e.timeStamp
      if (now < until) return
      acc += delta
      if (Math.abs(acc) < WHEEL_THRESHOLD) return
      go(index + Math.sign(acc))
      acc = 0
      until = now + WHEEL_COOLDOWN
    }

    stage.addEventListener("wheel", onWheel, { passive: false })
    return () => stage.removeEventListener("wheel", onWheel)
  }, [go, index, last])

  React.useEffect(() => {
    if (!autoplay || paused || dragging || items.length < 2) return
    const id = window.setTimeout(
      () => go(index === last ? 0 : index + 1),
      autoplayDelay
    )
    return () => window.clearTimeout(id)
  }, [autoplay, autoplayDelay, dragging, go, index, items.length, last, paused])

  const active = items[index]
  if (!active) return null

  const lines = active.title.split("\n")
  const accent = active.accent ?? "#8a8a8a"

  // Cards-only strip stage height: full card height + rail spacing
  const stripStageStyle: React.CSSProperties = isCardsOnly
    ? { height: `${fullH + 72}px` }
    : {}

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Accommodations carousel"
      onKeyDown={(e) => {
        const keys: Record<string, number> = {
          ArrowLeft: index - 1,
          ArrowRight: index + 1,
          Home: 0,
          End: last,
        }
        if (!(e.key in keys)) return
        e.preventDefault()
        go(keys[e.key]!)
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={stripStageStyle}
      className={cn(
        "relative w-full overflow-hidden select-none outline-none",
        isCardsOnly
          ? "bg-transparent min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]"
          : "h-full min-h-[24rem] bg-black text-white focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-inset",
        className
      )}
    >
      {/* ── BACKGROUND: ONLY RENDERED IN FULL MODE ── */}
      {!isCardsOnly && (
        <>
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={swing}
            >
              <motion.img
                src={active.image}
                alt=""
                aria-hidden
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: reduced ? 1.28 : 1.42 }}
                animate={{ scale: 1.28 }}
                transition={reduced ? { duration: 0 } : { duration: 6, ease: "linear" }}
              />
              {/* Keep the photo's luminance, take the accent's hue. */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: accent, mixBlendMode: "color" }}
              />
              <div
                className="absolute inset-0 opacity-55"
                style={{ backgroundColor: accent, mixBlendMode: "multiply" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Legibility wash + grain, above the swap so they never flicker. */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/45" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
            style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
          />

          {/* ── Top bar: a centred cluster, not edge-to-edge ── */}
          <div
            className="absolute inset-x-0 flex items-center justify-center"
            style={{ top: Math.max(16, box.h * 0.029), gap: `${Math.max(20, box.w * 0.06)}px` }}
          >
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="opacity-90 transition-opacity hover:opacity-100"
                style={{ fontSize: label * 1.15 }}
              >
                <span aria-hidden>↖</span> Back
              </button>
            ) : null}
            {brand ? (
              <div
                className="font-semibold tracking-[0.06em]"
                style={{ fontSize: label * 1.35 }}
              >
                {brand}
              </div>
            ) : null}
            {onMenu ? (
              <button
                type="button"
                onClick={onMenu}
                className="opacity-90 transition-opacity hover:opacity-100"
                style={{ fontSize: label * 1.15 }}
              >
                Menu <span aria-hidden>☰</span>
              </button>
            ) : null}
          </div>

          {/* ── Headline block, sitting just above the strip's top edge ── */}
          <div
            className="absolute inset-x-0 top-0 flex flex-col justify-end"
            style={{
              height: `${STRIP_TOP * 100}%`,
              paddingLeft: pad,
              paddingRight: pad,
              paddingBottom: Math.round(box.h * 0.028),
            }}
          >
            <div className="flex w-full flex-wrap items-end gap-x-[6vw] gap-y-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h2
                  key={index}
                  className="font-semibold leading-[0.88] tracking-[-0.03em]"
                  style={{ fontSize: Math.max(24, Math.round(box.h * TITLE)) }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                >
                  {lines.map((line, i) => (
                    <span key={i} className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { duration: 0.62, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
                        }
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </motion.h2>
              </AnimatePresence>

              {active.credit ? (
                <motion.p
                  key={`credit-${index}`}
                  className="font-mono uppercase tracking-[0.14em] opacity-80"
                  style={{ fontSize: label }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {active.credit}
                </motion.p>
              ) : null}

              {active.meta?.length ? (
                <div
                  className="ml-auto flex items-end"
                  style={{ gap: `${Math.max(16, box.w * 0.055)}px` }}
                >
                  {active.meta.map((fact, i) => (
                    <motion.span
                      key={`${index}-${fact}`}
                      className="font-mono whitespace-nowrap uppercase tracking-[0.14em] opacity-80"
                      style={{ fontSize: label }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      transition={
                        reduced ? { duration: 0 } : { duration: 0.45, delay: 0.12 + i * 0.06 }
                      }
                    >
                      {fact}
                    </motion.span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}

      {/* ── THE STRIP: One shared top edge, the focused card twice as tall ── */}
      <div
        className="absolute inset-x-0"
        style={{
          top: isCardsOnly ? 0 : `${STRIP_TOP * 100}%`,
          height: fullH,
        }}
      >
        <motion.div
          className="flex items-start"
          style={{ gap, x, cursor: dragging ? "grabbing" : "grab" }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: xFor(last), right: xFor(0) }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false)
            // Land on whatever card the release sits nearest, nudged by throw velocity
            const thrown = x.get() + info.velocity.x * 0.12
            go(Math.round((box.w / 2 - thrown - cardW / 2) / step))
          }}
        >
          {items.map((item, i) => {
            const isCurrent = i === index
            return (
              <motion.div
                key={item.id ?? i}
                role="button"
                tabIndex={0}
                aria-label={item.title.replace(/\n/g, " ")}
                aria-current={isCurrent}
                onClick={() => go(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    go(i)
                  }
                }}
                className={cn(
                  "relative shrink-0 overflow-hidden text-left focus:outline-none transition-shadow duration-300",
                  isCardsOnly
                    ? "rounded-[3px] shadow-[0_8px_24px_rgba(40,20,10,0.08)] hover:shadow-[0_12px_32px_rgba(40,20,10,0.14)] bg-linen/30 cursor-pointer"
                    : "rounded-none bg-white/5"
                )}
                style={{ width: cardW }}
                animate={{ height: isCurrent ? fullH : halfH }}
                transition={spring}
              >
                {/* The focused card is exactly 3:4. Unfocused neighbour cards are clipped to half height */}
                <img
                  src={item.image}
                  alt={item.title.replace(/\n/g, " ")}
                  draggable={false}
                  className="h-full w-full object-cover select-none pointer-events-none"
                  style={{ objectPosition: "50% 26%" }}
                />

                {/* Unfocused cards sit back with a soft tint */}
                <motion.span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 pointer-events-none transition-colors",
                    isCardsOnly ? "bg-paper/35" : "bg-black"
                  )}
                  animate={{ opacity: isCurrent ? 0 : isCardsOnly ? 0.35 : 0.12 }}
                  transition={spring}
                />

                {/* Subtle border outline for crisp definition */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 pointer-events-none border transition-colors duration-300",
                    isCurrent
                      ? (isDarkTheme ? "border-ink/25" : "border-white/30")
                      : "border-transparent"
                  )}
                />

                {/* Optional overlay label on the focused card in cards-only mode */}
                {isCardsOnly && showCardOverlay && (
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none"
                    initial={false}
                    animate={{ opacity: isCurrent ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.subtitle && (
                      <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/80 m-0 mb-1">
                        {item.subtitle}
                      </p>
                    )}
                    <h3 className="font-sans font-medium text-[15px] sm:text-[17px] text-white leading-tight tracking-[-0.01em] m-0">
                      {item.title.replace(/\n/g, " ")}
                    </h3>
                    {item.meta && item.meta.length > 0 && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                        {item.meta.slice(0, 2).map((m, idx) => (
                          <span
                            key={idx}
                            className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.12em] text-white/70"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                    {actionLabel && isCurrent && (
                      <div className="mt-2.5 sm:mt-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onCardAction?.(item, i)
                          }}
                          className={cn(
                            "pointer-events-auto w-full inline-flex items-center justify-between",
                            "px-3 py-2 sm:py-2.5",
                            "border border-white/80 bg-black/40 hover:bg-white hover:text-ink hover:border-white",
                            "backdrop-blur-sm text-white font-sans text-[10px] sm:text-[10.5px] font-normal tracking-[0.2em] uppercase",
                            "transition-all duration-300 ease-out cursor-pointer select-none group"
                          )}
                        >
                          <span>{actionLabel}</span>
                          <ArrowRight
                            size={14}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                          />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* ── POSITION RAIL & INDICATOR IN SAME LINE MATCHING WEDDING INTRO ── */}
      <div
        className="absolute flex items-center justify-center gap-3 z-20"
        style={{
          left: isCardsOnly ? "50%" : pad,
          bottom: isCardsOnly ? 8 : Math.max(14, box.h * 0.022),
          transform: isCardsOnly ? "translateX(-50%)" : "none",
        }}
      >
        {/* Number Selector Popover to select card by number */}
        <AnimatePresence>
          {showNumberPicker && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.16 }}
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-[#fbfaf7] text-ink border border-ink/20 shadow-2xl rounded-[6px] p-1.5 flex items-center gap-1 z-50 whitespace-nowrap"
            >
              <span className="text-[10px] uppercase font-mono text-muted tracking-wider px-1.5">
                Card:
              </span>
              {items.map((it, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    go(idx)
                    setShowNumberPicker(false)
                  }}
                  onMouseEnter={() => go(idx)}
                  className={cn(
                    "w-7 h-7 rounded-[3px] font-mono text-[11px] font-medium transition-colors flex items-center justify-center cursor-pointer",
                    index === idx
                      ? "bg-ink text-white font-semibold shadow-sm"
                      : "text-ink/70 hover:bg-ink/10 hover:text-ink"
                  )}
                  title={it.title.replace(/\n/g, " ")}
                >
                  {String(idx + 1).padStart(2, "0")}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Number Button: Click to select card by number */}
        <button
          type="button"
          onClick={() => setShowNumberPicker((v) => !v)}
          title="Click to select card by number"
          className={cn(
            "font-mono tracking-[0.16em] font-semibold tabular-nums cursor-pointer transition-all hover:scale-110",
            isDarkTheme ? "text-ink hover:text-forest" : "text-white hover:text-white/80"
          )}
          style={{ fontSize: 11 }}
        >
          {String((hoveredRailIndex !== null ? hoveredRailIndex : index) + 1).padStart(2, "0")}
        </button>

        {/* Interactive Progress Line: hover along the line to scrub/get the card, click to select */}
        <div
          role="slider"
          aria-valuemin={1}
          aria-valuemax={items.length}
          aria-valuenow={index + 1}
          tabIndex={0}
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            if (!rect.width) return
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length))
            setHoverRailRatio(ratio)
            setHoveredRailIndex(targetIdx)
            go(targetIdx)
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            if (!rect.width) return
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length))
            setHoverRailRatio(ratio)
            setHoveredRailIndex(targetIdx)
            go(targetIdx)
          }}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            if (!rect.width) return
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length))
            setHoverRailRatio(ratio)
            setHoveredRailIndex(targetIdx)
            go(targetIdx)
          }}
          onPointerLeave={() => {
            setHoveredRailIndex(null)
          }}
          onMouseLeave={() => {
            setHoveredRailIndex(null)
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            if (!rect.width) return
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length))
            go(targetIdx)
          }}
          onTouchStart={(e) => {
            const touch = e.touches[0]
            if (!touch) return
            const rect = e.currentTarget.getBoundingClientRect()
            if (!rect.width) return
            const ratio = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
            const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length))
            go(targetIdx)
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0]
            if (!touch) return
            const rect = e.currentTarget.getBoundingClientRect()
            if (!rect.width) return
            const ratio = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
            const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length))
            go(targetIdx)
          }}
          className="relative py-2.5 -my-2.5 cursor-pointer flex items-center touch-pan-x"
        >
          {/* Floating Card Preview on Hovering the line */}
          <AnimatePresence>
            {hoveredRailIndex !== null && items[hoveredRailIndex] && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-full mb-3 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center"
                style={{ left: `${hoverRailRatio * 100}%` }}
              >
                <div className="bg-[#fbfaf7] text-ink border border-ink/20 shadow-2xl rounded-[4px] p-1.5 flex flex-col gap-1 w-36">
                  <img
                    src={items[hoveredRailIndex].image}
                    alt=""
                    className="w-full h-20 object-cover rounded-[2px]"
                  />
                  <div className="flex items-center justify-between text-[10px] font-mono font-semibold px-0.5 pt-0.5">
                    <span className="text-ink font-bold">#{String(hoveredRailIndex + 1).padStart(2, "0")}</span>
                    <span className="truncate text-[9.5px] font-sans font-normal text-muted max-w-[85px]">
                      {items[hoveredRailIndex].title.replace(/\n/g, " ")}
                    </span>
                  </div>
                </div>
                <div className="w-2 h-2 rotate-45 bg-[#fbfaf7] border-r border-b border-ink/20 -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "w-28 sm:w-40 h-[2px] rounded-full overflow-hidden transition-all duration-200 hover:h-[3.5px]",
              isDarkTheme ? "bg-ink/15" : "bg-white/25"
            )}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300 ease-out",
                isDarkTheme ? "bg-ink" : "bg-white"
              )}
              style={{
                width: `${(((hoveredRailIndex !== null ? hoveredRailIndex : index) + 1) / items.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Total Number Button: Click to jump directly to the last card */}
        <button
          type="button"
          onClick={() => {
            go(items.length - 1)
          }}
          title={`Click to select card ${items.length}`}
          className={cn(
            "font-mono tracking-[0.16em] font-medium tabular-nums cursor-pointer transition-all hover:scale-110",
            isDarkTheme ? "text-muted hover:text-ink" : "text-white/70 hover:text-white"
          )}
          style={{ fontSize: 11 }}
        >
          {String(items.length).padStart(2, "0")}
        </button>
      </div>
    </div>
  )
}
export default HeroCarousel
