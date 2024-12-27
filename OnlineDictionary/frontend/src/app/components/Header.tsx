"use client";
import React from "react";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-t from-blue-600 via-blue-400 to-blue-200 text-white py-4 px-8">
      <div className=" flex justify-between items-center">
        
        <div className="flex items-center space-x-4">
          <img src="/DicioLuna.webp" alt="DicioLuna Logo" className="h-12 w-12"/>
          <div>
            <h1 className="text-2xl font-bold">DicioLuna</h1>
            <p className="text-sm">Dicionário online</p>
          </div>
        </div>
      {/**  <div className="text-right">
          <p>Projeto de estagio</p>
          <p>Nominated 2024</p>
        </div>**/}
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
