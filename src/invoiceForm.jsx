import React, { useState, useEffect } from "react";
import { useSpectral, score } from "@spectral-finance/spectral-modal";
import { Alignment } from "react-data-table-component";


function InvoiceForm() {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("ETH");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [payerWalletAddress, setPayerWalletAddress] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [lateFee, setLateFee] = useState();
  const [validatorWalletAddress, setValidatorWalletAddress] = useState();
  const [user, setUser] = useState("");

 React.useEffect(() => {
   async function fetchAccount() {
     if (window.ethereum) {
       try {
         await window.ethereum.enable();
         const accounts = await window.ethereum.request({
           method: "eth_accounts",
         });
         setUser(accounts[0]);
         console.log("ACCOUNTSS", accounts[0]);
       } catch (error) {
         console.log(error);
       }
     }
   }
   fetchAccount();
 }, [user]);
 
  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setOptionsVisible(false);
    console.log(`Selected option: ${option}`);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    console.log("Amount:", event.target.value);
  };

  const handleLateFeeChange = (event) => {
    setLateFee(event.target.value);
    console.log("Late Fee:", event.target.value);
  };

const handleDueDateChange = (timestamp) => {
  console.log("handleDueDateChange", timestamp);
  setDueDate(timestamp);
};

  const handlePayerWalletAddressChange = (event) => {
    setPayerWalletAddress(event.target.value);
    console.log("WalletAddress:", event.target.value);
  };

  const handleValidatorWalletAddressChange = (event) => {
    setValidatorWalletAddress(event.target.value);
    console.log("WalletAddress:", event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    console.log("Description:", event.target.value);
  };

  async function handleCreation(){
    const Web3 = require("web3");

    // Instantiate a Web3 instance using window.ethereum as the provider
    const abi = require("./abis/abi.json");

    // Create a new instance of the web3 library using an Ethereum node URL
    const web3 = new Web3(
      window.ethereum
    );

    // Create a new instance of the contract object
    const contractAddress = "0xB98f4c2a758eB57963c38a5e276d1Ad361bC16aa";
    const contract = new web3.eth.Contract(abi, contractAddress);
    await contract.methods
      .createInvoice(
        amount,
        dueDate,
        payerWalletAddress,
        validatorWalletAddress,
        lateFee
      )
      .send({ from: user });}
  
  const { start, score } = useSpectral();
  const [myScore, setMyScore] = useState();

  useEffect(() => {
    if (!score) {
      console.log("Score not calculated");
      return;
    }
    console.log(`Hooray! your score is ${score}`);
    setMyScore(score);
  }, [score]);

  return (
    <div className="p-4">
      <div
        className="container px-lg-5 py-4"
        style={{
          border: "2px solid #000080",
          borderRadius: "7px",
          maxWidth: "800px",
          margin: "0 auto",
          marginTop: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h1 style={{ color: "#12E26C" }} className="text-center text-dark mb-4">
          Create an Invoice
        </h1>
        <form>
          <div className="row mb-3">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <div className="form-group my-3">
                <label htmlFor="input1" className="text-dark">
                  Amount
                </label>
                <input
                  value={amount}
                  onChange={handleAmountChange}
                  type="number"
                  min="1"
                  step="any"
                  className="form-control"
                  id="input1"
                  style={{ border: "2px solid #555" }}
                  placeholder="Enter Amount"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="form-group my-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label
                  className="text-dark"
                  htmlFor="input3"
                  style={{ marginBottom: "5px" }}
                >
                  Due Date
                </label>
                <input
                  style={{ border: "2px solid black", borderRadius: "5px" }}
                  type="datetime-local"
                  id="input3"
                  name="trip-start"
                  value={
                    dueDate ? new Date(dueDate).toISOString().slice(0, 16) : ""
                  }
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const timestamp = date.getTime();
                    handleDueDateChange(timestamp);
                  }}
                ></input>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <div className="form-group my-3">
                <label htmlFor="input3" className="text-dark">
                  Select Token
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="input3"
                    value={selectedOption}
                    readOnly
                    onClick={toggleOptions}
                    style={{ border: "2px solid #555" }}
                  />
                  <div
                    className="position-absolute"
                    style={{ top: 3, right: 5 }}
                  >
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={toggleOptions}
                    >
                      &#x25BC;
                    </button>
                  </div>

                  {optionsVisible && (
                    <div className="position-absolute mt-2 bg-dark p-2">
                      <div
                        className="text-light"
                        onClick={() => selectOption("ETH")}
                      >
                        ETH
                      </div>
                      <div
                        className="text-light"
                        onClick={() => selectOption("Arb")}
                      >
                        Arb
                      </div>
                      <div
                        className="text-light"
                        onClick={() => selectOption("Poly")}
                      >
                        Poly
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center text-center">
              <button
                type="button"
                className="d-flex justify-content-center w-50"
                onClick={start}
              >
                Calculate Spectral Score
              </button>
            </div>

            <div className="col-lg-6">
              <div className="form-group my-3">
                <div className="d-flex">
                  <label style={{}} htmlFor="input4" className="text-dark">
                    Enter Wallet address of payer/{" "}
                  </label>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Score: {score}
                  </p>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="input4"
                  value={payerWalletAddress}
                  onChange={handlePayerWalletAddressChange}
                  style={{ border: "2px solid #555" }}
                  placeholder="Wallet Address"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="form-group my-3">
                  <label htmlFor="input6" className="text-dark">
                    Late Fee
                  </label>
                  <input
                    value={lateFee}
                    onChange={handleLateFeeChange}
                    type="number"
                    min="1"
                    step="any"
                    className="form-control"
                    id="input6"
                    style={{ border: "2px solid #555" }}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="form-group my-3">
                  <label htmlFor="input7" className="text-dark">
                    Validator Wallet Address
                  </label>
                  <input
                    value={validatorWalletAddress}
                    onChange={handleValidatorWalletAddressChange}
                    type="text"
                    className="form-control"
                    id="input1"
                    style={{ border: "2px solid #555" }}
                    placeholder="optional"
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div></div>
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="form-group my-3 text-left">
                <label
                  htmlFor="input5"
                  className="text-dark"
                  style={{ color: "black" }}
                >
                  Description of Service
                </label>
                <textarea
                  className="form-control"
                  id="input5"
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{ border: "2px solid #555" }}
                  placeholder="Enter a Description"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 text-center">
              <button
                className="btn btn-lg "
                style={{ backgroundColor: "#12E26C" }}
                onClick={() => {
                  handleCreation();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
