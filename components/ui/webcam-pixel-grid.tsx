"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

export type WebcamPixelGridColorMode = "webcam" | "monochrome";

export interface WebcamPixelGridProps {
  /** Number of columns in the grid. */
  gridCols?: number;
  /** Number of rows in the grid. */
  gridRows?: number;
  /** Maximum elevation (pop) for motion detection, in abstract units. */
  maxElevation?: number;
  /** Motion sensitivity (0-1). Higher reacts to smaller movements. */
  motionSensitivity?: number;
  /** Smoothing factor for elevation transitions (0-1). Lower is smoother. */
  elevationSmoothing?: number;
  /** 'webcam' uses the real colors, 'monochrome' uses a single color. */
  colorMode?: WebcamPixelGridColorMode;
  /** Base color when in monochrome mode. */
  monochromeColor?: string;
  /** Background color behind the grid. */
  backgroundColor?: string;
  /** Whether to mirror the webcam feed (selfie view). */
  mirror?: boolean;
  /** Gap between cells (0-1, fraction of cell size). */
  gapRatio?: number;
  /** Invert the sampled colors. */
  invertColors?: boolean;
  /** Darken factor (0-1, 0 = no darkening, 1 = fully dark). */
  darken?: number;
  /** Border color for cells. */
  borderColor?: string;
  /** Border opacity (0-1). */
  borderOpacity?: number;
  /** Additional class name for the wrapper. */
  className?: string;
  /** Called when webcam access is denied or fails. */
  onWebcamError?: (error: Error) => void;
  /** Called when the webcam stream is ready and playing. */
  onWebcamReady?: () => void;
}

