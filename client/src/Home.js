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
      <div className="container">
        <div
          style={{ minHeight: "65vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div>
            <div className="d-flex align-items-center justify-content-center">
              <img src="/logo192.png" alt="" srcset="" />
              <div className="ms-3 d-flex flex-column align-items-start justify-content-center">
                <h1 style={{ fontSize: "6rem" }} className="fw-bold text-dark">
                  passport-ed
                </h1>
                <button
                  className="btn btn-lg btn-outline-dark my-3"
                  onClick={() => rd()}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
