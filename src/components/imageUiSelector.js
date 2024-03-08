import React from "react";
import { useNavigate } from "react-router";

function ImageUiSelector() {
  const navigate = useNavigate();
  const sendRowandColDataHandler = (rowData) => {
    console.log(rowData);
    navigate("/editor", { state: { ...rowData } });
  };
  const dogImg =
    "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";
  return (
    <div
      className="container  border"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="row my-2 mx-5">
        <div className="col-8 text-center border ms-2">
          select template from predefined template
        </div>
        <div className="col text-center border mx-5">
          create Your custom template
        </div>
      </div>
      <div className="row">
        <div className="col-8 m-2 border">
          <div className="col m-5">
            <div
              style={{
                backgroundImage: `url(${dogImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }}
              className="row row-cols-2 "
              onClick={() =>
                sendRowandColDataHandler({ row: 1, cols: 2, totalColumns: 4 })
              }
            >
              <div className="col border" style={{ height: "100px" }}>
                1
              </div>
              <div className="col border" style={{ height: "100px" }}>
                2
              </div>
              <div className="col border" style={{ height: "100px" }}>
                3
              </div>
              <div className="col border" style={{ height: "100px" }}>
                4
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="col m-5">
            <div
              style={{
                backgroundImage: `url(${dogImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }}
              className="row row-cols-3 "
              onClick={() =>
                sendRowandColDataHandler({ row: 1, cols: 3, totalColumns: 9 })
              }
            >
              <div className="col border" style={{ height: "100px" }}>
                1
              </div>
              <div className="col border" style={{ height: "100px" }}>
                2
              </div>
              <div className="col border" style={{ height: "100px" }}>
                3
              </div>
              <div className="col border" style={{ height: "100px" }}>
                4
              </div>
              <div className="col border" style={{ height: "100px" }}>
                5
              </div>
              <div className="col border" style={{ height: "100px" }}>
                6
              </div>
              <div className="col border" style={{ height: "100px" }}>
                7
              </div>
              <div className="col border" style={{ height: "100px" }}>
                8
              </div>
              <div className="col border" style={{ height: "100px" }}>
                9
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="col m-5">
            <div
              style={{
                backgroundImage: `url(${dogImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }}
              className="row row-cols-3"
              onClick={() =>
                sendRowandColDataHandler({ row: 1, cols: 3, totalColumns: 3 })
              }
            >
              <div className="col border" style={{ height: "100px" }}></div>
              <div className="col border" style={{ height: "100px" }}></div>
              <div className="col border" style={{ height: "100px" }}></div>
            </div>
          </div>
        </div>
        <div className="col border m-2 d-flex justify-content-center align-items-center">
          <div className="badge bg-danger">enter </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUiSelector;
