"use client";
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-8 text-white">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/about">Sobre</Link>
        </li>
        <li>
          <Link href="/contact">Contato</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
