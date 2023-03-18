import { signInvoicePayer, getInvoice, payInvoice } from "../components/factoryWeb3";
export const allColumns = [
  {
    name: <span style={{ fontWeight: "bold" }}>ID</span>,
    selector: (row) => row.idInvoice,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: (row) => row.amount,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: (row) => row.dueDate,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Status</span>,
    selector: (row) => row.status,
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
    name: (
      <span style={{ fontWeight: "bold" }}>
        {window.innerWidth < 768 ? "View" : "View Invoice"}
      </span>
    ),
    selector: "view",
    cell: (row) => (
      <button
        className="btn btn-primary"
        onClick={async () => {
          const data = await getInvoice(row.idInvoice);
          console.log("THIS IS THE DATA OF THE SIGNATURE", data.payerSignature);
          if (data.payerSignature === null) {
            signInvoicePayer(row.idInvoice);
          } else {
          }
        }}
        style={{ width: "120px", height: "auto" }}
      >
        {window.innerWidth < 768 ? "Sign" : "Sign Invoice"}
      </button>
    ),
  },
  {
    name: (
      <span style={{ fontWeight: "bold" }}>
        {window.innerWidth < 768 ? "Pay" : "Pay Invoice"}
      </span>
    ),
    selector: "pay",
    cell: (row) => (
      <button
        className="btn btn-primary"
        onClick={async () => {
          const data = await getInvoice(row.idInvoice);
          console.log("THIS IS THE DATA OF THE INVOIDEEEEEE!!!!!", data);
          payInvoice(row.idInvoice,row.amount);
        }}
        style={{ width: "120px", height: "auto" }}
      >
        {window.innerWidth < 768 ? "Pay" : "Pay Invoice"}
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
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: (row) => row.amount,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: (row) => row.dueDate,
  },

  {
    name: <span style={{ fontWeight: "bold" }}>Pay</span>,
    selector: (row) => row.paid,
    cell: (row) => (
      <button
        className="btn btn-success btn-sm"
        onClick={() => console.log(`Pay ${row.id}`)}
      >
        Pay
      </button>
    ),
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Renegotiate</span>,
    cell: (row) => (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => console.log(`Borrow ${row.id}`)}
      >
        Renegotiate
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
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: (row) => row.amount,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: (row) => row.dueDate,
  },
];

export const outstandingColumns = [
  {
    name: <span style={{ fontWeight: "bold" }}>ID</span>,
    selector: (row) => row.idInvoice,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: (row) => row.amount,
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: (row) => row.dueDate,
  },

  {
    name: <span style={{ fontWeight: "bold" }}>Pay</span>,
    cell: (row) => (
      <button
        className="btn btn-success btn-sm"
        onClick={() => console.log(`Pay ${row.id}`)}
      >
        Pay
      </button>
    ),
  },

  {
    name: <span style={{ fontWeight: "bold" }}>Renegotiate</span>,
    cell: (row) => (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => console.log(`Renegotiate ${row.id}`)}
      >
        Renegotiate
      </button>
    ),
  },
];
