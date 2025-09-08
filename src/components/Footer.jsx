import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between text-gray-700">
        
        {/* Company Info Column */}
        <div className="mb-8 md:mb-0 md:w-1/4">
          <img src="https://via.placeholder.com/150x50" alt="СКБ «ВЫСОТА»" className="mb-4" /> {/* Rasm URL'ini o'zgartiring */}
          <p className="text-sm leading-relaxed mb-4">
            Конструкторское бюро, специализация подъемных и высотных работ ООО "СКБ «Высота»"
          </p>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white text-xs font-semibold rounded-md shadow-md">
            Написать нам
          </button>
          <a href="#" className="block mt-4 text-xs text-gray-500 hover:text-gray-700">
            Политика конфиденциальности
          </a>
        </div>

        {/* Contacts Column */}
        <div className="mb-8 md:mb-0 md:w-1/4">
          <h4 className="font-bold mb-4">Наши контакты</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold">Адрес:</p>
              <p>Республика Татарстан, г. Набережные Челны, пос. Сахарова, улица Индустриальная, д.16</p>
            </div>
            <div>
              <p className="font-semibold">Время работы:</p>
              <p>Пн - Пт: 08:00 - 16:30</p>
            </div>
            <div>
              <p className="font-semibold">Номер телефона:</p>
              <p>8-800-500-36-35</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>skb-visota@mail.ru</p>
              <p>info@skb-visota.ru</p>
            </div>
            <div className="flex space-x-2 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Services Column */}
        <div className="mb-8 md:mb-0 md:w-1/4">
          <h4 className="font-bold mb-4">Услуги</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Экспертиза</a></li>
            <li><a href="#" className="hover:underline">Ремонт</a></li>
            <li><a href="#" className="hover:underline">Монтаж</a></li>
            <li><a href="#" className="hover:underline">Реконструкция</a></li>
            <li><a href="#" className="hover:underline">Модернизация</a></li>
            <li><a href="#" className="hover:underline">Чертежи</a></li>
          </ul>
        </div>

        {/* Latest News Column */}
        <div className="md:w-1/4">
          <h4 className="font-bold mb-4">Последние новости</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-red-500 font-semibold mb-1">Второе рождение стандарта. ГОСТ 33715-2025...</p>
              <p className="text-xs text-gray-500">07.08.2025</p>
            </div>
            <div>
              <p className="text-red-500 font-semibold mb-1">Разработка СКБ «ВЫСОТА» - новый ГОСТ...</p>
              <p className="text-xs text-gray-500">02.08.2025</p>
            </div>
            <div>
              <p className="text-red-500 font-semibold mb-1">О подготовке требований по идентификации...</p>
              <p className="text-xs text-gray-500">04.06.2025</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;