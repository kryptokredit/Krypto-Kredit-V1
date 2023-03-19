import { mintTheInvoice } from "../components/factoryWeb3";

export function getDataFromTree(unixTimestamp) {
  const newData = new Date(unixTimestamp * 1000);
  console.log("THIS IS DATA",newData)
  const year = newData.getFullYear();
  const month = String(newData.getMonth() + 1).padStart(2, "0");
  const day = String(newData.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);
  return formattedDate;
}


export const allColumns = [
  {
    name: <span style={{ fontWeight: "bold" }}>ID</span>,
    selector: (row) => row.idInvoice,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Name</span>,
    selector: "invoicer",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>amount</span>,
    selector: "amount",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: (row) => {
      getDataFromTree(row.dueDate);
    },
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Status</span>,
    selector: "status",
    cell: (row) => (
      <button
        className="btn"
        disabled
        style={{
          width: "120px",
          height: "auto",
          alignItems: "center",
          backgroundColor:
            row.status === "unpaid"
              ? "yellow"
              : row.status === "outstanding"
              ? "red"
              : "green",
        }}
      >
        {row.status}
      </button>
    ),
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Mint</span>,
    selector: "view",
    cell: (row) => (
      <button
        className="btn  btn-sm"
        onClick={() => {
          mintTheInvoice(row.idInvoice);
        }}
        style={{ width: "80px", height: "auto", backgroundColor: "#12E26C" }}
      >
        Mint
      </button>
    ),
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Send Soulbound</span>,
    cell: (row) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => console.log(`Soulbound ${row.id}`)}
      >
        Send Soulbound
      </button>
    ),
  },
];

export const unpaidColumns = [
  {
    name: <span style={{ fontWeight: "bold" }}>ID</span>,
    selector: (row) => row.idInvoice,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Name</span>,
    selector: "invoicer",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: "amount",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: (row) => row.dueDate,
  },

  {
    name: <span style={{ fontWeight: "bold" }}>Sell</span>,
    selector: "Sell",
    cell: (row) => (
      <button
        className="btn btn-success btn-sm"
        onClick={() => console.log(`Sell ${row.id}`)}
      >
        Sell
      </button>
    ),
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Borrow</span>,
    cell: (row) => (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => console.log(`Borrow ${row.id}`)}
      >
        Borrow
      </button>
    ),
  },
];

export const paidColumns = [
  {
    name: <span style={{ fontWeight: "bold" }}>ID</span>,
    selector: (row) => row.idInvoice,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Name</span>,
    selector: "invoicer",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: "amount",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: "dueDate",
  },
];

export const outstandingColumns = [
  {
    name: <span style={{ fontWeight: "bold" }}>Name</span>,
    selector: "invoicer",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: "amount",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: "dueDate",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Send Soulbound</span>,
    cell: (row) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => console.log(`Soulbound ${row.id}`)}
      >
        Send Soulbound
      </button>
    ),
  },
];
