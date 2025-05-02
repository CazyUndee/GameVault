"use client";

import React, { useState } from "react";
export default function VaultSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setTimeout(() => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
      }, 0);
    }
  };
  

  return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Vault Search</h1>
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the web..."
              className="w-full p-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700"
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </form>
      </div>
  );
  