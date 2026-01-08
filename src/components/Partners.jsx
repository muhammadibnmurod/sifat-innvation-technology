import React from 'react';

// Partners data with image URLs. These are placeholder images for a dynamic component.
// In a real application, you would host these images or use your own local assets.
const partners = [
  'https://placehold.co/200x80/cccccc/333333?text=Уралмаш',
  'https://placehold.co/200x80/cccccc/333333?text=Кранмаш',
  'https://placehold.co/200x80/cccccc/333333?text=РД',
  'https://placehold.co/200x80/cccccc/333333?text=Камаз',
  'https://placehold.co/200x80/cccccc/333333?text=GAJK',
  'https://placehold.co/200x80/cccccc/333333?text=НЛМК',
  'https://placehold.co/200x80/cccccc/333333?text=Нефаз',
  'https://placehold.co/200x80/cccccc/333333?text=Татспец',
  'https://placehold.co/200x80/cccccc/333333?text=Грузовой',
  'https://placehold.co/200x80/cccccc/333333?text=Транснефть',
  'https://placehold.co/200x80/cccccc/333333?text=Северсталь',
  'https://placehold.co/200x80/cccccc/333333?text=Ямаха',
  'https://placehold.co/200x80/cccccc/333333?text=Лада',
  'https://placehold.co/200x80/cccccc/333333?text=Диакон',
  'https://placehold.co/200x80/cccccc/333333?text=РГК',
  'https://placehold.co/200x80/cccccc/333333?text=Газпром',
];

const Partners = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Наши партнёры
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded "></div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
        {partners.map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-24 sm:w-32 h-auto">
            <img
              src={logo}
              alt={`Partner Logo ${index + 1}`}
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/200x80/cccccc/333333?text=Error";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