function hexToRgb(hex: string): [number, number, number] {
  let value = hex.replace("#", "").trim();
  if (value.length === 3) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(value, 16);
  if (Number.isNaN(int)) return [255, 255, 255];
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export const WebcamPixelGrid: React.FC<WebcamPixelGridProps> = ({
  gridCols = 64,
  gridRows = 48,
  maxElevation = 15,
  motionSensitivity = 0.4,
  elevationSmoothing = 0.1,
  colorMode = "webcam",
  monochromeColor = "#00ff88",
  backgroundColor = "#0a0a0a",
  mirror = true,
  gapRatio = 0.1,
  invertColors = false,
  darken = 0,
  borderColor = "#ffffff",
  borderOpacity = 0.08,
  className,
  onWebcamError,
  onWebcamReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sampleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  // Per-cell persistent state.
  const elevationsRef = useRef<Float32Array>(new Float32Array(gridCols * gridRows));
  const prevBrightnessRef = useRef<Float32Array>(new Float32Array(gridCols * gridRows));

  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Keep callbacks fresh without restarting the stream / animation loop.
  const onReadyRef = useRef(onWebcamReady);
  const onErrorRef = useRef(onWebcamError);
  useEffect(() => {
    onReadyRef.current = onWebcamReady;
    onErrorRef.current = onWebcamError;
  }, [onWebcamReady, onWebcamError]);

  // Reallocate per-cell buffers when the grid size changes.
  useEffect(() => {
    elevationsRef.current = new Float32Array(gridCols * gridRows);
    prevBrightnessRef.current = new Float32Array(gridCols * gridRows);
  }, [gridCols, gridRows]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const sampleCanvas = sampleCanvasRef.current;
    if (!canvas || !video || !sampleCanvas) return;

    const ctx = canvas.getContext("2d");
    const sampleCtx = sampleCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx || !sampleCtx) return;

    const videoReady = video.readyState >= 2 && video.videoWidth > 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssWidth = canvas.clientWidth || 1;
    const cssHeight = canvas.clientHeight || 1;
    const targetW = Math.round(cssWidth * dpr);
    const targetH = Math.round(cssHeight * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Paint background.
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let data: Uint8ClampedArray | null = null;
    if (videoReady) {
      // Downscale the webcam feed to the grid resolution.
      sampleCtx.save();
      if (mirror) {
        sampleCtx.translate(gridCols, 0);
        sampleCtx.scale(-1, 1);
      }
      // Cover-fit the video into the sample canvas.
      const vAspect = video.videoWidth / video.videoHeight;
      const gAspect = gridCols / gridRows;
      let sx = 0;
      let sy = 0;
      let sw = video.videoWidth;
      let sh = video.videoHeight;
      if (vAspect > gAspect) {
        sw = video.videoHeight * gAspect;
        sx = (video.videoWidth - sw) / 2;
      } else {
        sh = video.videoWidth / gAspect;
        sy = (video.videoHeight - sh) / 2;
      }
      sampleCtx.drawImage(video, sx, sy, sw, sh, 0, 0, gridCols, gridRows);
      sampleCtx.restore();
      data = sampleCtx.getImageData(0, 0, gridCols, gridRows).data;
    }

    const cellW = canvas.width / gridCols;
    const cellH = canvas.height / gridRows;
    const gap = Math.min(cellW, cellH) * Math.min(Math.max(gapRatio, 0), 0.9);
    const radius = Math.min(cellW, cellH) * 0.18;

    const [monoR, monoG, monoB] = hexToRgb(monochromeColor);
    const elevations = elevationsRef.current;
    const prevBrightness = prevBrightnessRef.current;
    const sensitivity = Math.min(Math.max(motionSensitivity, 0), 1);
    const smoothing = Math.min(Math.max(elevationSmoothing, 0), 1);
    const darkenFactor = 1 - Math.min(Math.max(darken, 0), 1);

    ctx.strokeStyle = borderColor;
    const useBorder = borderOpacity > 0;

    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const index = y * gridCols + x;
        const px = index * 4;

        let r = 20;
        let g = 20;
        let b = 20;
        if (data) {
          r = data[px];
          g = data[px + 1];
          b = data[px + 2];
        }

        if (invertColors) {
          r = 255 - r;
          g = 255 - g;
          b = 255 - b;
        }

        // Perceptual brightness used for motion detection.
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const motion = Math.abs(brightness - prevBrightness[index]);
        prevBrightness[index] = brightness;

        // Map motion -> target elevation, then ease toward it.
        const targetElevation =
          Math.min(motion / (1.01 - sensitivity), 1) * maxElevation;
        elevations[index] += (targetElevation - elevations[index]) * smoothing;
        const t = maxElevation > 0 ? elevations[index] / maxElevation : 0;

        // Elevated cells grow and brighten to feel like they pop forward.
        const scale = 1 + t * 0.35;
        const brighten = 1 + t * 0.6;

        let fr: number;
        let fg: number;
        let fb: number;
        if (colorMode === "monochrome") {
          const level = brightness * brighten;
          fr = monoR * level;
          fg = monoG * level;
          fb = monoB * level;
        } else {
          fr = r * brighten;
          fg = g * brighten;
          fb = b * brighten;
        }

        fr = Math.min(255, fr) * darkenFactor;
        fg = Math.min(255, fg) * darkenFactor;
        fb = Math.min(255, fb) * darkenFactor;

        const baseW = cellW - gap;
        const baseH = cellH - gap;
        const w = baseW * scale;
        const h = baseH * scale;
        const cx = x * cellW + cellW / 2;
        const cy = y * cellH + cellH / 2;
        const dx = cx - w / 2;
        const dy = cy - h / 2;

        ctx.fillStyle = `rgb(${fr | 0}, ${fg | 0}, ${fb | 0})`;
        ctx.beginPath();
        ctx.roundRect(dx, dy, w, h, radius);
        ctx.fill();

        if (useBorder) {
          ctx.globalAlpha = borderOpacity;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [
    backgroundColor,
    borderColor,
    borderOpacity,
    colorMode,
    darken,
    elevationSmoothing,
    gapRatio,
    gridCols,
    gridRows,
    invertColors,
    maxElevation,
    mirror,
    monochromeColor,
    motionSensitivity,
  ]);

  // Acquire the webcam once on mount.
  useEffect(() => {
    let cancelled = false;

    const video = document.createElement("video");
    video.playsInline = true;
    video.muted = true;
    videoRef.current = video;

    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = gridCols;
    sampleCanvas.height = gridRows;
    sampleCanvasRef.current = sampleCanvas;

    async function start() {
      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices?.getUserMedia
      ) {
        const err = new Error("Webcam API is not available in this browser.");
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(err.message);
          onErrorRef.current?.(err);
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        video.srcObject = stream;
        await video.play();
        if (cancelled) return;
        setStatus("ready");
        setErrorMessage(null);
        onReadyRef.current?.();
        rafRef.current = requestAnimationFrame(draw);
      } catch (error) {
        if (cancelled) return;
        const err =
          error instanceof Error ? error : new Error("Failed to access webcam.");
        setStatus("error");
        setErrorMessage(err.message);
        onErrorRef.current?.(err);
      }
    }

    start();

    return () => {
      cancelled = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      video.srcObject = null;
      videoRef.current = null;
      sampleCanvasRef.current = null;
    };
    // Restart only when the sample resolution changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridCols, gridRows]);

  // Keep the sample canvas sized to the grid.
  useEffect(() => {
    if (sampleCanvasRef.current) {
      sampleCanvasRef.current.width = gridCols;
      sampleCanvasRef.current.height = gridRows;
    }
  }, [gridCols, gridRows]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="text-sm font-medium text-white/90">
            Camera unavailable
          </p>
          <p className="max-w-xs text-xs text-white/60">
            {errorMessage ?? "Allow camera access to see the pixel grid."}
          </p>
        </div>
      )}
    </div>
  );
};

export default WebcamPixelGrid;
