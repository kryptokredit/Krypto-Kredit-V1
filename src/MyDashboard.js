import React, { useState } from "react";
import { useSpectral } from "@spectral-finance/spectral-modal";
function MyDashboard() {
  const [activeLink, setActiveLink] = useState("Active");
    const [stringAccount, setStringAccount] = useState(null);
  const { start, score } = useSpectral();
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };
  React.useEffect(() => {
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
            setStringAccount(
              accounts[0]
                ? accounts[0].slice(0, 5) + "..." + accounts[0].slice(39, 42)
                : "Connect"
            );
            return accounts[0];
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    fetchAccount();
  }, []);
  return (
    <>
      <div className="card mb-3 p-4">
        <img
          src="\header.jpg"
          className="card-img-fluid"
          alt=""
          style={{ width: "auto", marginBottom: "-150px" }}
        />
        <div className="card-body">
          <div>
            <img
              src="\profile_pic.jpg"
              className="img-thumbnail rounded-circle"
              alt=""
              style={{ height: "220px" }}
            />
          </div>
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding:"10px"
            }}
          >
            <p
              className="card-text"
              style={{
                fontWeight: "bold",
                fontSize: "30px",

                marginTop: "20px",
                width: "auto",

                alignItems: "center",
              }}
            >
              {stringAccount}{" "}
              <p
                className="card-text"
                style={{
                  fontWeight: "bold",
                  width: "auto",
                  fontSize: "20px",
                  marginRight: "20px",
                  display: "flex",
                  color:"blue",
                  alignItems: "center",
                  marginRigth: "20px",
                }}
              >
                Score: {score}
              </p>
            </p>

            <button
              style={{
                height: "40px",
                width: "150px",
                marginLeft: "50px",
              }}
              onClick={start}
            >
              Spectral Score
            </button>
          </div>
        </div>
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeLink === "Active" ? "active" : ""
                  }`}
                  aria-current="true"
                  href="#"
                  onClick={() => handleLinkClick("Active")}
                >
                  Active
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeLink === "Link" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleLinkClick("Link")}
                >
                  Link
                </a>
              </li>
            </ul>
          </div>

          <div
            className="card-deck d-flex justify-content-center gap-3"
            style={{ marginTop: "20px" }}
          >
            <div
              className="card border-primary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">Status: Renegotiated</div>
              <div className="card-body text-primary">
                <h5 className="card-title">Beamer Auto</h5>
                <p className="card-text">
                  Engine Oil Change and Brake Pad Replacement
                </p>
              </div>
            </div>

            <div
              className="card border-secondary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">Status: Paid</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">Firm Inc.</h5>
                <p className="card-text">
                  Legal Consultation and Drafting Legal Documents
                </p>
              </div>
            </div>

            <div
              className="card border-dangers mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">Status: Unpaid</div>
              <div className="card-body text-danger">
                <h5 className="card-title">Denver Medical </h5>
                <p className="card-text">Medications and Medical Supplies:</p>
              </div>
            </div>

            <div
              className="card border-danger mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">Status: Unpaid</div>
              <div className="card-body text-danger">
                <h5 className="card-title">Dental Services.Coe</h5>
                <p className="card-text">
                  Comprehensive Dental Checkup and teeth Cleaning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyDashboard;
