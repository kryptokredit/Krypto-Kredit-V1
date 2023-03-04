  const [data, setData] = useState(allData);
  const [selectedStatus, setSelectedStatus] = useState("all");
  // const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [columns, setColumns] = useState(allColumns);
  const [account, setAccount] = useState("");
  const [graphData, setGraphData] = useState("");

  const queryClaimer = `
    query {
      invoiceCreateds(where: { invoicer: "0x1ecea29029b81981cb9b25a3f4623828b9e8204c"} ) {
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
      client
        .query({
          query: gql(queryClaimer),
        })
        .then((data) => {
          let newData = [];

          for (let i = 0; i < data.data.length; i++) {
            console.log("DATA", data.data.invoiceCreateds[0]);
            const paidInvoice = getInvoice(i).paid;
            const outstanding =
              data.data.invoiceCreateds[i].dueDate > Date.now();
            let inputData = {
              amount: data.data.invoiceCreateds[i].amount,
              blockNumber: data.data.invoiceCreateds[i].blockNumber,
              blockTimestamp: data.data.invoiceCreateds[i].blockTimestamp,
              dueDate: data.data.invoiceCreateds[i].dueDate,
              fee: data.data.invoiceCreateds[i].fee,
              id: data.data.invoiceCreateds[i].id,
              idInvoice: data.data.invoiceCreateds[i].idInvoice,
              invoicer: data.data.invoiceCreateds[i].invoicer,
              payer: data.data.invoiceCreateds[i].payer,
              status: paidInvoice
                ? "paid"
                : outstanding
                ? "outstanding"
                : "unpaid",
            };
            newData.push(inputData);
          }

          setGraphData(newData);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
    } else {
      console.log("FUUUUUUUUUUUCKKKK");
    }
  }, [account, client, queryClaimer]);

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
      setData(allData);
      setColumns(allColumns);
    } else if (status === "unpaid") {
      setData(allData.filter((item) => item.status === status));

      setColumns(unpaidColumns);
    } else if (status === "paid") {
      setData(allData.filter((item) => item.status === status));

      setColumns(paidColumns);
    } else if (status === "outstanding") {
      setData(allData.filter((item) => item.status === status));

      setColumns(outstandingColumns);
    }

    setSelectedStatus(status);
  };