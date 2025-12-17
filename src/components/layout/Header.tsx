import React from "react";

const Header = () => {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <div className="font-bold text-xl">Portfolio</div>
      <nav>
        <ul className="flex gap-4">
          <li>Home</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
