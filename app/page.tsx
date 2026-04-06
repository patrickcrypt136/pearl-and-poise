"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/rib/db";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  whatsapp: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setProducts(data);
      const unique = ["All", ...Array.from(new Set(data.map((p: Product) => p.category)))];
      setCategories(unique);
    }
  }

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen" style={{ background: "#fdf8f5", color: "#2c1810" }}>
      {/* Nav */}
      <nav className="px-5 py-4 sticky top-0 z-10"
        style={{ background: "#fdf8f5", borderBottom: "1px solid #f0e0d6" }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold italic" style={{ color: "#c4846a" }}>
              Pearl & Poise
            </h1>
            <p className="text-xs tracking-widest uppercase hidden sm:block" style={{ color: "#c4a882" }}>
              Elegant Fashion
            </p>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-sm" style={{ color: "#9e7060" }}>
            <a href="#products" className="hover:text-rose-400 transition-colors">Shop</a>
            <a href="#about" className="hover:text-rose-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-rose-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="#products"
              className="hidden md:block px-5 py-2 text-xs tracking-widest uppercase font-medium text-white rounded-full transition-all"
              style={{ background: "#c4846a" }}>
              Shop Now
            </a>
            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}>
              <span className="w-5 h-0.5 bg-gray-600 block" />
              <span className="w-5 h-0.5 bg-gray-600 block" />
              <span className="w-5 h-0.5 bg-gray-600 block" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-4 text-sm" style={{ color: "#9e7060" }}>
            <a href="#products" onClick={() => setMenuOpen(false)} className="hover:text-rose-400 transition-colors">Shop</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-rose-400 transition-colors">About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-rose-400 transition-colors">Contact</a>
            <a href="#products" onClick={() => setMenuOpen(false)}
              className="px-5 py-2 text-xs tracking-widest uppercase font-medium text-white rounded-full text-center transition-all"
              style={{ background: "#c4846a" }}>
              Shop Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="px-5 py-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
            New Collection 2024
          </p>
          <h2 className="text-4xl md:text-6xl font-bold italic leading-tight mb-6" style={{ color: "#2c1810" }}>
            Dress with <br />
            <span style={{ color: "#c4846a" }}>Grace &</span> <br />
            Confidence.
          </h2>
          <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: "#9e7060" }}>
            Discover our curated collection of feminine pieces designed to make you feel beautiful every day.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#products"
              className="px-6 py-3 text-sm font-medium text-white rounded-full transition-all"
              style={{ background: "#c4846a" }}>
              Explore Collection
            </a>
            <a href="#about"
              className="px-6 py-3 text-sm font-medium rounded-full transition-all"
              style={{ background: "transparent", color: "#c4846a", border: "1px solid #c4846a" }}>
              Our Story
            </a>
          </div>
        </div>
        <div className="relative flex justify-center mt-8 md:mt-0">
          <div className="absolute inset-0 rounded-full"
            style={{ background: "#f9e8e0", transform: "scale(0.9)", zIndex: 0 }} />
          <div className="relative z-10 p-4 md:p-6 w-full max-w-xs mx-auto">
            {products[0] ? (
              <img
                src={products[0].image}
                alt={products[0].name}
                className="w-full object-cover rounded-3xl shadow-lg"
                style={{ aspectRatio: "3/4" }}
              />
            ) : (
              <div className="w-full rounded-3xl flex items-center justify-center"
                style={{ aspectRatio: "3/4", background: "#f0d8cc" }}>
                <p className="text-sm text-center px-4" style={{ color: "#c4a882" }}>Your products appear here</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 text-xs font-medium rounded-full transition-all"
              style={{
                background: activeCategory === cat ? "#c4846a" : "#f0e0d6",
                color: activeCategory === cat ? "#fff" : "#9e7060",
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-5 py-10">
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
            Our Collection
          </p>
          <h3 className="text-3xl md:text-4xl font-bold italic" style={{ color: "#2c1810" }}>New Arrivals</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {filtered.length === 0 && (
            <p className="text-center col-span-2 md:col-span-3" style={{ color: "#c4a882" }}>No products yet.</p>
          )}
          {filtered.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden mb-3 rounded-2xl"
                  style={{ aspectRatio: "3/4", background: "#f9e8e0" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full"
                    style={{ background: "#fff", color: "#c4846a" }}>
                    {product.category}
                  </div>
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-1 truncate" style={{ color: "#2c1810" }}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm md:text-base" style={{ color: "#c4846a" }}>
                    ₦{product.price.toLocaleString()}
                  </p>
                  <span className="text-xs hidden sm:block" style={{ color: "#c4a882" }}>View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-5 py-16 md:py-24 mt-10 text-center"
        style={{ background: "#f9e8e0" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
            Our Story
          </p>
          <h3 className="text-3xl md:text-4xl font-bold italic mb-6" style={{ color: "#2c1810" }}>
            About Pearl & Poise
          </h3>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#9e7060" }}>
            Pearl & Poise was born from a deep love for feminine elegance and timeless style.
            Every piece is carefully selected to celebrate the beauty and grace of the modern woman.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-5 py-16 md:py-24 text-center"
        style={{ background: "#fdf8f5" }}>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
          Get in Touch
        </p>
        <h3 className="text-3xl md:text-4xl font-bold italic mb-4" style={{ color: "#2c1810" }}>
          Let's Talk
        </h3>
        <p className="mb-8" style={{ color: "#9e7060" }}>Have a question? We'd love to hear from you.</p>
        <a
          href="https://wa.me/2348080257120"
          target="_blank"
          className="inline-block px-8 py-4 text-sm font-medium text-white rounded-full transition-all"
          style={{ background: "#25D366" }}>
          Chat on WhatsApp
        </a>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 text-center text-xs tracking-widest uppercase"
        style={{ background: "#2c1810", color: "#9e7060", letterSpacing: "0.15em" }}>
        © 2024 Pearl & Poise. All Rights Reserved.
      </footer>
    </main>
  );
}