import { useState, useEffect } from "react";
import Modal from "./ProposalModal";
import { ethers } from "ethers";
import CrowdfundingAbi from "../abi/Crowdfunding.json";
import { getAllProjects } from "../../utils/crowdfunding";
import SearchBar from "./SearchBar";

const Proposals = () => {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllProjects();
      const formattedProjects = projects.map((project, index) => ({
        id: index + 1,
        name: `Project ${index + 1}`,
        companyName: project.companyName,
        description: project.description,
        fundingGoal: ethers.utils.formatEther(project.fundingGoal).toString(),
        amountRaised: ethers.utils.formatEther(project.funded).toString(),
      }));

      setStartups(formattedProjects);
      setFilteredStartups(formattedProjects);
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
      "0x38420dF5F67DEbE6d6f62176582FB36cF49a0B65",
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
              className="product rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => handleCardClick(startup)}
            >
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  {startup.companyName}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {startup.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Goal: {startup.fundingGoal} ETH
                    </p>
                    <p className="text-sm text-gray-600">
                      Raised: {startup.amountRaised} ETH
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
