

function ImageMerger(imageArray) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imagePromises = [];

    // Calculate canvas size based on total width and height of images
    const canvasWidth = imageArray[0].length * 2000;
    const canvasHeight = imageArray.length * 2000;
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
        imageLoadPromise.then(async () => {
          ctx.drawImage(
            img,
            colIndex * 2000,
            rowIndex * 2000,
            2000,
            2000
          );
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
