"use client";
import React from 'react';
import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Curiosity from './components/Curiosity';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-24 py-8 space-y-8">
        <Search />

        <Curiosity />
      </main>
      <Footer />
    </div>
  );
}
