import { mintTheInvoice } from "../components/factoryWeb3";

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
    selector: (row) => row.dueDate,
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
  
            mintTheInvoice(row.idInvoice)

          ;
        }}
        style={{ width: "80px", height: "auto", backgroundColor: "#12E26C" }}
      >
        Mint
      </button>
    ),
  },
  {
    name: (
      <span style={{ fontWeight: "bold" }}>
        {window.innerWidth < 768 ? "+" : "+ Create an Invoice"}
      </span>
    ),
    selector: "view",
    cell: (row) => (
      <button
        className="btn btn-primary"
        onClick={() => {}}
        style={{ width: "120px", height: "auto" }}
      >
        {window.innerWidth < 768 ? "View" : "View Invoice"}
      </button>
    ),
  },
];

export const unpaidColumns = [
  {
    name: <span style={{ fontWeight: "bold" }}>ID</span>,
    selector: (row) => row.id,
  },
  { name: <span style={{ fontWeight: "bold" }}>Name</span>, selector: "Name" },
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
    selector: (row) => row.id,
  },
  { name: <span style={{ fontWeight: "bold" }}>Name</span>, selector: "Name" },
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
  { name: <span style={{ fontWeight: "bold" }}>Name</span>, selector: "Name" },
  {
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: "amount",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: "dueDate",
  },
];
