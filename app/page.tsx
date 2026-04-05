"use client";

import { useState } from "react";
import { products, categories } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pearl & Poise</h1>
        <p className="text-sm text-gray-400 italic">Elegant fashion for the modern woman</p>
      </nav>

      {/* Hero */}
      <section className="bg-rose-50 px-6 py-20 text-center">
        <p className="text-rose-400 text-sm tracking-widest uppercase mb-3">New Collection</p>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Dress to Impress</h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Discover our curated collection of elegant pieces designed for the modern woman.
        </p>
        <a href="#products" className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
          Shop Now
        </a>
      </section>

      {/* Categories */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white text-gray-900 text-xs px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm">₦{product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8 text-center text-gray-400 text-sm mt-10">
        © 2024 Pearl & Poise. All rights reserved.
      </footer>
    </main>
  );
}