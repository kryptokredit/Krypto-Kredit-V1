export const allColumns = [
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
    selector: "dueDate",
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
    name: <span style={{ fontWeight: "bold" }}>View invoice</span>,
    selector: "view",
    cell: (row) => (
      <button
        className="btn btn-primary"
        onClick={() => console.log(`Sell ${row.id}`)}
        style={{ width: "120px", height: "auto" }}
      >
        View invoice
      </button>
    ),
  },
];

export const unpaidColumns = [
  { name: <span style={{ fontWeight: "bold" }}>Name</span>, selector: "Name" },
  {
    name: <span style={{ fontWeight: "bold" }}>Amount</span>,
    selector: "amount",
  },
  {
    name: <span style={{ fontWeight: "bold" }}>Due Date</span>,
    selector: "dueDate",
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
