import React from "react";




function Home() {
  return (
    <div
      style={{ margin: "3% 3%" }}
      className="row align-items-center py-5 hero-section"
    >
      <div className="col-md-6">
        <h1
          style={{
            background: "linear-gradient(to right, #00bfff, #32cd32)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Montserrat Alternates",
          }}
          className="display-5 fw-bold lh-1 mb-3 text-left"
        >
          Join the future of finance, earn credit on chain for your everyday
          transactions
        </h1>
        <p style={{ color: "black", fontFamily: "Roboto" }} className="lead mb-4 text-left">
          Redefining Credit: A Peer-to-Peer Approach
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
          <button
            style={{ background: "#12E26C", fontFamily: "Roboto" }}
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
            style={{fontFamily: "Roboto"}}
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <img
          style={{ maxWidth: "80%", padding: "5px" }}
          alt="Hero title"
          src="./undraw_sharing_knowledge_03vp.svg"
        />
       
       
      </div>
      <div class="row" style={{marginTop: "15%"}}>
  <div class="col-sm-6" >
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Build On-Chain Credit</h5>
        <p class="card-text">Using NFT invoices recorded on the blockchain, our system provides a secure and transparent approach to credit-building.</p>
        <a href="#" class="btn btn-success">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Create Invoices</h5>
        <p class="card-text">Start creating invoices to generate credit history on chain</p>
        <a href="#" class="btn btn-success">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
      
      <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Become a Validator</h5>
        <p class="card-text">Get rewarded by joining our validator network and confirming cash transactions</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Join KredDao</h5>
        <p class="card-text">Oversee our validator network and </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div> 
        
      
     
    </div>
  );
}

export default Home;
