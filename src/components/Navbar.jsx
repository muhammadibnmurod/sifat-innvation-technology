import React from "react";
import CompanyJpg from "../assets/Company.jpeg";

function Navbar() {
  return (
    <section className="w-full flex flex-col md:flex-row font-sans">
      {/* Left section - text */}
      <div className="bg-[#20794e] text-white md:w-1/2 flex flex-col justify-center p-8 md:p-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide uppercase">
          Ремонт <br /> рельсовых <br /> крановых путей
        </h1>

        {/* Red line */}
        <div className="w-24 h-1 bg-red-500 my-6"></div>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed mb-4 text-gray-200">
          Sifat Innovatsion Texnologiya производит ремонт рельсовых крановых путей.
          Квалифицированные специалисты проводят все необходимые работы по
          осмотру, обследованию и техническому ремонту крановых путей с
          применением современных запасных частей и комплектующих.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-200">
          Мы проводим текущий, ремонт по техническому состоянию и
          капитально-восстановительный ремонт.
        </p>

        {/* Button */}
        <button className="self-start px-8 py-3 rounded-full border-2 border-red-500 text-red-500 font-bold uppercase transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg">
          Подробнее
        </button>
      </div>

      {/* Right section - image */}
      <div className="relative md:w-1/2 overflow-hidden">
        <img
          src={CompanyJpg}
          alt="Rails"
          className="w-full h-full object-cover"
        />

        {/* Bottom menu */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap bg-black bg-opacity-70">
          {[
            "Ремонт кранов",
            "Ремонт рельсовых крановых путей",
            "Проекты ремонта",
            "Приборы безопасности кранов",
            "Экспертиза промышленной безопасности",
          ].map((item, index) => (
            <div
              key={index}
              className="text-white px-4 py-3 md:py-4 text-xs md:text-sm flex-1 text-center transition-all duration-300 ease-in-out cursor-pointer hover:bg-red-500"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Navbar;
