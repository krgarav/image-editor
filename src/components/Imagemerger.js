
import React, { useState ,useRef } from 'react';
import image1 from '../images/dog.png';
import image2 from '../images/dog.png';
import image3 from '../images/dog.png';
import image4 from '../images/dog.png';
import image5 from '../images/dog.png';
import image6 from '../images/dog.png';
import image7 from '../images/dog.png';
import image8 from '../images/dog.png';
import image9 from '../images/dog.png';
// import image2 from './image2.png';
// Import other images as needed

function ImageMerger() {
    const [imageArray, setImageArray] = useState([
      [image1, image2, image3],
      [image4, image5, image6],
      [image7, image8]
    ]);
  
    const mergedImageRef = useRef(null);
  
    const renderImages = () => {
      return imageArray.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((image, colIndex) => (
            <img
              key={colIndex}
              src={image}
              alt={`Image ${rowIndex}-${colIndex}`}
              style={{ width: '1000px', height: '1000px',  }}
            />
          ))}
        </div>
      ));
    };
  
    const handleDownload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imagePromises = [];
        
        // Calculate canvas size based on total width and height of images
        const canvasWidth = imageArray[0].length *500;
        const canvasHeight = imageArray.length *500;
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
              ctx.drawImage(img, colIndex * 500, rowIndex * 500, 500, 500);
            });
          });
        });
        
        // Once all images are loaded and drawn, proceed to download
        Promise.all(imagePromises).then(() => {
          // Convert the canvas to a data URL
          const dataURL = canvas.toDataURL('image/jpeg');
        
          // Create a temporary anchor element
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'merged_image.png';
        
          // Programmatically trigger a click event on the anchor element
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    };
    
      
  
    return (
      <div>
        {renderImages()}
        <button onClick={handleDownload}>Download Merged Image</button>
        <div style={{ display: 'none' }}>
          <div ref={mergedImageRef}>
            {imageArray.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((image, colIndex) => (
                  <img
                    key={colIndex}
                    src={image}
                    alt={`Image ${rowIndex}-${colIndex}`}
                    style={{ width: '100px', height: '100px', margin: '5px' }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  

export default ImageMerger;
