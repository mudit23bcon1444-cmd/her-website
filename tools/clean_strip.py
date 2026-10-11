#!/usr/bin/env python3
"""
tools/clean_strip.py
====================
Converts the filmstrip screenshot (which has a checkerboard baked into the
frame windows) into a true RGBA PNG where the 4 frame windows are alpha=0
and the dark film body remains opaque.

Strategy: instead of flood-fill (which stops at sprocket-hole dark edges),
we use a two-pass approach:
  1. Detect the 4 frame row-bands automatically from the luminance profile.
  2. Within each frame row-band, clear ALL pixels whose luminance > LUM_THRESH.
  3. Run one global pass to clear isolated bright pixels adjacent to
     already-transparent ones (catches seam pixels at frame edges).

Usage:
    python3 tools/clean_strip.py

Input:   assets/filmstrip.png        (generated image with light checkerboard)
Output:  assets/filmstrip-clean.png  (transparent windows, opaque dark body)
"""

import sys
from pathlib import Path
import numpy as np
from PIL import Image

# ── Paths ──────────────────────────────────────────────────────────────────
ROOT      = Path(__file__).resolve().parent.parent
SRC_PATH  = ROOT / "assets" / "filmstrip.png"
DST_PATH  = ROOT / "assets" / "filmstrip-clean.png"

# ── Tuning knobs ───────────────────────────────────────────────────────────
# Pixels with luminance >= this are treated as "frame window" (checkerboard)
LUM_THRESH = 170

# The sprocket columns are LEFT of x≈90 and right of x≈690 (out of 768).
# We never clear pixels in those columns to keep the sprocket body intact.
# (Sprocket holes themselves are small white dots we're fine clearing.)
# Actually we want to clear the entire window area, sprocket holes included,
# because they overlap the user's photos too. So no x-exclusion needed.

# Minimum height fraction of a detected window band
MIN_WIN_H_FRAC = 0.10   # windows should be at least 10% of image height


def luminance_map(arr):
    """Return float luminance array (H, W) from RGBA uint8 arr."""
    r = arr[:, :, 0].astype(np.float32)
    g = arr[:, :, 1].astype(np.float32)
    b = arr[:, :, 2].astype(np.float32)
    return 0.299*r + 0.587*g + 0.114*b


def detect_window_bands(lum: np.ndarray, H: int, W: int):
    """
    Detect rows that belong to frame windows by looking at the centre half
    of the image (x: 25%–75%) and finding rows where the MEDIAN luminance
    is above LUM_THRESH (these are checker-board / light frame rows).
    Returns list of (y_start, y_end) tuples.
    """
    cx0, cx1 = int(W * 0.25), int(W * 0.75)
    row_med = np.median(lum[:, cx0:cx1], axis=1)

    bands = []
    in_band = False
    by = 0
    for y in range(H + 1):
        v = row_med[y] if y < H else 0
        if not in_band and v > LUM_THRESH:
            in_band = True; by = y
        elif in_band and v <= LUM_THRESH:
            in_band = False
            bh = y - by
            if bh / H >= MIN_WIN_H_FRAC:
                bands.append((by, y))

    return bands


def main():
    if not SRC_PATH.exists():
        sys.exit(f"ERROR: source not found: {SRC_PATH}")

    print(f"Loading {SRC_PATH} …")
    img  = Image.open(SRC_PATH).convert("RGBA")
    W, H = img.size
    print(f"  size: {W}×{H}")

    arr  = np.array(img, dtype=np.uint8)
    lum  = luminance_map(arr)

    # ── 1. Detect frame window bands ───────────────────────────────────────
    bands = detect_window_bands(lum, H, W)
    print(f"\nDetected {len(bands)} window band(s):")
    for i, (ys, ye) in enumerate(bands):
        print(f"  Band {i+1}: y={ys}–{ye}  h={ye-ys}  ({ys/H:.4f}–{ye/H:.4f})")

    if len(bands) < 2:
        print("  ⚠  Too few bands detected – using hard-coded positions.")
        # Hard-coded for the 768×1376 filmstrip (from earlier luminance profiling)
        # band 1: y=72–351, band 2: y=390–669, band 3: y=707–986, band 4: y=1025–1320
        bands = [(72, 351), (390, 669), (707, 986), (1025, 1320)]

    # ── 2. Within each band, clear all bright pixels ───────────────────────
    print("\nClearing frame window pixels …")
    total_cleared = 0
    for i, (ys, ye) in enumerate(bands):
        band_lum = lum[ys:ye, :]
        bright   = band_lum >= LUM_THRESH
        arr[ys:ye, :, 3][bright] = 0
        n = int(bright.sum())
        total_cleared += n
        print(f"  Band {i+1} (y={ys}–{ye}): cleared {n:,} pixels")

    # ── 3. Clean isolated bright pixels adjacent to transparent ones ───────
    print("\nCleaning isolated bright pixels at seams …")
    alpha       = arr[:, :, 3]
    lum_fresh   = luminance_map(arr)
    transparent = (alpha == 0)
    bright_opq  = (alpha > 0) & (lum_fresh >= LUM_THRESH - 10)

    # Count transparent neighbours
    t = transparent.astype(np.float32)
    neighbours = (
        np.roll(t,  1, axis=0) + np.roll(t, -1, axis=0) +
        np.roll(t,  1, axis=1) + np.roll(t, -1, axis=1)
    )
    isolated = bright_opq & (neighbours >= 2)
    arr[isolated, 3] = 0
    n_iso = int(isolated.sum())
    total_cleared += n_iso
    print(f"  → {n_iso:,} isolated pixels cleared")
    print(f"  Total pixels cleared: {total_cleared:,}")

    # ── 4. Save ───────────────────────────────────────────────────────────
    result = Image.fromarray(arr, "RGBA")
    result.save(str(DST_PATH), "PNG")
    print(f"\n✅  Saved {DST_PATH}")

    # ── 5. Report detected window rects for JS fallback ───────────────────
    print("\n── Window rects in the cleaned PNG (copy into JS fallback) ──")
    alpha_final = arr[:, :, 3]
    trans_final = (alpha_final == 0)

    cx0, cx1 = int(W * 0.25), int(W * 0.75)
    row_t = trans_final[:, cx0:cx1].mean(axis=1)

    in_w, wins = False, []
    wy = 0
    for y in range(H + 1):
        v = row_t[y] if y < H else 0
        if not in_w and v > 0.4:
            in_w = True; wy = y
        elif in_w and v <= 0.4:
            in_w = False
            wh = y - wy
            if wh > H * 0.05:
                mid = (wy + y) // 2
                row = trans_final[mid, :]
                lx  = int(np.argmax(row))
                rx  = W - 1 - int(np.argmax(row[::-1]))
                wins.append((lx / W, wy / H, (rx - lx) / W, wh / H))

    for i, (x, y, w, h) in enumerate(wins[:4]):
        print(f"  Frame {i+1}: left={x:.4f}  top={y:.4f}  w={w:.4f}  h={h:.4f}")

    if not wins:
        print("  (No rects detected – JS will use hard-coded fallback.)")


if __name__ == "__main__":
    main()
