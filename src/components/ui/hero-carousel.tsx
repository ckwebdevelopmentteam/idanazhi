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
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

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
const RAIL = 0.2 // progress rail width ÷ stage width

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
                            "transition-all duration-300 ease-out cursor-pointer group/btn"
                          )}
                        >
                          <span>{actionLabel}</span>
                          <ArrowRight
                            size={14}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
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

      {/* ── POSITION RAIL & CONTROLS ── */}
      <div
        className="absolute flex items-center gap-3.5"
        style={{
          left: isCardsOnly ? "50%" : pad,
          bottom: isCardsOnly ? 4 : Math.max(14, box.h * 0.022),
          width: isCardsOnly ? Math.min(360, box.w - 32) : box.w * RAIL,
          transform: isCardsOnly ? "translateX(-50%)" : "none",
        }}
      >
        {isCardsOnly && (
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous card"
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-opacity shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
              isDarkTheme ? "text-ink hover:bg-ink/10" : "text-white hover:bg-white/10"
            )}
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div className="flex-1">
          <div
            className={cn(
              "flex justify-between font-mono tabular-nums mb-1.5",
              isDarkTheme ? "text-ink/80" : "text-white/80"
            )}
            style={{ fontSize: label }}
          >
            <span className="font-semibold">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-muted/80">{String(items.length).padStart(2, "0")}</span>
          </div>
          <div
            className={cn(
              "relative h-[2px] w-full rounded-full overflow-hidden",
              isDarkTheme ? "bg-ink/15" : "bg-white/25"
            )}
          >
            <motion.div
              className={cn(
                "absolute inset-y-0 rounded-full",
                isDarkTheme ? "bg-forest" : "bg-white"
              )}
              style={{ width: `${100 / items.length}%` }}
              animate={{ left: `${(index / items.length) * 100}%` }}
              transition={spring}
            />
          </div>
        </div>

        {isCardsOnly && (
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === last}
            aria-label="Next card"
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-opacity shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
              isDarkTheme ? "text-ink hover:bg-ink/10" : "text-white hover:bg-white/10"
            )}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
export default HeroCarousel
