import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import arrowBlack from "../images/arrow-black.png";
import userImg from "../images/user.png";

// const CONFIG = {
//   CHAINID: "0xaa36a7", // Sepolia testnet chain ID in hex
// };

const LandingPage = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (window.scrollY > 0) {
        navbar.style.background = "#eefff9";
      } else {
        navbar.style.background = "transparent";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        try {
          const chain = await window.ethereum.request({
            method: "eth_chainId",
          });
          const sepoliaChainId = "0xaa36a7"; // Sepolia testnet chain ID

          if (chain === sepoliaChainId) {
            const addressArray = await window.ethereum.request({
              method: "eth_requestAccounts",
            });

            console.log("addressArray", addressArray);
            if (addressArray.length > 0) {
              // Redirect to products page
              window.location.href = "/products";
              return {
                address: addressArray[0],
              };
            } else {
              console.log(`😥 Connect your wallet account to the site.`);
            }
          } else {
            // Change to Sepolia chain if not connected
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: sepoliaChainId }],
            });
            const addressArray = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            if (addressArray.length > 0) {
              // Redirect to products page
              window.location.href = "/products";
              return {
                address: addressArray[0],
              };
            }
          }
        } catch (err) {
          // Add Sepolia network configuration
          const sepoliaNetwork = {
            chainId: "0xaa36a7",
            chainName: "Sepolia Testnet",
            nativeCurrency: {
              name: "SepoliaETH",
              symbol: "SEP",
              decimals: 18,
            },
            rpcUrls: ["https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          };

          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [sepoliaNetwork],
          });

          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (addressArray.length > 0) {
            // Redirect to products page
            window.location.href = "/products";
            return {
              address: addressArray[0],
            };
          }
        }
      } else {
        console.log(
          `🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)`
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center pt-16">
        <h1 className="text-6xl font-bold">
          <span className="block">CROWD</span>
          <span className="block">WAVE</span>
        </h1>
        <div className="mt-6">
          <button
            className="bg-gray-800 text-white px-6 py-3 rounded-full flex items-center"
            onClick={connectWallet}
          >
            {account
              ? `Connected: ${account.substring(0, 6)}...${account.substring(
                  account.length - 4
                )}`
              : "Connect Wallet"}
            <img src={arrowBlack} alt="arrow" className="ml-2" />
          </button>
        </div>
        <p className="mt-4 text-lg">
          Revolutionizing crowdfunding with blockchain technology!
        </p>
        <img src={userImg} alt="user" className="mt-8 w-48" />
      </div>
    </div>
  );
};

export default LandingPage;
