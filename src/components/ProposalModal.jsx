const Modal = ({ isOpen, onClose, startup, handleAction }) => {
  const handleActionSubmit = async (e, action) => {
    e.preventDefault();
    await handleAction(startup.id, action);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">{startup.companyName}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Funding Goal:</strong> {startup.fundingGoal} ETH
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Amount Raised:</strong> {startup.amountRaised} ETH
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {startup.description}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Owner:</strong> {startup.owner}
        </p>

        {/* Withdraw Funds Form */}
        <div className="flex justify-center">
          {/* Start ICO Form */}
          <button
            onClick={(e) => handleActionSubmit(e, "startICO")}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg mb-2 mr-2"
            disabled={startup.amountRaised < startup.fundingGoal}
          >
            Start ICO
          </button>

          {/* Distribute Tokens Form */}
          <button
            onClick={(e) => handleActionSubmit(e, "distributeTokens")}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg mb-2 mr-2"
            disabled={startup.amountRaised < startup.fundingGoal}
          >
            Distribute Tokens
          </button>

          <button
            onClick={(e) => handleActionSubmit(e, "withdrawFunds")}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg mb-2 mr-2"
            disabled={startup.amountRaised < startup.fundingGoal}
          >
            Withdraw Funds
          </button>

          {/* Withdraw Left Tokens Form */}
          <button
            onClick={(e) => handleActionSubmit(e, "withdrawLeftTokens")}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg mb-2"
            disabled={startup.amountRaised < startup.fundingGoal}
          >
            Withdraw Left Tokens
          </button>
        </div>

        {startup.amountRaised < startup.fundingGoal && (
          <div className="text-red-600 text-center mt-2">
            <p>Cannot perform ICO actions until funding goal is met.</p>
          </div>
        )}

        <div className="text-red-600 text-center mt-2">
          <p>
            Notice: Donot call the function if you are not the owner. You might
            waste your gas fee
          </p>
        </div>

        {/* Close Modal */}
        <button
          onClick={onClose}
          className="block w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
