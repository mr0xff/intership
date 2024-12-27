"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-t from-blue-500 via-blue-300 to-blue-200 rounded-lg py-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center bg-white rounded-lg shadow-lg px-4 py-2">

          
          <input
            type="text"
            placeholder="Buscar no Dicionário"
            className="flex-1 outline-none text-gray-700 px-2"
          />
          <button className="text-blue-500">
            <FaSearch size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
