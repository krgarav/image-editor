import React, { useState } from "react";
import Imagecontext from "./Image-context";

function Imageprovider(props) {
  const initialData = {
    editedImage: [],
    mergedImages: [],
    croppedImages: [],
    rowColState: {},
  };
  const [imgState, setImgState] = useState(initialData);

  const addToEditedImageHandler = (index, imgUrl) => {
    const obj = {
      index,
      imgUrl,
    };
    // console.log(obj);
    const updatedEditedImage = [...imgState.editedImage];
    updatedEditedImage.push(obj);
    setImgState((prevImgState) => {
      return { ...prevImgState, editedImage: updatedEditedImage };
    });
  };
  const addToMergedImagesHandler = (imgurl) => {};
  const addToCroppedImagesHandler = (imgurl) => {
    const obj = {
      imageUrl: imgurl,
    };
    const updatedEditedImage = [...imgState.croppedImages];
    updatedEditedImage.push(obj);
    setImgState((prevImgState) => {
      return { ...prevImgState, croppedImages: updatedEditedImage };
    });
  };
  const setRowColStateHandler = (value) => {
    const obj = { ...value };
    const updatedObj = obj.rowData;
    setImgState((item) => {
      return { ...item, rowColState: updatedObj };
    });
  };
  const removeFromCroppedImageHandler = (enteredIndex) => {
    const croppedImage = [...imgState.croppedImages];

    const filteredCroppedImage = croppedImage.filter((item, index) => {
      return index !== enteredIndex;
    });
    console.log(filteredCroppedImage);
    setImgState((item) => {
      return { ...item, croppedImages: filteredCroppedImage };
    });
  };
  const imgContext = {
    editedImage: imgState.editedImage,
    mergedImages: imgState.mergedImages,
    rowColState: imgState.rowColState,
    croppedImages: imgState.croppedImages,
    addToEditedImage: addToEditedImageHandler,
    addToMergedImages: addToMergedImagesHandler,
    addToCroppedImages: addToCroppedImagesHandler,
    setRowColState: setRowColStateHandler,
    removeFromCroppedImage: removeFromCroppedImageHandler,
  };
  return (
    <Imagecontext.Provider value={imgContext}>
      {props.children}
    </Imagecontext.Provider>
  );
}

export default Imageprovider;
