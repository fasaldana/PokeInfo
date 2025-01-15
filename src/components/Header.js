import React from "react";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="bg-[#198ADA] p-4 shadow-md w-full absolute top-0">
      <div className="container mx-auto grid grid-cols-3 items-center">
        <div></div>
        <div className="flex justify-center">
          <img src="/images/image3.png" alt="Pokeball" className="md:w-1/3" />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-white cursor-pointer transition-colors text-red-500 px-4 py-2 rounded-lg shadow-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
