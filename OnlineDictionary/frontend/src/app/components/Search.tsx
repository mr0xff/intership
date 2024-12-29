"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search: React.FC = () => {
  const [palavra, setPalavra] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const buscarPalavra = async () => {
    if (!palavra.trim()) {
      setErro("Por favor, digite uma palavra!");
      return;
    }
    setCarregando(true);
    setErro(""); 
    setResultado(null); 

    try {
      const response = await fetch(`http://localhost:5000/search/${palavra}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar a palavra");
      }
      const data = await response.json();
      setResultado(data);//setResultado(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setErro("Não foi possível buscar a palavra. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section className="bg-gradient-to-t from-blue-500 via-blue-300 to-blue-200 rounded-lg py-12">
      <div className="max-w-3xl mx-auto text-center">

        <div className="flex items-center bg-white rounded-lg shadow-lg px-4 py-2">
          <input
            type="text"
            value={palavra}
            onChange={(e) => setPalavra(e.target.value)}
            placeholder="Buscar no Dicionário"
            className="flex-1 outline-none text-gray-700 px-2"
          />
          <button
            onClick={buscarPalavra}
            className="text-blue-500"
            disabled={carregando}
          >
            <FaSearch size={24} />
          </button>
        </div>

        {erro && <p className="text-red-500 mt-4">{erro}</p>}

        {carregando && <p className="text-blue-700 mt-4">Carregando...</p>}

        {resultado && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 text-left">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{resultado.palavra}</h2>
            {resultado.definicoes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Definições:</h3>
                <ul className="list-disc list-inside">
                  {resultado.definicoes.map((def: string, index: number) => (
                    <li key={index}>{def}</li>
                  ))}
                </ul>
              </div>
            )}
            {resultado.sinonimos.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Sinônimos:</h3>
                <ul className="list-disc list-inside">
                  {resultado.sinonimos.map((sin: string, index: number) => (
                    <li key={index}>{sin}</li>
                  ))}
                </ul>
              </div>
            )}
            {resultado.exemplos.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Exemplos:</h3>
                <ul className="list-disc list-inside">
                  {resultado.exemplos.map((ex: string, index: number) => (
                    <li key={index}>{ex}</li>
                  ))}
                </ul>
              </div>
            )}
            {resultado.expressoes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Expressões:</h3>
                <ul className="list-disc list-inside">
                  {resultado.expressoes.map((exp: string, index: number) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
