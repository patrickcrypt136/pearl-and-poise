"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/rib/db";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  whatsapp: string;
};

const emptyForm = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
  whatsapp: "2348080257120",
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  async function checkAuth() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/admin");
    }
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data || []);
  }

  async function handleAdd() {
    if (!form.name || !form.price || !form.category || !form.image) {
      setMessage("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("products").insert([
      {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        image: form.image,
        whatsapp: form.whatsapp,
      },
    ]);
    if (error) {
      setMessage("Error adding product.");
    } else {
      setMessage("Product added!");
      setForm(emptyForm);
      fetchProducts();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage Pearl & Poise products</p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-gray-700 hover:border-gray-500 text-gray-300 px-5 py-2 rounded-lg text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Add Product Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-semibold mb-6">Add New Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
            <input
              type="number"
              placeholder="Price (₦)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
            <input
              type="text"
              placeholder="Category (e.g. Dresses)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none sm:col-span-2"
            />
          </div>
          {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
          <button
            onClick={handleAdd}
            disabled={loading}
            className="mt-6 bg-white hover:bg-gray-100 disabled:opacity-50 text-gray-900 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>

        {/* Products List */}
        <h2 className="text-lg font-semibold mb-6">All Products ({products.length})</h2>
        <div className="space-y-4">
          {products.length === 0 && (
            <p className="text-gray-500 text-sm">No products yet. Add your first one above!</p>
          )}
          {products.map((product) => (
            <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-sm text-gray-400">₦{product.price.toLocaleString()} · {product.category}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}