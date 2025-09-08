import React from "react";

// This data structure makes the component dynamic and easy to update.
const servicesData = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="w-8 h-8 text-white"
      >
        <path
          fill="currentColor"
          d="M320 464c8.8 0 16-7.2 16-16V160H224c-17.7 0-32-14.3-32-32V0H64C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320zM224 0v128h128L224 0zM576 160c-12.7 0-25.1 4.5-34.9 12.7L339.8 335.8c-21.6 20.3-56.5 20.3-78.1 0L141.6 230.7c-9.8-9.2-22.3-14.7-35.3-14.7H16c-13.3 0-24 10.7-24 24v24c0 13.3 10.7 24 24 24h66.5c12.1 0 23.7 4.5 32.6 12.8L256 424.3l119.8-112.5c8.9-8.3 20.5-12.8 32.6-12.8h75.5c13.3 0 24-10.7 24-24v-24c0-13.3-10.7-24-24-24z"
        />
      </svg>
    ),
    iconBgColor: "bg-red-500",
    title: "Экспертиза и документация",
    items: [
      "Экспертиза и диагностирование",
      "Оформление документации на крановую стрелу",
      "Экспертиза промышленной стрелы",
      "Паспорт ПС и объектов под",
      "Тех. карты и ПИР",
      "Аэродинамика кранов",
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-white"
      >
        <path
          fill="currentColor"
          d="M16 144.3L160 80v336L16 384V144.3zM288 384l144-64V128L288 192v192zM496 208v160c0 13.3-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24V256l-96-48v160c0 13.3-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24V208l-96-48v160c0 13.3-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24V160L160 96 288 32l160 80 80-40V208z"
        />
      </svg>
    ),
    iconBgColor: "bg-orange-500",
    title: "Ремонт",
    items: [
      "Ремонт ГПМ",
      "Ремонт крана козлового типа",
      "Ремонт крановых путей",
      "Проекты ремонта",
      "Ремонтные документы",
      "Монтаж кранов",
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className="w-8 h-8 text-white"
      >
        <path
          fill="currentColor"
          d="M64 48c-17.7 0-32 14.3-32 32s14.3 32 32 32h16L96 112V240c0 13.3-10.7 24-24 24H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H72l24 24v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H240c17.7 0 32 14.3 32 32s-14.3 32-32 32H640c17.7 0 32-14.3 32-32s-14.3-32-32-32H448V320h112c17.7 0 32-14.3 32-32s-14.3-32-32-32H448V112h112c17.7 0 32-14.3 32-32s-14.3-32-32-32H448V48H64zM240 240V112h112v128H240zM240 320h112v128H240V320z"
        />
      </svg>
    ),
    iconBgColor: "bg-red-400",
    title: "Реконструкция, модернизация",
    items: [
      "Реконстр., модерн. и документация крана",
      "Реконстр. кранов мостового типа",
      "Модернизация мостовых кранов",
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        className="w-8 h-8 text-white"
      >
        <path
          fill="currentColor"
          d="M128 32c0-17.7 14.3-32 32-32s32 14.3 32 32V64H448V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64H576c26.5 0 48 21.5 48 48v240c0 26.5-21.5 48-48 48H368v-32c0-17.7-14.3-32-32-32s-32 14.3-32 32v32H64c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48H128V32zM32 288c0 8.8 7.2 16 16 16H272V192H48c-8.8 0-16 7.2-16 16V288zM368 288h240c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368V288z"
        />
      </svg>
    ),
    iconBgColor: "bg-red-500",
    title: "ПС и их инфраструктура",
    items: [
      "Планы по зданию и сооружению",
      "Цифровой анализ кранов",
      "Настройка оборудования",
      "Турбинные узлы",
      "Передвижные краны",
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-white"
      >
        <path
          fill="currentColor"
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L225 353c-9.4 9.4-24.6 9.4-33.9 0l-80-80c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l63.9 63.9 143-143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
        />
      </svg>
    ),
    iconBgColor: "bg-red-500",
    title: "Специализированные услуги",
    items: [
      "Ремонт всех моделей",
      "Обследование кранов",
      "Экспертиза электроприводов",
      "Контроль ремонта",
      "Протокольные испытания",
      "Контроль и поверка",
      "Проектные проверки",
      "Монтаж кранов",
      "Ремонт запасных",
      "Навесной",
    ],
  },
];

const Remont = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Ремонт грузоподъемных кранов в Набережных Челнах
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Услуги, которые мы оказываем:
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center text-center border-l-4 border-r-4 border-transparent hover:border-red-500 transition-colors duration-300"
          >
            <div className={`p-4 rounded-full ${service.iconBgColor}`}>
              {service.icon}
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {service.title}
            </h3>
            <ul className="mt-2 text-sm text-gray-500 list-none text-left w-full space-y-1">
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Remont;
