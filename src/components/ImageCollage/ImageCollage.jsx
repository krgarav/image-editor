import React, { useRef, useEffect } from "react";

function ImageCollage({ imageUrls, rows, columns }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Define canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate image dimensions
    const imageWidth = canvasWidth / columns;
    const imageHeight = canvasHeight / rows;

    // Load images
    const images = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    // Draw images onto canvas
    let currentRow = 0;
    let currentColumn = 0;
    images.forEach((img, index) => {
      ctx.drawImage(
        img,
        currentColumn * imageWidth,
        currentRow * imageHeight,
        imageWidth,
        imageHeight
      );
      currentColumn++;
      if (currentColumn === columns) {
        currentColumn = 0;
        currentRow++;
      }
    });
    // Trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL();
    downloadLink.download = "collage.png";
    downloadLink.click();
  }, [imageUrls, rows, columns]);

  return <canvas ref={canvasRef} width={800} height={600} />;
}

export default ImageCollage;
