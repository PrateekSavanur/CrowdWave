import { useState, useEffect } from "react";
import Modal from "./ProposalModal";
import { ethers } from "ethers";
import CrowdfundingAbi from "../abi/Crowdfunding.json";
import { getAllProjects } from "../../utils/crowdfunding";
import SearchBar from "./SearchBar";
import { FaBullseye, FaPiggyBank } from "react-icons/fa";

const Proposals = () => {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      if (!window.ethereum) {
        alert("MetaMask is required to fetch project details");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        "0x9a738c3D025E503cF14a598E5Ad45F92bF46877a",
        CrowdfundingAbi,
        provider
      );

      try {
        const projects = await getAllProjects();
        console.log("Fetched Projects:", projects); // Add logging
        const formattedProjects = await Promise.all(
          projects.map(async (project, index) => {
            if (project) {
              const details = await contract.getProjectDetails(index + 1);
              return {
                id: index + 1,
                name: `Project ${index + 1}`,
                companyName: details.companyName,
                description: details.description,
                tokenName: details.tokenName,
                tokenTicker: details.tokenTicker,
                tokenContractAddress: details.tokenContractAddress,
                funded: ethers.utils.formatEther(details.funded),
                fundingGoal: ethers.utils.formatEther(details.fundingGoal),
                closed: details.closed,
                deadline: new Date(details.deadline * 1000).toLocaleString(),
                tokensPerEth: details.tokensPerEth.toString(),
                owner: details.owner,
                icoCompleted: details.icoCompleted,
              };
            } else {
              return null;
            }
          })
        );

        const validProjects = formattedProjects.filter((p) => p !== null);
        setStartups(validProjects);
        setFilteredStartups(validProjects);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = startups.filter((startup) =>
      startup.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStartups(filtered);
  }, [searchQuery, startups]);

  const handleCardClick = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStartup(null);
  };

  const handleAction = async (projectId, action) => {
    if (!window.ethereum) {
      alert("MetaMask is required to perform this action");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x9a738c3D025E503cF14a598E5Ad45F92bF46877a",
      CrowdfundingAbi,
      signer
    );

    try {
      switch (action) {
        case "withdrawFunds":
          await contract.withdrawFunds(projectId);
          break;
        case "startICO":
          await contract.startICO(projectId);
          break;
        case "distributeTokens":
          await contract.distributeTokens(projectId);
          break;
        case "withdrawLeftTokens":
          await contract.withdrawLeftTokens(projectId);
          break;
        default:
          throw new Error("Unknown action");
      }
      alert(`${action} successful for project ${projectId}`);
      handleCloseModal();
    } catch (error) {
      console.error(`Error ${action}:`, error);
      alert(`Error ${action}: ${error.message || error.toString()}`);
    }
  };

  return (
    <>
      <div className="w-4/5 m-auto space-y-10 mb-20">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="products grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              className="product rounded-lg overflow-hidden shadow-lg cursor-pointer bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-300 transform transition-transform duration-300 hover:scale-105"
              onClick={() => handleCardClick(startup)}
            >
              <div className="p-6 ">
                <p className="text-xl font-bold text-black mb-2">
                  {startup.companyName}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaBullseye className="text-black" />
                    <p className="text-sm text-black">
                      Goal: {startup.fundingGoal}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPiggyBank className="text-black" />
                    <p className="text-sm text-black">
                      Raised: {startup.funded}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedStartup && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            startup={selectedStartup}
            handleAction={handleAction}
          />
        )}
      </div>
    </>
  );
};

export default Proposals;
