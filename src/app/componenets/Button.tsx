import React from "react";
import Link from 'next/link';

interface ButtonProps {
  href: string;
  text: string;
}
const Button: React.FC<ButtonProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <button className="px-4 py-2 text-white rounded hover:bg-black transition duration-200">{text}</button>
    </Link>
  );
};

export default Button;
