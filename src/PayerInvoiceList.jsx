import React, { useState, useCallback, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { getInvoice, getYourPayments } from "./components/factoryWeb3";
import {
  allColumns,
  outstandingColumns,
  paidColumns,
  unpaidColumns,
} from "./helpers/payercolumns";
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
function PayerInvoiceList() {
  const [data, setData] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  // const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [account, setAccount] = useState("");
  const [graphData, setGraphData] = useState("");
  // const { loading, error, data } = useQuery(INVOICE_CREATEDS_QUERY);
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
            setAccount(accounts[0])
            return accounts[0];
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    fetchAccount();
  }, []);
  // const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [payercolumns, setColumns] = useState(allColumns);

  const GET_POTENTIAL_INVOICES = gql`
    query GetPotentialInvoices($payer: String!) {
      potentialInvoices(where: { payer: $payer }) {
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

  const APIURL =
    "https://api.thegraph.com/subgraphs/name/luiscmogrovejo/factory-graph";

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
      }),
    []
  );



  const getGraph = useCallback(async () => {
    if (!account) {
      return;
    }

    try {
      const { data } = await client.query({
        query: GET_POTENTIAL_INVOICES,
        variables: { payer: account },
      });
      const newArray = data.potentialInvoices.map((row) => {
        console.log("ROOOOW",row)
        const invoice = getInvoice(row.idInvoice);
        console.log("INVOICE",invoice)
        const paidInvoice = invoice.paid;
        const outstanding = invoice.dueDate > Date.now();
        return {
          amount: row.amount,
          blockNumber: row.blockNumber,
          blockTimestamp: row.blockTimestamp,
          dueDate: row.dueDate,
          fee: row.fee,
          id: row.id,
          idInvoice: row.idInvoice,
          invoicer: row.invoicer,
          payer: row.payer,
          paid: paidInvoice,
          status: paidInvoice ? "Paid" : outstanding ? "Outstanding" : "Unpaid",
        };
      });
      console.log("GRAPH DATA", newArray);
      setGraphData(newArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [account, client, GET_POTENTIAL_INVOICES]);

  useEffect(() => {
    getGraph();
  }, [getGraph]);

  const filterData = (status) => {
    getGraph();
    if (status === "all") {
      setData(graphData);
      setColumns(allColumns);
    } else if (status === "unpaid") {
      setData(graphData.filter((item) => item.status === "Unpaid"));

      setColumns(unpaidColumns);
    } else if (status === "paid") {
      setData(graphData.filter((item) => item.status === "Paid"));

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
      <h1 style={{ textAlign: "center", color: "black" }}>Payer Invoice</h1>
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
            style={{ backgroundColor: "#4E4FE9", color: "white" }}
            className={`btn  me-2 ${selectedStatus === "paid" ? "active" : ""}`}
          >
            Paid
          </button>
          <button
            onClick={() => filterData("unpaid")}
            style={{ backgroundColor: "#4E4FE9", color: "white" }}
            className={`btn  me-2 ${
              selectedStatus === "unpaid" ? "active" : ""
            }`}
          >
            Unpaid
          </button>
          <button
            onClick={() => filterData("outstanding")}
            style={{ backgroundColor: "#4E4FE9", color: "white" }}
            className={`btn me-2 ${
              selectedStatus === "outstanding" ? "active" : ""
            }`}
          >
            Outstanding
          </button>
          <button
            onClick={() => filterData("all")}
            style={{
              backgroundColor: "#4E4FE9",
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
          <DataTable columns={payercolumns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default PayerInvoiceList;
