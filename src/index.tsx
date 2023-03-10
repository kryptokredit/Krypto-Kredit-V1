import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SpectralProvider } from "@spectral-finance/spectral-modal";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SpectralProvider
      logo="/Logokk.png"
      partnerId={
        process.env.REACT_APP_SPECTRAL_PARTNER
          ? process.env.REACT_APP_SPECTRAL_PARTNER
          : "yourPartnerId"
      }
    >
      <App />{" "}
    </SpectralProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
