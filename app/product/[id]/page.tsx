import { products } from "@/lib/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  const whatsappMessage = `Hi! I'm interested in buying the *${product.name}* for ₦${product.price.toLocaleString()}. Is it available?`;
  const whatsappUrl = `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pearl & Poise</h1>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← Back to shop
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <span className="text-rose-400 text-sm tracking-widest uppercase mb-3">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-semibold text-gray-900 mb-6">
            ₦{product.price.toLocaleString()}
          </p>
          <p className="text-gray-500 leading-relaxed mb-10">{product.description}</p>

          <div className="flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full text-sm font-medium text-center transition-colors"
            >
              Order via WhatsApp
            </a>

            {/* Back */}
            <Link
              href="/"
              className="border border-gray-200 hover:border-gray-400 text-gray-600 px-8 py-4 rounded-full text-sm font-medium text-center transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}