export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  whatsapp: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White Blouse",
    price: 15000,
    category: "Tops",
    description: "A timeless white blouse perfect for any occasion. Made from premium cotton.",
    image: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=500",
    whatsapp: "2348080257120",
  },
  {
    id: "2",
    name: "Elegant Midi Dress",
    price: 25000,
    category: "Dresses",
    description: "A stunning midi dress that combines elegance and comfort for any event.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    whatsapp: "2348080257120",
  },
  {
    id: "3",
    name: "High Waist Trousers",
    price: 18000,
    category: "Bottoms",
    description: "Chic high waist trousers that pair beautifully with any top.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    whatsapp: "2348080257120",
  },
  {
    id: "4",
    name: "Floral Wrap Dress",
    price: 22000,
    category: "Dresses",
    description: "A beautiful floral wrap dress perfect for summer outings.",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500",
    whatsapp: "2348080257120",
  },
  {
    id: "5",
    name: "Linen Co-ord Set",
    price: 28000,
    category: "Sets",
    description: "A matching linen co-ord set that is effortlessly stylish.",
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=500",
    whatsapp: "2348080257120",
  },
  {
    id: "6",
    name: "Satin Evening Gown",
    price: 45000,
    category: "Dresses",
    description: "A luxurious satin evening gown for special occasions.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    whatsapp: "2348080257120",
  },
];

export const categories = ["All", "Tops", "Dresses", "Bottoms", "Sets"];