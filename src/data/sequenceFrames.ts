// 120 sequentially named frames in public/sequence/
export const SEQUENCE_FRAMES: string[] = Array.from({ length: 120 }, (_, i) => {
  const frameNumber = String(i + 1).padStart(3, "0");
  return `/sequence/frame-${frameNumber}.webp`;
});

export const TOTAL_FRAMES = SEQUENCE_FRAMES.length;
