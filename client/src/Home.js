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
  });

  return (
    <Layout>
      <h3>Home Page</h3>
      <button onClick={() => rd()}>Get Started</button>
    </Layout>
  );
}

export default Home;
