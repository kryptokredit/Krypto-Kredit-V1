//import RPC from "./ethersRPC"; // for using ethers.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import InvoiceList from "./InvoiceList";
import PayerInvoiceList from "./PayerInvoiceList";
import Header from "./components/Header";
import InvoiceForm from "./invoiceForm";
import MyDashboard from "./MyDashboard";

function App() {


  return (
    <div>
      <Header />
      <BrowserRouter>
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/InvoiceForm" element={<InvoiceForm />} />
          <Route path="/InvoiceList" element={<InvoiceList />} />
          <Route path="/PayerInvoiceList" element={<PayerInvoiceList />} />
          <Route path="/MyDashboard" element={<MyDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
