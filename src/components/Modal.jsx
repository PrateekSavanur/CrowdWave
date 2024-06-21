/* eslint-disable react/prop-types */
import { FaLinkedin } from "react-icons/fa";

const Modal = ({ isOpen, onClose, startup }) => {
  if (!isOpen) return null;

  const handleLearnMore = (url) => {
    window.open(url, "_blank");
  };

  const openFounderLinkedIn = (linkedinUrl) => {
    window.open(linkedinUrl, "_blank");
  };

  const renderFounders = () => {
    if (!startup.founders) return null;

    const founders = startup.founders
      .split(",")
      .map((founder) => founder.trim());

    return (
      <div className="flex items-center space-x-4">
        <span className="text-gray-500 text-sm">Founders:</span>
        {founders.map((founder, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p>{founder}</p>
            <button
              onClick={() =>
                openFounderLinkedIn(`https://www.linkedin.com/in/${founder}`)
              }
            >
              <FaLinkedin
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                size={20}
              />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderUserTestimonials = () => {
    if (
      !startup.userTestimonialsAndCaseStudies ||
      startup.userTestimonialsAndCaseStudies.length === 0
    )
      return null;

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">User Testimonials</h3>
        {startup.userTestimonialsAndCaseStudies.map((testimonial, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-800">{testimonial.text}</p>
            <p className="text-sm text-gray-600 mt-1">- {testimonial.author}</p>
            <p className="text-xs text-gray-600 italic">
              {testimonial.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-screen-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-3xl"
        >
          &times;
        </button>
        <div className="flex items-center justify-center mb-6">
          <img
            src={startup.image}
            alt={startup.name}
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-3xl font-bold ml-4 text-blue-700">
            {startup.name}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="text-gray-800">
            <StartupInfoCard title="Category" value={startup.category} />
            <StartupInfoCard title="Description" value={startup.description} />
            <StartupInfoCard
              title="Target Audience"
              value={startup.targetAudience}
            />
            <StartupInfoCard
              title="Problem Statement"
              value={startup.problemStatement}
            />
            <StartupInfoCard
              title="Roadmap & Milestones"
              value={startup.roadmapAndMilestones}
              isBulletList
            />
            <StartupInfoCard
              title="Funding Goals & Allocation"
              value={startup.fundingGoalsAndAllocation}
              isBulletList
            />
          </div>
          <div className="text-gray-800">
            <StartupInfoCard title="Founders" value={renderFounders()} />
            <StartupInfoCard title="Funding Goal" value={startup.fundingGoal} />
            <StartupInfoCard
              title="Amount Raised"
              value={startup.amountRaised}
            />
            <StartupInfoCard title="Solution" value={startup.solution} />
            <StartupInfoCard
              title="Partnerships & Collaborations"
              value={startup.partnershipsAndCollaborations}
            />
            <StartupInfoCard
              title="Security & Compliance"
              value={startup.securityAndCompliance}
            />
          </div>
        </div>
        {/* Render user testimonials */}
        {renderUserTestimonials()}
        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
            Support
          </button>
          <button
            onClick={() => handleLearnMore(startup.website)}
            className="bg-green-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-800 focus:outline-none flex items-center"
          >
            Learn More <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const StartupInfoCard = ({ title, value, isBulletList }) => {
  if (isBulletList) {
    const items = value
      .split(";")
      .map((item, index) => <li key={index}>{item.trim()}</li>);
    return (
      <div className="mb-4">
        <p className="font-semibold">{title}</p>
        <ul className="list-disc list-inside text-sm">{items}</ul>
      </div>
    );
  } else {
    return (
      <div className="mb-4">
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{value}</p>
      </div>
    );
  }
};

export default Modal;
