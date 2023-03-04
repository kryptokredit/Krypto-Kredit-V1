import { Navbar, Nav, Dropdown } from "react-bootstrap";
// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import React, { useState, useEffect } from "react";
// Adapters

import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../web3RPC"; // for using web3.js
const clientId =
  "BMiMRhFcsQecW2L7V7ngfhxR_nt2dRUObTo83WS6UykQwepxJgWGD9vLxInunxKy_gGQ0060TWa8yHDaSoBZNdQ"; // get from https://dashboard.web3auth.io

function Header() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] =
    useState<SafeEventEmitterProvider | null>(null);
  const [user, setUser] = useState<String | null>(null);
  const [userToken, setUserToken] = useState<String | null>(null);
  const [stringAccount, setStringAccount] = useState<String | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://polygon-mumbai.blockpi.network/v1/rpc/public	",
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["facebook", "google"],
            defaultLanguage: "en",
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
          },
          web3AuthNetwork: "cyan",
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "default",
          },
          adapterSettings: {
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              dark: true,
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#00a8ff" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
        await web3auth.addPlugin(torusPlugin);

        const walletConnectV1Adapter = new WalletConnectV1Adapter({
          adapterSettings: {
            bridge: "https://bridge.walletconnect.org",
          },
          clientId,
        });

        web3auth.configureAdapter(walletConnectV1Adapter);

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600,
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://polygon-mumbai.blockpi.network/v1/rpc/public	",
          },
        });
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://polygon-mumbai.blockpi.network/v1/rpc/public	",
          },
          web3AuthNetwork: "cyan",
        });

        web3auth.configureAdapter(metamaskAdapter);

        const torusWalletAdapter = new TorusWalletAdapter({
          clientId,
        });

        web3auth.configureAdapter(torusWalletAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [user, userToken]);

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    uiConsole("Logged in Successfully!");
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    setUserToken(idToken.toString());
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log("USERRR", user);
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setUser(address);
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  const changeNetwork = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  useEffect(() => {
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
              user ? user.slice(0, 5) + "..." + user.slice(39, 42) : "Connect"
            );
            return accounts[0];
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    getAccounts();

    fetchAccount();
  }, [getAccounts, login, user]);

  return (
    <div className="b-flex w-auto px-5 bg-light">
      <div></div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src="/KryptoKreditLogo.png"
            alt="Logo"
            style={{ width: "200px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " className="justify-content-end">
          <Nav className="ml-auto justify-content-end">
            <div className="d-flex w-auto justify-content-center">
              <div className="d-flex justify-content-around">
                <div className="">
                  <Dropdown as={Nav.Item}>
                    <Dropdown.Toggle
                      as={Nav.Link}
                      style={{ marginRight: "15px" }}
                    >
                      Invoicer
                    </Dropdown.Toggle>
                    <div className="">
                      <Dropdown.Menu>
                        <Dropdown.Item href="/InvoiceList">
                          My Invoices
                        </Dropdown.Item>
                        <Dropdown.Item href="/InvoiceForm">
                          Create an Invoice
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </div>
                  </Dropdown>
                </div>

                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    style={{ marginRight: "15px" }}
                  >
                    Payer
                  </Dropdown.Toggle>
                  <div className="">
                    <Dropdown.Menu>
                      <Dropdown.Item href="/PayerInvoiceList">
                        My Invoices
                      </Dropdown.Item>
                      <Dropdown.Item href="/MyDashboard">
                        My Dashboard
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </div>
                </Dropdown>
                <button
                  style={{
                    fontSize: "12px" /* adjust the font size as needed */,
                    fontWeight: "bold",
                    color:
                      "#fff" /* set the font color to contrast with the background color */,
                    backgroundColor: "#12E26C",
                    border: "none",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    transition: "all 0.3s ease-in-out",
                    marginRight: "15px",
                    width: "110px",
                    height: "40px",
                  }}
                  onClick={() => {
                    if (user) {
                      logout();
                    } else {
                      login();
                    }
                  }}
                >
                  {stringAccount}
                </button>
              </div>
            </div>

            <Nav.Item></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
