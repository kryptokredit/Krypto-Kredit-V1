import React, { useState } from "react";
import { useSpectral } from "@spectral-finance/spectral-modal";
import { signInvoiceInvoicer, createInvoice } from "./components/factoryWeb3";
import axios from "axios";

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
    console.log("Validator:", event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    console.log("Description:", event.target.value);
  };

  async function handleCreation() {
    const Web3 = require("web3");

    // Instantiate a Web3 instance using window.ethereum as the provider
    const abi = require("./abis/abi.json");

    // Create a new instance of the web3 library using an Ethereum node URL
    const web3 = new Web3(window.ethereum);

    // Create a new instance of the contract object
    const contractAddress = "0x0F97AAB884B8d1A49B0a4941B77fe08D8Ad19696";
    const contract = new web3.eth.Contract(abi, contractAddress);
    console.log(
      amount,
      dueDate,
      payerWalletAddress,
      validatorWalletAddress,
      lateFee
    );
    console.log("FACTORY CONTRACT", contract);
    const id = await contract.methods.invoiceCount().call();
    const idNumber = parseInt(id) + 1;
    console.log("This is the ID", idNumber);
    await createInvoice(
      amount,
      dueDate,
      payerWalletAddress,
      validatorWalletAddress,
      lateFee,
      idNumber
    );
  }
  const [creditScoreData, setCreditScoreData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetryAttempted, setIsRetryAttempted] = useState(false);

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_SPECTRAL}`,
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("attempt to pull existing credit score...");
      const response = await axios.get(
        `https://api.spectral.finance/api/v1/addresses/${payerWalletAddress}`,
        { headers }
      );
      console.log("RESPONSEE", response.data[0]);
      setCreditScoreData(response.data[0]);
      if (response.data) {
        setCreditScoreData(response.data);
      } else {
        setError(new Error("No data returned from Spectral API"));
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        !isRetryAttempted
      ) {
        try {
          console.log("attempting to generate a new credit score");
          const response = await axios.post(
            `https://api.spectral.finance/api/v1/addresses/${payerWalletAddress}`,
            { headers }
          );
          setIsRetryAttempted(true);
          // setTimeout(() => {
          //   fetchData();
          // }, 5000);
          setCreditScoreData(response.data);
        } catch (error) {
          setError(error);
        }
      } else {
        console.log("ERROR");
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="row mb-4">
            <div className="col-lg-12 mb-4 mb-lg-0">
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
            <div className="row" style={{ marginTop: "6%" }}>
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
                  <select
                    style={{ border: "2px solid black", borderRadius: "5px" }}
                    id="input3"
                    name="dueDate"
                    value={
                      dueDate
                        ? new Date(dueDate).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const days = parseInt(value);
                      const timestamp =
                        new Date().getTime() + days * 24 * 60 * 60 * 1000;
                      handleDueDateChange(timestamp);
                    }}
                  >
                    <option value="">
                      {dueDate
                        ? new Date(dueDate).toLocaleDateString()
                        : "Select a due date"}
                    </option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="input4" className="text-dark">
                    Enter Wallet address of payer{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input4"
                    value={payerWalletAddress}
                    onChange={handlePayerWalletAddressChange}
                    style={{ border: "2px solid #555", marginTop: "5%" }}
                    placeholder="Wallet Address"
                  />
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Score: {isLoading ? "Loading..." : creditScoreData.score}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-lg-6mb-2 mb-lg-0">
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
                    style={{ top: 1, right: 5 }}
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
          </div>
          {/* <div className="d-flex"> */}
          {/* <img
                src="https://uploads-ssl.webflow.com/6384dc706c77d5664d1a1d65/6384dc706c77d5d2fc1a1dbd_logo.png"
                alt="spectral logo"
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  height: "50px",
                  maxWidth: "200px",
                  display: "block",
                  margin: "0 auto",
                }}
              /> */}

          {/* <div className="d-flex justify-content-center text-center">
                <button
                  type="button"
                  className="d-flex justify-content-center w-100 h-50px"
                  onClick={fetchData}
                >
                  Calculate Spectral Score
                </button>
              </div>
            </div> */}

          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="form-group mt-3">
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
            <div className="col-lg-6 mb-2">
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
          <div className="rowmb-2">
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
                onClick={(event) => {
                  event.preventDefault();
                  handleCreation();
                  signInvoiceInvoicer();
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
