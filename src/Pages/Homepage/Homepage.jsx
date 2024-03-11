import React, { Fragment, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import imageContext from "../../store/Image-context";
import homepagecss from "./Homepage.module.css";
import tempcss from "../Templateeditor/templateeditor.module.css";
import { toast } from "react-toastify";
import DrawerAppBar from "../../components/Appbar/Appbar";
function Homepage() {
  const navigate = useNavigate();
  const colRef = useRef();
  const rowRef = useRef();
  const imgctx = useContext(imageContext);
  const sendRowandColDataHandler = (rowData) => {
    console.log(rowData);
    imgctx.setRowColState({ rowData });
    navigate("/temeditor");
  };
  const generateTemplateHandler = () => {
    const cols = colRef.current.value;
    const row = rowRef.current.value;
    console.log(); //{row: 1, cols: 3, totalColumns: 9}
    if (cols > 6) {
      toast.error("columns per line field should be 6 or less  ");
      return;
    }
    if (row > 6) {
      toast.error("row field should be 6 or less  ");
      return;
    }
    sendRowandColDataHandler({ row: 1, cols: cols, totalColumns: row * cols });
  };
  const dogImg =
    "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";
  return (
    <Fragment>
      <DrawerAppBar activeRoute="Image Merger" />
      <div style={{ height: "100vh", width: "100vw" }}>
        <div style={{ height: "8vh" }}></div>
        <div
          className={`container border ${tempcss.columnContainer}`}
          style={{ height: "90vh" }}
        >
          <div className="row ">
            <div className="col-8 text-center border  fw-bolder py-2 ">
              Select template from predefined templates
            </div>
            <div className="col text-center  fw-bolder py-2 mx-5 ">
              {/* create Your custom template */}
            </div>
          </div>
          <div className="row">
            <div className="col-8 m-2">
              <div className="col m-5">
                <div
                  style={{
                    backgroundImage: `url(${dogImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                  }}
                  className={`${homepagecss.templateDiv} row row-cols-2 fw-bolder`}
                  onClick={() =>
                    sendRowandColDataHandler({
                      row: 1,
                      cols: 2,
                      totalColumns: 4,
                    })
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
              <div className="col m-5 fw-bolder">
                <div
                  style={{
                    backgroundImage: `url(${dogImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                  }}
                  className={`${homepagecss.templateDiv} row row-cols-3`}
                  onClick={() =>
                    sendRowandColDataHandler({
                      row: 1,
                      cols: 3,
                      totalColumns: 9,
                    })
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
              <div className="col m-5 fw-bolder">
                <div
                  style={{
                    backgroundImage: `url(${dogImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                  }}
                  className={`${homepagecss.templateDiv} row row-cols-3`}
                  onClick={() =>
                    sendRowandColDataHandler({
                      row: 1,
                      cols: 3,
                      totalColumns: 3,
                    })
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
                </div>
              </div>
            </div>
            <div className="col   m-2 d-flex justify-content-center align-items-center flex-column">
              <div className="badge rounded-circle bg-info m-2">
                <h3>OR</h3>
              </div>
              <div className="col-8 text-center border  fw-bolder p-2 m-2">
                create new template
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column border">
                <div className="p-3 text-center">
                  {" "}
                  <input
                    placeholder="enter cols per line"
                    className="my-2"
                    type="number"
                    ref={colRef}
                  ></input>
                  <input
                    placeholder="total row"
                    className="my-2 mx-1"
                    type="number"
                    ref={rowRef}
                  ></input>
                </div>{" "}
                <div
                  className="badge bg-danger m-2 p-2 text-white fw-bolder"
                  onClick={generateTemplateHandler}
                >
                  Generate{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Homepage;
