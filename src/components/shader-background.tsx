"use client"

import type { ComponentProps, ReactNode } from "react"
import { Component } from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

import { shaderGradientConfig } from "@/lib/shader-config"

type ShaderGradientProps = ComponentProps<typeof ShaderGradient> & {
  axesHelper?: string
  destination?: string
  embedMode?: string
  format?: string
  frameRate?: number
  gizmoHelper?: string
}

class ShaderErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

function ShaderScene() {
  return (
    <div className="fixed inset-0 z-0">
      <ShaderGradientCanvas
        pointerEvents="none"
        pixelDensity={1}
        fov={45}
        style={{ width: "100%", height: "100%" }}
      >
        <ShaderGradient
          {...(shaderGradientConfig as unknown as ShaderGradientProps)}
        />
      </ShaderGradientCanvas>
    </div>
  )
}

export function ShaderBackground() {
  return (
    <ShaderErrorBoundary fallback={<div className="shader-fallback" aria-hidden="true" />}>
      <ShaderScene />
    </ShaderErrorBoundary>
  )
}
