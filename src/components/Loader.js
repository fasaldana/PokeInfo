import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <img
        src="/images/pokeball-animation.gif"
        alt="Loading..."
        className="w-20 h-20"
      />
    </div>
  );
};

export default Loader;
