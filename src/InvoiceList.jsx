import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  allColumns,
  outstandingColumns,
  paidColumns,
  unpaidColumns,
} from "./helpers/columns";
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");

// const conditionalRowStyles = [
//   {
//     when: row => row.status === "unpaid",
//     style: row => ({
//       backgroundColor: "rgba(255, 255, 0, 0.5)",
//     }),
//   },
//   {
//     when: row => row.status === "paid",
//     style: row => ({
//       backgroundColor: "rgba(0, 255, 0, 0.5)",
//     }),
//   },
//   {
//     when: row => row.status === "outstanding",
//     style: row => ({
//       backgroundColor: "rgba(255, 0, 0, 0.5)",
//     }),
//   },
// ];

function InvoiceList() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  // const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [columns, setColumns] = useState(allColumns);
  const [account, setAccount] = useState("");
  const [graphData, setGraphData] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [data, setData] = useState(graphData);

  const GET_INVOICE_CREATEDS_QUERY = gql`
    query GetPotentialInvoices($invoicer: String!) {
      potentialInvoices(
        where: { invoicer: $invoicer }
        orderBy: idInvoice
        orderDirection: desc
      ) {
        id
        idInvoice
        invoicer
        payer
        dueDate
        fee
        amount
        blockNumber
        blockTimestamp
      }
    }
  `;
  const API_URL =
    "https://api.thegraph.com/subgraphs/name/luiscmogrovejo/factory-graph";

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache(),
      }),
    []
  );

  const getGraph = useCallback(async () => {
    if (account) {
      try {
        const { data } = await client.query({
          query: GET_INVOICE_CREATEDS_QUERY,
          variables: {
            invoicer: account,
          },
        });
        console.log("DATA", data);
        setGraphData(data.potentialInvoices);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
  }, [account, client, GET_INVOICE_CREATEDS_QUERY]);

  useEffect(() => {
    async function fetchAccount() {
      // Check if Web3 is available and if Metamask is installed
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();

          // Get the user's Metamask account address
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          // Save the account to the state
          setAccount(accounts[0]);
          console.log("ACCOUNTSS", accounts[0]);
          await getGraph();
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchAccount();
  }, [getGraph]);

  const filterData = (status) => {
    if (status === "all") {
      setData(graphData);
      setColumns(allColumns);
    } else if (status === "unpaid") {
      console.log("UNPAID FILTAR", graphData);
      setData(graphData.filter((item) => item.paid === false));

      setColumns(unpaidColumns);
    } else if (status === "paid") {
      setData(graphData.filter((item) => item.paid === true));

      setColumns(paidColumns);
    } else if (status === "outstanding") {
      setData(graphData.filter((item) => item.dueDate > Date.now()));

      setColumns(outstandingColumns);
    }

    setSelectedStatus(status);
  };

  return (
    <div>
      {" "}
      <h1 style={{ textAlign: "center", color: "black" }}>My Invoices</h1>
      <div
        style={{
          margin: "10vh 5% 5% 5%",
          padding: "20px",
          borderRadius: "10px 10px 0 0",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => filterData("paid")}
            style={{ backgroundColor: "#12E26C", color: "white" }}
            className={`btn  me-2 ${selectedStatus === "paid" ? "active" : ""}`}
          >
            Paid
          </button>
          <button
            onClick={() => filterData("unpaid")}
            style={{ backgroundColor: "#12E26C", color: "white" }}
            className={`btn  me-2 ${
              selectedStatus === "unpaid" ? "active" : ""
            }`}
          >
            Unpaid
          </button>
          <button
            onClick={() => filterData("outstanding")}
            style={{ backgroundColor: "#12E26C", color: "white" }}
            className={`btn me-2 ${
              selectedStatus === "outstanding" ? "active" : ""
            }`}
          >
            Outstanding
          </button>
          <button
            onClick={() => filterData("all")}
            style={{
              backgroundColor: "#12E26C",
              color: "white",
            }}
            className={`btn btn-success ${
              selectedStatus === "all" ? "active" : ""
            }`}
          >
            All
          </button>
        </div>
        <div style={{ border: "3px solid #000080", borderRadius: "20px" }}>
          <DataTable columns={columns} data={graphData} />
        </div>

        <Link to="/invoiceForm" style={{ textDecoration: "none" }}>
          <button
            type="button"
            className="btn"
            style={{
              position: "absolute",
              backgroundColor: "#0c9c4a",
              top: "25px",
              right: "20px",
              color: "white",
              fontSize: "15px",
              display: "flex",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
              outline: "none",
              cursor: "pointer",
              opacity: isHovering ? 0.8 : 1,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {window.innerWidth < 768 ? "+" : "+ Create an Invoice"}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InvoiceList;
