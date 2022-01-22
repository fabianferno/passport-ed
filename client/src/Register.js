import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "./components/Layout";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

// let ContractKit = require("@celo/contractkit");

function Register() {
  const blockchain = useSelector((state) => state.blockchain);
  console.log(blockchain);
  const [formToggle, setFormToggle] = useState(false);
  // const [aadharFile, setAadharFile] = useState(null);
  // const [marksheetFile, setMarksheetFile] = useState(null);
  const [aadharUrl, setAadharUrl] = useState(null);
  const [marksheetUrl, setMarksheetUrl] = useState(null);
  // const [urlArr, setUrlArr] = useState([]);
  let history = useHistory();

  const studentNameInputRef = useRef();
  const studentAddressInputRef = useRef();
  const studentPhoneInputRef = useRef();
  const studentAgeInputRef = useRef();

  const instituteNameInputRef = useRef();
  const instituteAddressInputRef = useRef();

  async function createinstitute() {
    var instituteName = instituteNameInputRef.current.value;
    var instituteAddress = instituteAddressInputRef.current.value;
    const receipt = await blockchain.contract.methods
      .addInstituteInfo(instituteName, instituteAddress)
      .send({
        from: blockchain.account,
      });
    console.log(receipt);

    // Call API to create institute
    // history.push("/institute");
  }

  async function retrieveMarksheet(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setMarksheetUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function retrieveAadhar(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setAadharUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createstudent() {
    var studentName = studentNameInputRef.current.value;
    var studentAddress = studentAddressInputRef.current.value;
    var studentPhone = studentPhoneInputRef.current.value;
    var studentAge = studentAgeInputRef.current.value;

    console.log(aadharUrl);
    console.log(marksheetUrl);

    const receipt = await blockchain.contract.methods
      .addStudentInfo(
        studentName,
        studentAddress,
        studentPhone,
        studentAge,
        aadharUrl,
        marksheetUrl
      )
      .send({
        from: blockchain.account,
      });
    console.log(receipt);
    history.push("/student");

    // Call API to create student
  }

  return (
    <Layout>
      <section className="pt-5">
        {formToggle ? (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between  align-items-center">
              <h1 className="fw-bold text-white ">Create a institute</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create student" : "Create institute"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={instituteNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="student Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-secondary">
                    Address
                  </label>
                  <input
                    ref={instituteAddressInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="ABC Colony Delhi"
                  />
                </div>
              </form>

              <div
                onClick={() => createinstitute()}
                className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
              >
                Create institute and Proceed ✅
              </div>
            </section>
          </div>
        ) : (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <h1 className="fw-bold text-white">Create a student</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create student" : "Create institute"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group  my-4">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={studentNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="student Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputAddress" className="text-secondary">
                    Address
                  </label>
                  <input
                    ref={studentAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputPhone" className="text-secondary">
                    Phone
                  </label>
                  <input
                    ref={studentPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputPhone" className="text-secondary">
                    Age
                  </label>
                  <input
                    ref={studentAgeInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAge"
                    placeholder="Age -19"
                  />
                </div>

                <div>
                  <input type="file" name="aadhar" onChange={retrieveAadhar} />
                </div>

                <div>
                  <input
                    type="file"
                    name="marksheet"
                    onChange={retrieveMarksheet}
                  />
                </div>
              </form>

              <div
                onClick={() => createstudent()}
                className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
              >
                <div>
                  Your uploaded aadhar image
                  <img src={aadharUrl} alt="" />
                </div>
                <div>
                  Your uploaded marksheet image
                  <img src={marksheetUrl} alt="" />
                </div>
                Create student and Proceed ✅
              </div>
            </section>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Register;
