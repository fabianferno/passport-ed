import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { connect } from "./redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  var history = useHistory();

  const rd = async () => {
    console.log("clicked");
    if (!blockchain.loading) {
      console.log("inside");
      let t = await blockchain.contract.methods.Identify().call();

      switch (t) {
        case "0":
          history.push("/register");
          break;
        case "1":
          history.push("/student");
          break;
        case "2":
          history.push("/institute");
          break;
        default:
          history.push("/");
          break;
      }
    }
  };

  useEffect(() => {
    console.log("called");
    dispatch(connect());
  }, [dispatch]);

  return (
    <Layout>
      <div className="d-md-none d-block" style={{ marginTop: "100px" }}></div>
      <div className="container">
        <div
          style={{ minHeight: "50vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div>
            <div className="d-md-flex align-items-center justify-content-center">
              <img src="/logo192.png" alt="" srcset="" />
              <div className="ms-3 pb-3 d-md-flex flex-md-column align-items-start justify-content-center">
                <h1 style={{ fontSize: "5rem" }} className="fw-bold text-dark">
                  passport-ed
                </h1>
                <button
                  className="btn btn-lg btn-primary fw-bold my-3"
                  onClick={() => rd()}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-5 mx-md-5">
            <img src="passport-ed.svg" className="img-fluid" alt="" srcset="" />
          </div>
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold">Decentralized DMS</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque et
              sapiente sunt molestiae aspernatur magnam obcaecati distinctio
              voluptas possimus eaque delectus omnis nesciunt, animi, eligendi
              quod labore quisquam necessitatibus? Delectus?
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
