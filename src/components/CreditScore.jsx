import React, { useState, useEffect } from "react";
import { useSpectralCreditScore } from "../hooks";

const CreditScore = () => {
  const [address,setAddress] = useState("")
  useEffect(()=>{fetchAccount()},[])
  async function fetchAccount() {
    // Check if Web3 is available and if Metamask is installed
    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();

          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          console.log("ACCOUNTSS", accounts[0]);
          setAddress(accounts[0]);
          return accounts[0];
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  const { creditScoreData, isLoading, fetchData } = useSpectralCreditScore(address);

  const handleButtonClick = async () => {
    await fetchData();
  };

  return (
    <div
      className="spectralCreditCard"
      style={{
        border: "1px solid white",
        padding: "10px",
        display: "inline-block",
      }}
    >
      <img
        src="https://uploads-ssl.webflow.com/6384dc706c77d5664d1a1d65/6384dc706c77d5d2fc1a1dbd_logo.png"
        alt="spectral logo"
        style={{
          backgroundColor: "black",
          width: "100%",
          maxWidth: "200px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <h2>Spectral Credit Score</h2>
      <p>This is a credit score calculated from your on-chain activity</p>
      <label>Address: {address ? address : "Not Connected"}</label>
      {isLoading ? (
        <button
          onClick={() => handleButtonClick()}
          style={{ color: "black", marginBottom: "10px" }}
        >
          Calculate Credit Score
        </button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            onClick={() => handleButtonClick()}
            style={{ color: "black", marginBottom: "10px" }}
          >
            Calculate Credit Score
          </button>
          <label>
            Credit Scores:{" "}
            {creditScoreData && creditScoreData.score
              ? creditScoreData.score
              : "No Score"}
          </label>
          
        </div>
      )}
    </div>
  );
};

export default CreditScore;
