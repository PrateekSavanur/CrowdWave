import { useState } from "react";

const Modal = ({ isOpen, onClose, startup, contributeFunds }) => {
  const [fundAmount, setFundAmount] = useState("");

  const handleFundSubmit = async (e) => {
    e.preventDefault();
    await contributeFunds(startup.id, fundAmount);
    setFundAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-amber-300 bg-opacity-10 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">{startup.companyName}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Funding Goal:</strong> {startup.fundingGoal}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Amount Raised:</strong> {startup.funded}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {startup.description}.
          <span className="text-amber-500">
            You will recieve ${startup.tokenTicker}
          </span>
          in ICO phase
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Closed: </strong>
          {startup.closed === "false" ? "NO" : "YES"}
        </p>
        <form onSubmit={handleFundSubmit}>
          <div className="mb-4">
            <label htmlFor="fundAmount" className="block text-gray-700 mb-2">
              Enter amount to fund:
            </label>
            <input
              id="fundAmount"
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
