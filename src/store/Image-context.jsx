import React from "react";

const imageContext = React.createContext({
  editedImage: [],
  mergedImages: [],
  croppedImages:[],
  rowColState: {},
  setRowColState: () => {},
  addToEditedImage: () => {},
  addToMergedImages: () => {},
  addToCroppedImages: ()=>{},
  removeFromCroppedImage:()=>{}
});

export default imageContext;
