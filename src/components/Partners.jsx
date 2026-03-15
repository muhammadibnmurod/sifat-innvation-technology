import React from "react";

// Partners data with image URLs. These are placeholder images for a dynamic component.
// In a real application, you would host these images or use your own local assets.
const partners = [
  { src: "https://placehold.co/200x80/cccccc/333333?text=TRZ" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=TashVSRZ" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=O'zbekko'mir" },
  // "https://placehold.co/200x80/cccccc/333333?text=Камаз",
  { src: "https://placehold.co/200x80/cccccc/333333?text=GAJK" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=LMZ" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=NGMK" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=JDK" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=Yo'lreftrans" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=KARGO" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=Metropoliten" },
  {
    src: "https://placehold.co/260x80/cccccc/333333?text=Temiryo'linfratuzilma",
    wide: true,
  },
  { src: "https://placehold.co/200x80/cccccc/333333?text=Trest Ko'prikqurilish" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=Angren himmash" },
  { src: "https://placehold.co/200x80/cccccc/333333?text=Angren Logistics Center" },
  // "https://placehold.co/200x80/cccccc/333333?text=Газпром",
];

const Partners = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Наши партнёры</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded "></div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
        {partners.map((logo, index) => (
          <div
            key={index}
            className={`flex-shrink-0 h-auto ${
              logo.wide ? "w-32 sm:w-48" : "w-24 sm:w-32"
            }`}
          >
            <img
              src={logo.src}
              alt={`Partner Logo ${index + 1}`}
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/200x80/cccccc/333333?text=Error";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
