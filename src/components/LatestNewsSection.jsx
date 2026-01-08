import React from 'react';

const LatestNewsSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-sans font-normal text-gray-800 text-center mb-12">
          ПОСЛЕДНИЕ НОВОСТИ И СОБЫТИЯ
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main News Block */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* News 1 */}
            <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex-1 pr-0 md:pr-6 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-red-500 mb-2">
                  Второе рождение стандарта. ГОСТ 33715-2025 «Машины грузоподъемные. Грузозахватные приспособления. Безопасная эксплуатация. Общие требования»
                </h3>
                <p className="text-sm text-gray-500 mb-2">07.08.2025</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Межгосударственным Советом по стандартизации, метрологии и сертификации принят межгосударственный стандарт ГОСТ 33715-2025.
                </p>
                <a href="#" className="text-red-500 text-sm font-semibold hover:underline">
                  читать далее ›
                </a>
              </div>
              <div className="w-full md:w-auto md:min-w-[120px] flex items-center justify-center">
                <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                  !
                </div>
              </div>
            </div>

            {/* News 2 */}
            <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex-1 pr-0 md:pr-6 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-red-500 mb-2">
                  Разработка Sifat Innovation Company - новый ГОСТ «Краны грузоподъемные. Пути надземные рельсовые крановые. Общие технические требования»
                </h3>
                <p className="text-sm text-gray-500 mb-2">02.08.2025</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  В стадии принятия Техническим комитетом по стандартизации, метрологии и сертификации находится межгосударственный стандарт «Краны грузоподъемные...»
                </p>
                <a href="#" className="text-red-500 text-sm font-semibold hover:underline">
                  читать далее ›
                </a>
              </div>
              <div className="w-full md:w-auto md:min-w-[120px] flex items-center justify-center">
                <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                  !
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            {/* Useful Resources */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Полезные ресурсы</h3>
              <ul className="list-none space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline text-sm">Безопасность опасных производственных объектов</a></li>
                <li><a href="#" className="text-blue-600 hover:underline text-sm">Правила ПУБЭ для крановщиков</a></li>
                <li><a href="#" className="text-blue-600 hover:underline text-sm">Разрешение Ростехнадзора</a></li>
                <li><a href="#" className="text-blue-600 hover:underline text-sm">Учебники, основанные на опыте</a></li>
                <li><a href="#" className="text-blue-600 hover:underline text-sm">Сертификация и испытания продукции</a></li>
                <li><a href="#" className="text-blue-600 hover:underline text-sm">Качества</a></li>
              </ul>
            </div>

            {/* Document Blocks */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                <img src="https://via.placeholder.com/150x200?text=Document+1" alt="Document 1" className="w-full h-auto object-cover rounded-md mb-2" />
                <p className="text-xs text-gray-600">ЭКСПЕРТИЗА ПРОМЫШЛЕННОЙ БЕЗОПАСНОСТИ ПОДЪЕМНЫХ СООРУЖЕНИЙ</p>
              </div>
              <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                <img src="https://via.placeholder.com/150x200?text=Document+2" alt="Document 2" className="w-full h-auto object-cover rounded-md mb-2" />
                <p className="text-xs text-gray-600">...текст о книге...</p>
              </div>
              <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-2 hidden lg:block">
                <img src="https://via.placeholder.com/150x200?text=Document+3" alt="Document 3" className="w-full h-auto object-cover rounded-md mb-2" />
                <p className="text-xs text-gray-600">...текст о документе...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination and Button */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
          <button className="px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white text-sm font-semibold rounded-md shadow-lg">
            Подробнее о стандартах
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;