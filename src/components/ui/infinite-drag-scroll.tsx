"use client";

import {
  cubicBezier,
  motion,
  useMotionValue,
  wrap,
} from "framer-motion";
import {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Types
export type GridVariant = "default" | "masonry" | "polaroid";

// Create Context
const GridVariantContext = createContext<GridVariant | undefined>(undefined);

// Motion Variants for initial entrance animation
const rowVariants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: () => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: Math.random() * 0.35 + 0.1,
      duration: 0.9,
      ease: cubicBezier(0.18, 0.71, 0.11, 1),
    },
  }),
};

export const DraggableContainer = ({
  className,
  children,
  variant = "masonry",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: GridVariant;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const containerWrapperRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const handleIsDragging = () => setIsDragging(true);
  const handleIsNotDragging = () => setIsDragging(false);

  useEffect(() => {
    let xSub: (() => void) | undefined;
    let ySub: (() => void) | undefined;

    const setupWrapping = () => {
      const container = ref.current?.getBoundingClientRect();
      if (!container || container.width <= 0 || container.height <= 0) return;

      const { width, height } = container;
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      xSub?.();
      ySub?.();

      xSub = x.on("change", (latest) => {
        const wrappedX = wrap(-halfWidth, 0, latest);
        if (Math.abs(wrappedX - latest) > 0.5) {
          x.set(wrappedX);
        }
      });

      ySub = y.on("change", (latest) => {
        const wrappedY = wrap(-halfHeight, 0, latest);
        if (Math.abs(wrappedY - latest) > 0.5) {
          y.set(wrappedY);
        }
      });
    };

    setupWrapping();

    // Initial offset so user starts in the visual center of the photo field
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        x.set(-rect.width / 4);
        y.set(-rect.height / 4);
      }
    }

    window.addEventListener("resize", setupWrapping);

    return () => {
      xSub?.();
      ySub?.();
      window.removeEventListener("resize", setupWrapping);
    };
  }, [x, y, isDragging]);

  return (
    <GridVariantContext.Provider value={variant}>
      <div
        ref={containerWrapperRef}
        className="relative h-screen min-h-[100svh] max-h-[100svh] w-full overflow-hidden select-none bg-paper"
      >
        <motion.div className="h-full w-full overflow-hidden">
          <motion.div
            className={cn(
              "grid h-fit w-fit cursor-grab grid-cols-[repeat(2,1fr)] bg-paper active:cursor-grabbing will-change-transform",
              className,
            )}
            drag
            dragMomentum={true}
            dragTransition={{
              timeConstant: 220,
              power: 0.32,
              restDelta: 0,
              bounceStiffness: 0,
            }}
            onMouseDown={handleIsDragging}
            onMouseUp={handleIsNotDragging}
            onMouseLeave={handleIsNotDragging}
            style={{ x, y }}
            ref={ref}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </GridVariantContext.Provider>
  );
};

export const GridItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const variant = useContext(GridVariantContext);

  const gridItemStyles = cva(
    "overflow-hidden hover:cursor-pointer w-full h-full will-change-transform transition-all duration-300",
    {
      variants: {
        variant: {
          default: "rounded-2xl border border-line/30 shadow-lg hover:shadow-2xl bg-white",
          masonry:
            "even:mt-[50%] rounded-2xl border border-line/30 shadow-lg hover:shadow-2xl bg-white",
          polaroid:
            "border-[10px] border-b-[38px] border-white shadow-[0_12px_36px_rgba(124,64,46,0.14)] even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[50%] bg-white",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  return (
    <motion.div
      className={cn(gridItemStyles({ variant, className }))}
      variants={rowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export const GridBody = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const variant = useContext(GridVariantContext);

    const gridBodyStyles = cva("grid grid-cols-[repeat(6,1fr)] h-fit w-fit", {
      variants: {
        variant: {
          default: "gap-10 p-5 md:gap-16 md:p-10",
          masonry: "gap-x-10 px-5 md:gap-x-16 md:px-10",
          polaroid: "gap-x-12 px-6 md:gap-x-20 md:px-12",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    });

    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(gridBodyStyles({ variant, className }))}
          >
            {children}
          </div>
        ))}
      </>
    );
  },
);

GridBody.displayName = "GridBody";
