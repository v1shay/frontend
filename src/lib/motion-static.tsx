"use client"

/**
 * Static, zero-cost drop-in replacement for the subset of the `motion/react`
 * API used in this project.
 *
 * Every animation is removed: `motion.*` elements render as plain DOM nodes
 * with all animation-related props stripped, so content is always rendered in
 * its final, fully-visible state (no entrance/scroll/loop animations, no
 * rAF loops, and no scroll listeners). This guarantees the page loads instantly
 * with no jitter or lag.
 */

import * as React from "react"

// Animation/gesture props that must never reach a real DOM element.
const MOTION_PROPS = new Set<string>([
  "initial",
  "animate",
  "exit",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileInView",
  "whileDrag",
  "variants",
  "transition",
  "viewport",
  "layout",
  "layoutId",
  "layoutDependency",
  "layoutScroll",
  "layoutRoot",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragListener",
  "dragControls",
  "dragSnapToOrigin",
  "dragTransition",
  "dragPropagation",
  "onDrag",
  "onDragStart",
  "onDragEnd",
  "onDirectionLock",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onViewportEnter",
  "onViewportLeave",
  "onHoverStart",
  "onHoverEnd",
  "onTapStart",
  "onTap",
  "onTapCancel",
  "custom",
  "inherit",
  "transformTemplate",
  "values",
])

// Framer transform shorthands that are not valid CSS on a plain element.
const STYLE_OMIT = new Set<string>([
  "x",
  "y",
  "z",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skew",
  "skewX",
  "skewY",
  "originX",
  "originY",
  "originZ",
  "perspective",
  "transformPerspective",
])

function cleanStyle(style: unknown): React.CSSProperties | undefined {
  if (!style || typeof style !== "object") return style as undefined
  const source = style as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const key in source) {
    if (STYLE_OMIT.has(key)) continue
    out[key] = source[key]
  }
  return out as React.CSSProperties
}

function cleanProps(props: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key in props) {
    if (MOTION_PROPS.has(key)) continue
    if (key === "style") {
      out.style = cleanStyle(props.style)
      continue
    }
    out[key] = props[key]
  }
  return out
}

/* eslint-disable @typescript-eslint/no-explicit-any */

type PanInfo = {
  point: { x: number; y: number }
  delta: { x: number; y: number }
  offset: { x: number; y: number }
  velocity: { x: number; y: number }
}

// Animation/gesture props that motion components accept (and we discard).
// Drag handlers and `style` are typed loosely so inline handlers and framer
// transform shorthands (e.g. `style={{ y }}`) still type-check.
type MotionExtraProps = {
  initial?: any
  animate?: any
  exit?: any
  variants?: any
  transition?: any
  whileHover?: any
  whileTap?: any
  whileFocus?: any
  whileInView?: any
  whileDrag?: any
  viewport?: any
  layout?: any
  layoutId?: string
  custom?: any
  drag?: boolean | "x" | "y"
  dragConstraints?: any
  dragElastic?: any
  dragMomentum?: boolean
  onDrag?: (event: PointerEvent, info: PanInfo) => void
  onDragStart?: (event: PointerEvent, info: PanInfo) => void
  onDragEnd?: (event: PointerEvent, info: PanInfo) => void
  onAnimationComplete?: (definition: any) => void
  style?: any
}

type MotionProxy = {
  [K in keyof React.JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
    Omit<
      React.JSX.IntrinsicElements[K],
      "onDrag" | "onDragStart" | "onDragEnd" | "style"
    > &
      MotionExtraProps
  >
}

const componentCache = new Map<string, React.ForwardRefExoticComponent<any>>()

function createMotionComponent(tag: string) {
  const cached = componentCache.get(tag)
  if (cached) return cached

  const Component = React.forwardRef<unknown, Record<string, unknown>>(
    (props, ref) => React.createElement(tag, { ...cleanProps(props), ref })
  )
  Component.displayName = `motion.${tag}`
  componentCache.set(tag, Component)
  return Component
}

export const motion = new Proxy({} as MotionProxy, {
  get: (_target, key) => {
    if (typeof key !== "string") return undefined
    return createMotionComponent(key)
  },
}) as MotionProxy

export function AnimatePresence({
  children,
}: {
  children?: React.ReactNode
  mode?: "sync" | "wait" | "popLayout"
  initial?: boolean
  onExitComplete?: () => void
  [key: string]: unknown
}) {
  return React.createElement(React.Fragment, null, children)
}

export function useInView(..._args: unknown[]): boolean {
  return true
}

export function useReducedMotion(): boolean {
  // Report "reduced motion" so any remaining motion branches stay disabled.
  return true
}

export function useScroll(..._args: unknown[]) {
  return {
    scrollX: 0,
    scrollY: 0,
    scrollXProgress: 0,
    scrollYProgress: 0,
  }
}

export function useTransform(...args: unknown[]): unknown {
  // Signature: useTransform(value, input, output) -> return the first output.
  const output = args[2]
  if (Array.isArray(output)) return output[0]
  return 0
}

export function useSpring(value: unknown, ..._rest: unknown[]): unknown {
  // Pass through the (already-static) value.
  return typeof value === "object" ? 0 : value
}

export function useMotionValue<T>(initial: T) {
  return {
    get: () => initial,
    set: () => {},
    on: () => () => {},
    destroy: () => {},
  }
}

export function useMotionValueEvent(
  _value: unknown,
  _event: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _callback: (latest: any) => void
): void {
  // No-op: no scroll/motion listeners are attached.
}

export type Variants = Record<string, Record<string, unknown>>
export type MotionValue<T = number> = { get: () => T; set: (value: T) => void }
