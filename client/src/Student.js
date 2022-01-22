import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/studentData/studentDataActions";

function Student() {
  const [bid, setBid] = useState(0);
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.studentData);

  const getDetails = async () => {
    console.log(data);
  };

  const addInstitute = async () => {
    const t = await blockchain.contract.methods.addInstitute_Student(bid).send({
      from: blockchain.account,
    });
    dispatch(fetchData());
  };

  const getInstituteDetails = async () => {
    const list = await blockchain.contract.methods.addInstitute_Student(bid).send({
      from: blockchain.account,
    });
    dispatch(fetchData());
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.contract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.contract, blockchain.account]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-lg d-block btn-primary my-3 fw-bold text-start"
        onClick={() => getDetails()}
      >
        Get Details
      </button>

      <h5 className="pb-3">Add Institute with ID Number</h5>
      <div className="d-block">
        <input
          type="number"
          className="bg-dark p-3 text-white rounded"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        />
        <button
          type="button"
          className="mt-2 btn btn-primary btn-lg d-block fw-bold text-start"
          onClick={addInstitute}
          style={{ width: "100%" }}
        >
          Add Institute
        </button>
      </div>
    </div>
  );
}

export default Student;
