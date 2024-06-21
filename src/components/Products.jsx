import { useState, useEffect } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { BiCube } from "react-icons/bi";
import Hero from "./Hero";
import Modal from "./Modal";
import { getAllProjects } from "../../utils/crowdfunding";

const Products = () => {
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllProjects();
      const formattedProjects = projects.map((project, index) => ({
        id: index + 1,
        name: `Project ${index + 1}`,
        fundingGoal: `${project.fundingGoal.toString()} ETH`,
        amountRaised: `${project.funded.toString()} ETH`,
      }));
      setStartups(formattedProjects);
    };

    fetchProjects();
  }, []);

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

  return (
    <>
      <Hero />
      <div className="w-4/5 m-auto space-y-10 mb-20">
        <div className="flex justify-between items-center p-2">
          <ul className="flex items-center space-x-6 text-gray-800 text-lg font-medium">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-500">
              <BiCube size={24} />
              <span>All Startups</span>
            </li>
          </ul>
          <div className="flex items-center space-x-5">
            <button>
              <BsArrowLeft size={"1.5rem"} />
            </button>
            <button className="bg-blue-400 rounded-full p-2 text-white drop-shadow-xl">
              <BsArrowRight size={"1.5rem"} />
            </button>
          </div>
        </div>
        <div className="products grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {startups.map((startup) => (
            <div
              key={startup.id}
              className="product rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => handleCardClick(startup)}
            >
              <img
                className="w-full h-60 object-cover"
                src={startup.image}
                alt={startup.name}
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  {startup.name}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {startup.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Goal: {startup.fundingGoal}
                    </p>
                    <p className="text-sm text-gray-600">
                      Raised: {startup.amountRaised}
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
          />
        )}
      </div>
    </>
  );
};

export default Products;
