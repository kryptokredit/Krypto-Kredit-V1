import React from "react";
import "./Home.css"

function Home() {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row align-items-center py-5">
          <div className="col-md-6">
            <h1 className="display-5 fw-bold lh-1 mb-3 text-left">
              Join the future of finance, earn credit on chain for your everyday transactions
            </h1>
            <p className="lead mb-4 text-left">
              Redefining Credit: A Peer-to-Peer Approach
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
              <button className="btn btn-lg px-4 me-md-2" onClick={() => {window.location.href = "/InvoiceForm";}}>
                Get Started
              </button>
              <button className="btn btn-outline-secondary btn-lg px-4" onClick={() => {window.location.href = "https://github.com/kryptokredit";}}>
                Learn More
              </button>
            </div>
          </div>
          <div className="col-md-5">
            <img
              className="img-fluid"
              alt="Hero title"
              src="./undraw_sharing_knowledge_03vp.svg"
            />
          </div>
        </div>

        <div className="row" style={{marginTop: "15%"}}>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Build On-Chain Credit</h5>
                <p className="card-text">Using NFT invoices recorded on the blockchain, our system provides a secure and transparent approach to credit-building.</p>
                <a href="#" className="btn btn-success">Go somewhere</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Create Invoices</h5>
                <p className="card-text">Start creating invoices to generate credit history on chain</p>
                <a href="#" className="btn btn-success">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Become a Validator</h5>
                <p className="card-text">Get rewarded by joining our validator network and confirming cash transactions</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Join KredDao</h5>
                <p className="card-text">Oversee our validator network and</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
