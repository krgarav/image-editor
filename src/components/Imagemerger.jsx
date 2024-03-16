function ImageMerger(imageArray) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imagePromises = [];

    // Calculate canvas size based on total width and height of images
    const canvasWidth = imageArray[0].length * 1000;
    const canvasHeight = imageArray.length * 1000;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    imageArray.forEach((row, rowIndex) => {
      row.forEach((image, colIndex) => {
        const img = new Image();

        // Listen for the load event
        const imageLoadPromise = new Promise((resolve) => {
          img.onload = () => {
            resolve();
          };
        });

        img.src = image;
        imagePromises.push(imageLoadPromise);

        // Draw the image when it's loaded
        imageLoadPromise.then(() => {
          ctx.drawImage(img, colIndex * 1000, rowIndex * 1000, 1000, 1000);
        });
      });
    });

    // Once all images are loaded and drawn, resolve the promise with the merged image data URL
    Promise.all(imagePromises).then(() => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL("image/jpeg");

      // Resolve the promise with the merged image data URL
      resolve(dataURL);
    });
  });
}

export default ImageMerger;
