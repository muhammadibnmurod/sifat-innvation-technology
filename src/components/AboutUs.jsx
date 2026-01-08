import React from 'react';
import Human from '../assets/human.png';
const AboutUs = () => {

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-sans font-normal text-gray-800 text-center mb-12">
          O нас
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">
          {/* Left Block */}
          <div className="w-full lg:w-1/3 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-gray-700 leading-relaxed text-sm">
              Специальное конструкторское бюро "Высота" осуществляет деятельность по проведению
              экспертизы промышленной безопасности опасных производственных объектов, на которых
              используются подъемные сооружения и объекты котлонадзора, а также деятельность по
              проектированию грузоподъемных машин (грузоподъемных кранов, кранов-трубоукладчиков,
              кранов-манипуляторов, подъемников (вышек), строительных подъемников) приспособлений и оснастки
              в виде грузозахватных приспособлений, тары, промежуточных креплений башенных кранов,
              подвесных люлек, сооружений в виде крановых путей.
            </p>
            <button className="mt-6 px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-md text-xs font-semibold">
              Подробнее
            </button>
          </div>

          {/* Middle Block */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="flex items-start bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center p-1 mr-4">
                <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Стандартизация</h3>
                <p className="text-gray-600 text-sm">
                  Sifat Innovation Company входит в состав технического комитета (ТК 288) по стандартизации
                  «Краны грузоподъемные и машины непрерывного транспорта».
                </p>
              </div>
            </div>

            <div className="flex items-start bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center p-1 mr-4">
                <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-1.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path fillRule="evenodd" d="M3.232 5.232A2.5 2.5 0 015 3h10a2.5 2.5 0 011.768 4.232L10 14l-6.768-6.768z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Руководство и специалисты</h3>
                <p className="text-gray-600 text-sm">
                  постоянно повышают свои профессиональные знания и квалификацию.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center p-1 mr-4">
                <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm-5 4a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Трудовая биография</h3>
                <p className="text-gray-600 text-sm">
                  Большинства специалистов организации неразрывно связана с грузоподъемными машинами, их
                  обследованием, ремонтом, монтажом, проектированием и изготовлением.
                </p>
              </div>
            </div>
          </div>

          {/* Right Block (Image Card) */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-center relative">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm border border-gray-200 text-center flex flex-col items-center">
              <img
                src= {Human}// Replace with actual image URL
                alt="Шакиров Рустем Раисович"
                className="w-full rounded-md object-cover mb-4"
              />
              <h4 className="text-lg font-bold text-gray-800">Aripov Azamat Sharipovich</h4>
              <p className="text-gray-600 text-sm">
                Начальник отдела конструкторских <br /> разработок Sifat Innovation Company
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;