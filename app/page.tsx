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
      <nav className="px-8 py-5 flex justify-between items-center sticky top-0 z-10"
        style={{ background: "#fdf8f5", borderBottom: "1px solid #f0e0d6" }}>
        <div>
          <h1 className="text-2xl font-bold italic" style={{ color: "#c4846a", letterSpacing: "0.05em" }}>
            Pearl & Poise
          </h1>
          <p className="text-xs tracking-widest uppercase" style={{ color: "#c4a882", letterSpacing: "0.2em" }}>
            Elegant Fashion
          </p>
        </div>
        <div className="flex gap-8 text-sm" style={{ color: "#9e7060" }}>
          <a href="#products" className="hover:text-rose-400 transition-colors">Shop</a>
          <a href="#about" className="hover:text-rose-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-rose-400 transition-colors">Contact</a>
        </div>
        <a href="#products"
          className="px-6 py-2 text-sm font-medium text-white transition-all rounded-full"
          style={{ background: "#c4846a" }}>
          Shop Now
        </a>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
            New Collection 2024
          </p>
          <h2 className="text-6xl font-bold italic leading-tight mb-6" style={{ color: "#2c1810" }}>
            Dress with <br />
            <span style={{ color: "#c4846a" }}>Grace &</span> <br />
            Confidence.
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "#9e7060" }}>
            Discover our curated collection of feminine pieces designed to make you feel beautiful every day.
          </p>
          <div className="flex gap-4">
            <a href="#products"
              className="px-8 py-3 text-sm font-medium text-white rounded-full transition-all"
              style={{ background: "#c4846a" }}>
              Explore Collection
            </a>
            <a href="#about"
              className="px-8 py-3 text-sm font-medium rounded-full transition-all"
              style={{ background: "transparent", color: "#c4846a", border: "1px solid #c4846a" }}>
              Our Story
            </a>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full"
            style={{ background: "#f9e8e0", transform: "scale(0.9)", zIndex: 0 }} />
          <div className="relative z-10 p-6">
            {products[0] ? (
              <img
                src={products[0].image}
                alt={products[0].name}
                className="w-full max-w-sm object-cover rounded-3xl shadow-lg"
                style={{ aspectRatio: "3/4" }}
              />
            ) : (
              <div className="w-full max-w-sm rounded-3xl flex items-center justify-center"
                style={{ aspectRatio: "3/4", background: "#f0d8cc" }}>
                <p className="text-sm" style={{ color: "#c4a882" }}>Your products appear here</p>
              </div>
            )}
          </div>
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-16 h-16 rounded-full opacity-40"
            style={{ background: "#e8c4b4" }} />
          <div className="absolute bottom-12 left-4 w-10 h-10 rounded-full opacity-30"
            style={{ background: "#d4a090" }} />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-6 py-2 text-sm font-medium rounded-full transition-all"
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
      <section id="products" className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
            Our Collection
          </p>
          <h3 className="text-4xl font-bold italic" style={{ color: "#2c1810" }}>New Arrivals</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 && (
            <p className="text-center col-span-3" style={{ color: "#c4a882" }}>No products yet.</p>
          )}
          {filtered.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 rounded-3xl"
                  style={{ aspectRatio: "3/4", background: "#f9e8e0" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full"
                    style={{ background: "#fff", color: "#c4846a" }}>
                    {product.category}
                  </div>
                </div>
                <h3 className="font-semibold mb-1" style={{ color: "#2c1810" }}>{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="font-bold" style={{ color: "#c4846a" }}>₦{product.price.toLocaleString()}</p>
                  <span className="text-sm" style={{ color: "#c4a882" }}>View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 py-24 mt-10 text-center"
        style={{ background: "#f9e8e0" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
            Our Story
          </p>
          <h3 className="text-4xl font-bold italic mb-6" style={{ color: "#2c1810" }}>About Pearl & Poise</h3>
          <p className="text-lg leading-relaxed" style={{ color: "#9e7060" }}>
            Pearl & Poise was born from a deep love for feminine elegance and timeless style. 
            Every piece is carefully selected to celebrate the beauty and grace of the modern woman.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 py-24 text-center" style={{ background: "#fdf8f5" }}>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
          Get in Touch
        </p>
        <h3 className="text-4xl font-bold italic mb-4" style={{ color: "#2c1810" }}>Let's Talk</h3>
        <p className="mb-8" style={{ color: "#9e7060" }}>Have a question? We'd love to hear from you.</p>
        
        <a
          href="https://wa.me/2348080257120"
          target="_blank"
          className="inline-block px-10 py-4 text-sm font-medium text-white rounded-full transition-all"
          style={{ background: "#25D366" }}>
          Chat on WhatsApp
        </a>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-xs tracking-widest uppercase"
        style={{ background: "#2c1810", color: "#9e7060", letterSpacing: "0.15em" }}>
        © 2024 Pearl & Poise. All Rights Reserved.
      </footer>
    </main>
  );
}