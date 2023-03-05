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
        <img src="\header.jpg" class="card-img-fluid crop-image" alt="" />

        <div className="card-body">
          <div>
            <img
              src="\profile_pic.jpg"
              className="img-thumbnail rounded-circle"
              alt=""
              style={{ height: "220px",marginTop:"-150px" }}
            />
          </div>
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
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
              {stringAccount}
              <p
                className="card-text"
                style={{
                  fontWeight: "bold",
                  width: "auto",
                  fontSize: "20px",

                  display: "flex",
                  color: "blue",
                  alignItems: "center",
                  marginRigth: "20px",
                }}
              >
                Score: {score}
              </p>
            </p>
            <div
              style={{
                width: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <img
                  src="Spectral_Finance.png"
                  alt=""
                  style={{ width: "60px" }}
                />
                <button
                  style={{
                    height: "40px",
                    width: "150px",
                    marginLeft: "0px",
                    backgroundColor: "#5f5fff",
                    borderRadius: "5px",
                    border: "none",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#4c4cff")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5f5fff")
                  }
                  onClick={start}
                >
                  Spectral Score
                </button>
              </div>

              <div style={{marginLeft:"15px"}}>

                  <img src="HumaLogo.jpg" alt="" style={{ width: "30px" }} />

                <button
                  style={{
                    height: "40px",
                    width: "150px",
                    marginTop: "10px",
                    marginLeft: "15px", // Increased the margin to give some space between the buttons
                    backgroundColor: "#a061d1", // Changed the background color to a purple shade
                    borderRadius: "5px",
                    border: "none",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#8a44c7")
                  } // Changed the hover color to a darker shade of purple
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#a061d1")
                  }
                  onClick={() =>
                    (window.location.href = "https://huma.finance/")
                  } // Added the window.location.href function to go to the Huma Finance website
                >
                  Explore Huma
                </button>
              </div>
            </div>
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
            className="card-deck d-flex justify-content-center gap-3 flex-wrap"
            style={{ marginTop: "20px" }}
          >
            <div
              className="card border-primary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">Status: Verified</div>
              <div className="card-body text-primary">
                <h5 className="card-title">Beamer Auto</h5>
                <p className="card-text">
                  Engine Oil Change and Brake Pad Replacement
                </p>
              </div>
              <a href="https://app.huma.finance/#/borrow">
                Go to Huma
                <img
                  src="/HumaLogo.jpg"
                  style={{ width: "30px", padding: "5px" }}
                ></img>
              </a>
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
