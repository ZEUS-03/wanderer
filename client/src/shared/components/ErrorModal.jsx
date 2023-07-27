import React from "react";

const ErrorModal = (props) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-[30%]">
        <h2 className="text-xl font-bold mb-2">Error</h2>

        <p className="text-red-600">{props.message}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
