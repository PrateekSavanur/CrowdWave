import { useState } from "react";
import { ethers } from "ethers";
import ContractABI from "../abi/Crowdfunding.json";

function Form() {
  const [formData, setFormData] = useState({
    owner: "",
    goalAmount: "",
    durationOfCrowdfunding: "",
    tokenName: "",
    tokenTicker: "",
    tokenPerETH: "",
    companyName: "",
    description: "",
  });

  const contractAddress = "0x9a738c3D025E503cF14a598E5Ad45F92bF46877a";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      owner,
      goalAmount,
      durationOfCrowdfunding,
      tokenName,
      tokenTicker,
      tokenPerETH,
      companyName,
      description,
    } = formData;

    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
          contractAddress,
          ContractABI,
          provider.getSigner()
        );

        const goalAmountWei = ethers.utils.parseEther(goalAmount.toString()); // Convert to wei

        const tx = await contract.createProject(
          companyName,
          description,
          owner,
          goalAmountWei,
          durationOfCrowdfunding,
          tokenName,
          tokenTicker,
          tokenPerETH
        );

        await tx.wait();

        console.log("Transaction successful");

        // Clear form after submission
        setFormData({
          owner: "",
          goalAmount: "",
          durationOfCrowdfunding: "",
          tokenName: "",
          tokenTicker: "",
          tokenPerETH: "",
          companyName: "",
          description: "",
        });
      } else {
        throw new Error("MetaMask not detected");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-6 ">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white shadow-md rounded-lg max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-4">
          <span className="text-amber-500">RAISE </span>FUNDS
        </h1>
        <div>
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm h-32"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Enter owner"
          />
        </div>
        <div>
          <label className="block text-gray-700">Goal Amount (ETH)</label>
          <input
            type="text"
            name="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Enter goal amount"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Duration of crowdfunding (days)
          </label>
          <input
            type="text"
            name="durationOfCrowdfunding"
            value={formData.durationOfCrowdfunding}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Enter duration of crowdfunding"
          />
        </div>
        <div>
          <label className="block text-gray-700">Token Name</label>
          <input
            type="text"
            name="tokenName"
            value={formData.tokenName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Enter token name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Token Ticker</label>
          <input
            type="text"
            name="tokenTicker"
            value={formData.tokenTicker}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Enter token ticker"
          />
        </div>
        <div>
          <label className="block text-gray-700">Token per ETH</label>
          <input
            type="text"
            name="tokenPerETH"
            value={formData.tokenPerETH}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Enter token per ETH"
          />
        </div>

        <div className="text-red-600 text-center mt-2">
          <p>
            Make sure your token minted does not goes under 1. It can cause
            issues with ICO
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
