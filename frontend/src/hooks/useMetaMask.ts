import { useState } from "react";

const useMetaMask = () => {
  const [address, setAddress] = useState("");

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask extension!");
    }
  };

  return {
    address,
    connectMetaMask,
  };
};
export default useMetaMask;
