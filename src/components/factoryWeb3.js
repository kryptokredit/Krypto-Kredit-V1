import Web3 from "web3";

async function fetchAccount() {
  // Check if Web3 is available and if Metamask is installed
  if (window.ethereum) {
    try {
      await window.ethereum.enable();

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      console.log("ACCOUNTSS", accounts[0]);
      return accounts[0];
    } catch (error) {
      console.log(error);
    }
  }
}
const abi = require("../abis/abi.json");
const web3 = new Web3(window.ethereum);
const contractAddress = "0x0F97AAB884B8d1A49B0a4941B77fe08D8Ad19696";
const contract = new web3.eth.Contract(abi, contractAddress);

export const derogatoryContractUpdate = async (newAddress) => {
  const account = await fetchAccount();
  await contract.methods
    .derogatoryContractUpdate(newAddress)
    .send({ from: account });
};

export const certifateContractUpdate = async (newAddress) => {
  const account = await fetchAccount();
  await contract.methods
    .certifateContractUpdate(newAddress)
    .send({ from: account });
};

export const issueDerogatoryMark = async (id) => {
  const account = await fetchAccount();
  await contract.methods.issueDerogatoryMark(id).send({ from: account });
};

export const revokeDerogatoryMark = async (id) => {
  const account = await fetchAccount();
  await contract.methods.revokeDerogatoryMark(id).send({ from: account });
};

export const updateValidatorContract = async (validatorContract) => {
  const account = await fetchAccount();
  await contract.methods
    .updateValidatorContract(validatorContract)
    .send({ from: account });
};

export const addAddressToWhitelist = async (account) => {
  await contract.methods.addAddressToWhitelist(account).send({ from: account });
};

export const addAddressesToWhitelist = async (accounts) => {
  const account = await fetchAccount();
  await contract.methods
    .addAddressesToWhitelist(accounts)
    .send({ from: account });
};

export const removeAddressFromWhitelist = async (account) => {
  await contract.methods
    .removeAddressFromWhitelist(account)
    .send({ from: account });
};

export const createInvoice = async (
  amount,
  dueDate,
  payer,
  validator,
  fee,
  id
) => {
  const account = await fetchAccount();
  await contract.methods
    .createInvoice(amount, dueDate, payer, validator, fee)
    .send({ from: account });
  await signInvoiceInvoicer(id);
};

export const signInvoiceInvoicer = async (id) => {
  console.log("THISS");
  const account = await fetchAccount();
  console.log("Account", account);
  const invoice = await getInvoice(id);
  console.log("invoice", invoice);
  const message = await contract.methods
    .getMessageHash(
      invoice.invoicer,
      invoice.amount,
      invoice.dueDate,
      invoice.payer,
      invoice.idInvoice
    )
    .call();
  console.log("message", message);
  const signature = await signMessageWithMetaMask(message);
  await contract.methods
    .signInvoiceInvoicer(id, signature)
    .send({ from: account });
};

export const signInvoicePayer = async (id) => {
  console.log("THISS");
  const account = await fetchAccount();
  console.log("Account", account);
  const invoice = await getInvoice(id);
  console.log("invoice", invoice);
  const message = await contract.methods
    .getMessageHash(
      invoice.invoicer,
      invoice.amount,
      invoice.dueDate,
      invoice.payer,
      invoice.idInvoice
    )
    .call();
  console.log("message", message);
  const signature = await signMessageWithMetaMask(message);
  await contract.methods
    .signInvoicePayer(id, signature)
    .send({ from: account });
};

export const signInvoiceValidator = async (id) => {
  console.log("THISS");
  const account = await fetchAccount();
  console.log("Account", account);
  const invoice = await getInvoice(id);
  console.log("invoice", invoice);
  const message = await contract.methods
    .getMessageHash(
      invoice.invoicer,
      invoice.amount,
      invoice.dueDate,
      invoice.payer,
      invoice.idInvoice
    )
    .call();
  console.log("message", message);
  const signature = await signMessageWithMetaMask(message);
  await contract.methods
    .signInvoiceValidator(id, signature)
    .send({ from: account });
};
async function signMessageWithMetaMask(message) {
  const account = await fetchAccount();
  return await window.ethereum
    .request({
      method: "personal_sign",
      params: [account, message],
    })
    .catch((error) => {
      console.error("Error signing message:", error); // Handle any errors that occur
    });
}
export const mintTheInvoice = async (id) => {
  const account = await fetchAccount();
  await contract.methods
    .mintTheInvoice(id, "This is an NFT Invoicce")
    .send({ from: account });
};

export const payInvoice = async (id, amount) => {
  const account = await fetchAccount();
  await contract.methods.payInvoice(id).send({ from: account, value: amount });
};

export const requestRenegotiation = async (
  id,
  newAmount,
  newFee,
  newDate,
  payerSignature
) => {
  const account = await fetchAccount();
  await contract.methods
    .requestRenegotiation(id, newAmount, newFee, newDate, payerSignature)
    .send({ from: account });
};

export const declineRenegotiation = async (id) => {
  const account = await fetchAccount();
  await contract.methods.declineRenegotiation(id).send({ from: account });
};

export const acceptRenegotiation = async (id, invoicerSignature) => {
  const account = await fetchAccount();
  await contract.methods
    .acceptRenegotiation(id, invoicerSignature)
    .send({ from: account });
};

export const closeDeal = async (id) => {
  const account = await fetchAccount();
  await contract.methods.closeDeal(id).send({ from: account });
};

export const getInvoice = async (id) => {
  const account = await fetchAccount();
  return await contract.methods.getInvoice(id).call({ from: account });
};
export const yourInvoices = async (id) => {
  const account = await fetchAccount();
  return await contract.methods.yourInvoices(id).call({ from: account });
};

export const getYourPayments = async () => {
  const account = await fetchAccount();
  return await contract.methods.getPayments(account).call({from: account});
};

