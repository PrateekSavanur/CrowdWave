import { useState, useEffect } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { BiCube } from "react-icons/bi";
import Hero from "./Hero";
// import { AiOutlineRobot } from "react-icons/ai";
// import { RiPlantLine } from "react-icons/ri";
// import { FaHospitalAlt } from "react-icons/fa";
// import { GiTeacher } from "react-icons/gi";
import Modal from "./Modal";

const Products = () => {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startups = [
    {
      id: 1,
      name: "Blockchain Innovators",
      category: "Technology",
      description:
        "Revolutionizing the tech industry with blockchain solutions.",
      fundingGoal: "$1,000,000",
      amountRaised: "$350,000",
      image: "images/blockchain-innovators.png",
      businessModel:
        "Our subscription-based model ensures continuous support and upgrades to our blockchain solutions, allowing businesses to stay ahead of the curve and maintain competitive advantage. We offer a tiered pricing structure to cater to startups, SMEs, and large enterprises.",
      founders: "John Doe, Jane Smith",
      targetAudience:
        "Tech companies, startups, SMEs, and large enterprises looking for blockchain integration.",
      problemStatement:
        "Many businesses struggle to integrate blockchain technology due to its complexity and high cost.",
      solution:
        "Providing affordable and scalable blockchain solutions that can be easily integrated into existing systems.",
      roadmapAndMilestones:
        "Q1 2023: Product launch; Q3 2023: Beta testing; Q1 2024: Full-scale deployment.",
      fundingGoalsAndAllocation:
        "Development: 50%, Marketing: 30%, Operations: 20%",
      partnershipsAndCollaborations:
        "Partnership with TechCorp for integration support.",
      securityAndCompliance:
        "Compliance with ISO/IEC 27001 standards and regular security audits.",
      communityEngagement:
        "Active on social media, regular webinars, and feedback sessions with users.",
      marketPotential:
        "Estimated market size of $10 billion with a growth rate of 15% annually.",
      userTestimonialsAndCaseStudies: [
        {
          text: "Blockchain Innovators helped streamline our supply chain operations and reduced costs by 25%. Their support team is responsive and knowledgeable.",
          author: "Emily Johnson, CEO of TechSolutions Inc.",
          description:
            "Emily Johnson is the CEO of a tech startup specializing in supply chain optimization solutions.",
        },
        {
          text: "We integrated Blockchain Innovators' solution into our payment processing system, improving transaction speed and security. Highly recommended!",
          author: "Michael Brown, CFO of Global Payments Ltd.",
          description:
            "Michael Brown oversees financial operations at a global payment processing company.",
        },
      ],
      technicalSpecifications:
        "Utilizes Ethereum blockchain, smart contracts, and a scalable architecture.",
      teamBackground:
        "Founders have 20+ years of combined experience in blockchain and tech industries.",
    },
  ];

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
