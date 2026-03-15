import React from "react";
import product1 from "../assets/Products/product1.jpg";
import product2 from "../assets/Products/product2.jpg";
import product3 from "../assets/Products/product3.jpg";
import product4 from "../assets/Products/product4.png";
import product5 from "../assets/Products/product5.jpg";
const products = [
  { id: 1, title: "Продукт 1", image: product1, tag: "Новинка" },
  { id: 2, title: "Продукт 2", image: product2, tag: "Хит продаж" },
  { id: 3, title: "Продукт 3", image: product3, tag: "Премиум" },
  { id: 4, title: "Продукт 4", image: product4, tag: "Эксклюзив" },
  { id: 5, title: "Продукт 5", image: product5, tag: "Рекомендуем" },
];

function Products() {
  return (
    <section className="bg-white py-20 px-8 font-['DM_Sans',sans-serif]">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[11px] tracking-[0.25em] uppercase text-red-600 mb-4 font-medium">
          коллекция
        </p>
        <h2 className="font-['Playfair_Display',serif] text-[52px] font-normal text-black leading-tight">
          Наша <em className="italic text-red-600">оборудование и приборы</em>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[2px] max-w-7xl mx-auto">
        {products.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-[#20794e] overflow-hidden cursor-pointer"
            style={{
              animation: `fadeUp 0.7s ease both`,
              animationDelay: `${index * 0.1 + 0.1}s`,
            }}
          >
            {/* Image */}
            <div className="relative h-[280px] overflow-hidden bg-[#222]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out 
                           group-hover:scale-[1.08] grayscale-[20%] group-hover:grayscale-0"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] 
                              to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              />

              {/* Number badge */}
              <span
                className="absolute top-3 left-4 z-10 font-['Playfair_Display',serif] 
                               text-[11px] tracking-[0.12em] text-black] 
                               group-hover:text-red-600 transition-colors duration-300"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Hover CTA button */}
              <button
                className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 translate-y-3
                           opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                           transition-all duration-[350ms] ease-out bg-red-600 hover:bg-red-500
                           text-white text-[10px] tracking-[0.15em] uppercase font-medium 
                           px-5 py-2.5 whitespace-nowrap"
              >
                Подробнее →
              </button>
            </div>

            {/* Info */}
            <div className="p-5 border-t border-[#2a2a2a] group-hover:border-red-600 transition-colors duration-300">
              <h3 className="font-['Playfair_Display',serif] text-[17px] font-medium text-[#f5f0e8] mb-2 tracking-wide">
                {item.title}
              </h3>
              {/* Animated underline */}
              <div
                className="w-10 h-px bg-red-600 origin-left scale-x-0 group-hover:scale-x-100 
                              transition-transform duration-400 mb-2"
              />
              <p className="text-[14px] leading-relaxed text-[#3d3434] font-light">
                Краткое описание продукта для презентации и ключевых
                особенностей.
              </p>
              {/* Tag */}
              <span
                className="inline-block mt-3 text-[9px] tracking-[0.18em] uppercase text-red-600 
                               border border-red-600 px-2 py-1 opacity-0 -translate-x-1.5 
                               group-hover:opacity-100 group-hover:translate-x-0 
                               transition-all duration-[350ms] delay-75"
              >
                {item.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}

export default Products;
