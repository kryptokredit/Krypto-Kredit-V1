import React from "react";

function Home() {
  return (
    <div
      style={{ margin: "0 2%" }}
      className="row align-items-center py-5 hero-section"
    >
      <div className="col-md-6">
        <h1
          style={{
            background: "linear-gradient(to right, #00bfff, #32cd32)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="display-5 fw-bold lh-1 mb-3 text-left"
        >
          Join the future of finance, earn credit on chain for your everyday
          transactions
        </h1>
        <p style={{ color: "black" }} className="lead mb-4 text-left">
          Redefining Credit: A Peer-to-Peer Approach
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
          <button
            style={{ background: "#12E26C" }}
            type="button"
            className="btn btn-lg px-4 me-md-2"
            onClick={() => {
              window.location.href = "/InvoiceForm";
            }}
          >
            Get Started
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
            onClick={() => {
              window.location.href = "https://github.com/kryptokredit";
            }}
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <img
          style={{ maxWidth: "80%", padding: "10px" }}
          alt="Hero title"
          src="./undraw_sharing_knowledge_03vp.svg"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(to right, #00bfff, #32cd32)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="display-5 fw-bold lh-1 text-left"
        >
          Our Partners
        </div>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="display-5 fw-bold lh-1 text-left"
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          className="d-flex-inline"
        >
          <div
            className="d-flex px-5"
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <img src="Zeppelin .png" alt="Zeppelin" style={{ width: "80px" }} />
            <img src="logo.png" alt="Scroll" style={{ width: "50px" }} />
            <img
              src="HumaLogo.jpg"
              alt="Huma"
              style={{ width: "50px", height: "50px" }}
            />
            <img
              src="WalletConnect-Logo.jpg"
              alt="WalletConnect"
              style={{ width: "80px" }}
            />
          </div>
          <div
            className="d-flex px-5"
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <img src="Graph.jpg" alt="TheGraph" style={{ width: "130px" }} />

            <img
              src="polygon-matic-logo.png"
              alt="Polygon"
              style={{ width: "80px" }}
            />
            <img
              src="Spectral_Finance.png"
              alt="Spectral"
              style={{ width: "90px" }}
            />
            <img src="metamask.png" alt="Metamask" style={{ width: "70px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
