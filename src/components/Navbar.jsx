import React from 'react';
import CompanyJpg from '../assets/Company.jpeg';

function Navbar() {
    return (
        <section className="w-full flex flex-col md:flex-row">
            {/* Chap qism - matn */}
            <div className="bg-[#20794e] text-white md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight uppercase">
                    Ремонт <br /> рельсовых <br /> крановых путей
                </h1>

                {/* Qizil chiziq */}
                <div className="w-40 h-[3px] bg-red-500 my-5"></div>

                {/* Tavsif */}
                <p className="text-base leading-relaxed mb-4">
                    ООО СКБ «Высота» производит ремонт рельсовых крановых путей.
                    Квалифицированные специалисты проводят все необходимые работы по
                    осмотру, обследованию и техническому ремонту крановых путей с
                    применением современных запасных частей и комплектующих.
                </p>
                <p className="text-base leading-relaxed mb-6">
                    Мы проводим текущий, ремонт по техническому состоянию и
                    капитально-восстановительный ремонт.
                </p>

                {/* Tugma */}
                <button className="px-6 py-2 border border-red-500 text-red-500 font-semibold uppercase hover:bg-red-500 hover:text-white transition-all w-fit">
                    Подробнее
                </button>
            </div>

            {/* O‘ng qism - rasm */}
            <div className="relative md:w-1/2 overflow-hidden">
                <img
                    src={CompanyJpg} // Rasm yo‘ling
                    alt="Rails"
                    className="w-full h-full object-cover"
                />

                {/* Pastki menyu */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-wrap">
                    {[
                        'Ремонт кранов',
                        'Ремонт рельсовых крановых путей',
                        'Проекты ремонта',
                        'Приборы безопасности кранов',
                        'Экспертиза промышленной безопасности',
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-black bg-opacity-60 border-r border-white/20 last:border-none
                         text-white px-4 py-2 text-xs md:text-sm flex-1 min-w-[150px]
                         flex items-center justify-center text-center
                         hover:bg-red-500 hover:bg-opacity-80 hover:text-white
                         transition-all duration-300 ease-in-out cursor-pointer"
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
