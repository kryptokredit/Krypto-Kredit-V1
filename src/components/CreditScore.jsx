import React, { useState, useEffect } from "react";
import { useSpectralCreditScore } from "../hooks";

const CreditScore = ({address}) => {

  const { creditScoreData, isLoading, fetchData } =
    useSpectralCreditScore(address);

  const handleButtonClick = async () => {
    await fetchData();
  };

  return (
    <div className="d-flex">
      <div className="d-flex justify-content-center text-center">
        <button
          type="button"
          className="d-flex justify-content-center w-100 h-50px"
          onClick={handleButtonClick}
        >
          {isLoading?"Loading":"Calculate Spectral Score"}
        </button>
      </div>
      <label style={{}} htmlFor="input4" className="text-dark">
        Enter Wallet address of payer/{" "}
      </label>
      <p
        style={{
          color: "red",
          fontWeight: "bold",
        }}
      >
        Score: {creditScoreData.score}
      </p>
    </div>
  );
};

export default CreditScore;
