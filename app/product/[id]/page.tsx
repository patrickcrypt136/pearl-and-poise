import { supabase } from "@/rib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return notFound();

  const whatsappMessage = `Hi! I'm interested in buying the *${product.name}* for ₦${product.price.toLocaleString()}. Is it available?`;
  const whatsappUrl = `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen" style={{ background: "#fdf8f5" }}>
      {/* Nav */}
      <nav className="px-8 py-5 flex justify-between items-center sticky top-0 z-10"
        style={{ background: "#fdf8f5", borderBottom: "1px solid #f0e0d6" }}>
        <h1 className="text-2xl font-bold italic" style={{ color: "#c4846a" }}>
          Pearl & Poise
        </h1>
        <Link href="/" className="text-sm transition-colors" style={{ color: "#9e7060" }}>
          ← Back to shop
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-sm"
          style={{ aspectRatio: "3/4", background: "#f9e8e0" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <span className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "#c4a882", letterSpacing: "0.3em" }}>
            {product.category}
          </span>
          <h1 className="text-4xl font-bold italic mb-4" style={{ color: "#2c1810" }}>
            {product.name}
          </h1>
          <p className="text-3xl font-bold mb-6" style={{ color: "#c4846a" }}>
            ₦{product.price.toLocaleString()}
          </p>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "#9e7060" }}>
            {product.description}
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              className="px-8 py-4 text-sm font-medium text-white text-center rounded-full transition-all"
              style={{ background: "#25D366" }}>
              Order via WhatsApp
            </a>
            <Link
              href="/"
              className="px-8 py-4 text-sm font-medium text-center rounded-full transition-all"
              style={{ border: "1px solid #c4846a", color: "#c4846a" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-xs tracking-widest uppercase mt-10"
        style={{ background: "#2c1810", color: "#9e7060", letterSpacing: "0.15em" }}>
        © 2024 Pearl & Poise. All Rights Reserved.
      </footer>
    </main>
  );
}