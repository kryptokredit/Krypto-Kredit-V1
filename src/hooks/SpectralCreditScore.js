import { useState, useEffect } from "react";
import axios from "axios";

const useSpectralCreditScore = wallet_address => {
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
      const response = await axios.get(`https://api.spectral.finance/api/v1/addresses/${wallet_address}`, { headers });
      setCreditScoreData(response.data);
      if (response.data) {
        setCreditScoreData(response.data);
      } else {
        setError(new Error("No data returned from Spectral API"));
      }
    } 
    catch (error) {
      if (error.response && error.response.status === 404 && !isRetryAttempted) {
        try {
          console.log("attempting to generate a new credit score");
          const response = await axios.post(
            `https://api.spectral.finance/api/v1/addresses/${wallet_address}/calculate_score`,
            {},
            { headers },
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

  return { creditScoreData, isLoading, fetchData };
};

export default useSpectralCreditScore;
