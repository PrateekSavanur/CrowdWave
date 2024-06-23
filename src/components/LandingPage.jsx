import { useEffect, useState } from "react";
import arrowBlack from "../images/arrow-black.png";
import userImg from "../images/user.png";
import Typewriter from "typewriter-effect";

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
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        const sepoliaChainId = "0xaa36a7"; // Sepolia testnet chain ID

        if (chain === sepoliaChainId) {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (addressArray.length > 0) {
            window.location.href = "/products";
            return { address: addressArray[0] };
          } else {
            console.log("😥 Connect your wallet account to the site.");
          }
        } else {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: sepoliaChainId }],
          });
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (addressArray.length > 0) {
            window.location.href = "/products";
            return { address: addressArray[0] };
          }
        }
      } else {
        console.log(
          "🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)"
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center pt-16 bg-gradient-to-b from-blue-100 via-pink-100 to-purple-100">
        <h1 className="text-6xl font-bold">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Crowdwave")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Secure and Transparent Funding")
                .deleteAll()
                .start();
            }}
            options={{
              loop: true,
            }}
          />
        </h1>
        <p className="mt-4 text-lg">
          Revolutionizing crowdfunding with blockchain technology!
        </p>
        <button
          className="bg-white text-black px-6 py-3 rounded-full flex items-center mt-6"
          onClick={connectWallet}
        >
          {account
            ? `Connected: ${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`
            : "Learn More!"}
          <img src={arrowBlack} alt="arrow" className="ml-2" />
        </button>
        <img src={userImg} alt="user" className="mt-8 w-48" />
      </div>
    </div>
  );
};

export default LandingPage;
