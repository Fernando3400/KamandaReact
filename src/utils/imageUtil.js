import React, { useEffect, useRef } from "react";
function binaryToPixels(binaryData, width, height) {
  const pixels = [];
  for (let i = 0; i < width * height * 3; i += 3) {
    const r = binaryData.charCodeAt(i);
    const g = binaryData.charCodeAt(i + 1);
    const b = binaryData.charCodeAt(i + 2);
    pixels.push([r, g, b]);
  }
  return pixels;
}
function binaryToRaw(binaryString) {
  return atob(binaryString);
}
export function BinaryToImage({ binaryString, width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const rawData = binaryToRaw(binaryString);

      const pixels = binaryToPixels(rawData, width, height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const [r, g, b] = pixels[y * width + x];
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }, [binaryString, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
