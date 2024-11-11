import React from "react";
import Button from "./Button";

const NavBar: React.FC = () => {
  const buttons = [
    { href: "/pages/createUser", text: "Sign up" },
    {href: "/pages/loginUser",text:"Sign in"},
    {href: "/pages/carsFrontCrud",text:"cars"},
    {href: "/pages/booksFrontCrud",text:"books"},
    {href: "/pages/citiesFrotCrud",text:"cities"},


  ];

  return (
    <nav className="nav bg-slate-500 w-full mx-auto p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">My Website</div>
      <div className=" flex space-x-2">
        {buttons.map((button, index) => (
          <Button key={index} href={button.href} text={button.text} />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
