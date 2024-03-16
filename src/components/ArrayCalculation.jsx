// Function to calculate index position in a 2D array
  const ArrayCalculation = ( imgObj ,totalColumns,totalRows )=>{


  const twoDimenArr = Array.from({ length: totalRows }, () => Array(totalColumns).fill(null)); // Initialize 2D array with null values
  
  // Push image URLs into the 2D array according to index numbers
  imgObj.forEach((item,ind) => {
    const { index, imgUrl } = item;
    const rowIndex = Math.floor(index / totalColumns);
    const columnIndex = Math.floor(index % totalColumns);
    
    twoDimenArr[rowIndex][columnIndex] = imgUrl;
  });


return twoDimenArr;
}

  
export default ArrayCalculation;