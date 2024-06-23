import { useState, useEffect } from "react";
import { BiCube } from "react-icons/bi";
import { FaBullseye, FaPiggyBank } from "react-icons/fa";
import Hero from "./Hero";
import Modal from "./Modal";
import { getAllProjects } from "../../utils/crowdfunding";
import { ethers } from "ethers";
import CrowdfundingAbi from "../abi/Crowdfunding.json";

const Products = ({ searchFocus, setSearchFocus, searchRef }) => {
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
                closed: details.closed.toString(),
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
      startup.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStartups(filtered);
  }, [searchQuery, startups]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  const handleCardClick = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStartup(null);
  };

  const contributeFunds = async (projectId, amount) => {
    if (!window.ethereum) {
      alert("MetaMask is required to contribute funds");
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
      const tx = await contract.contributeFunds(projectId, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert("Contribution successful!");
    } catch (error) {
      console.error(
        `Error contributing funds to project ID ${projectId}:`,
        error
      );
      alert(`Error contributing funds: ${error.message}`);
    }
  };

  return (
    <>
      <Hero
        searchFocus={searchFocus}
        setSearchFocus={setSearchFocus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchRef={searchRef}
      />
      <div className="w-4/5 m-auto space-y-10 mb-20">
        <div className="flex justify-between items-center p-2">
          <ul className="flex items-center space-x-6 text-gray-800 text-lg font-medium">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-amber-500">
              <BiCube size={24} />
              <span>All Startups</span>
            </li>
          </ul>
        </div>
        <div className="products grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              className="product rounded-lg overflow-hidden shadow-lg cursor-pointer bg-gradient-to-r from-sky-300 via-indigo-300 to-purple-300 transform transition-transform duration-300 hover:scale-105"
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
            contributeFunds={contributeFunds}
          />
        )}
      </div>
    </>
  );
};

export default Products;
