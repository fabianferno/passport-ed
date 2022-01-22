import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { connect } from "./redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { fetchData } from "./redux/data/dataActions";

function Home2() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  var history = useHistory();

  const rd = async () => {
    console.log("clicked");
    if (!blockchain.loading) {
      console.log("inside");
      let t = await blockchain.contract.methods.Identify().call();
      //   var td= await blockchain.contract.methods.addresstoId(blockchain.account).call();
      //   // var x= await blockchain.contract.methods.type_user(tid).call();
      //   // console.log(t)
      //   // console.log(tid)
      //   // console.log(x)
      //  var tid=parseInt(td);
      //  if(tid==0)
      //  history.push("/register");

      //  else if(tid< 1000)
      //  history.push("/student");

      //  else history.push("/institute");
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
  }, []);

  return (
    <div>
      <h3>Home Page</h3>
      <button onClick={() => rd()}>Get Started</button>
    </div>
  );
}

export default Home2;
