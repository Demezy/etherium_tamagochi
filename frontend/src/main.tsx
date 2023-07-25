import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { WagmiConfig } from "wagmi";
import ledgerConfig from "./ledger/ledger_wrapper";
import '@fontsource/public-sans';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <WagmiConfig config={ledgerConfig}>
      <RouterProvider router={router} />
    </WagmiConfig>
  </React.StrictMode>,
);
