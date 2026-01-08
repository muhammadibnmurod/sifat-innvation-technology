import { Phone, Mail, MapPin, Clock, Search } from "lucide-react";
import Logo from "../assets/Logo.png";
import LocationIcon from "../assets/location.svg";
import MessageIcon from "../assets/message.svg";
import PhoneIcon from "../assets/phone.svg";
import TimeIcon from "../assets/time.svg";

export default function Header() {
  return (
    <header className="w-full bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-gray-800 text-gray-400 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-2">
          {/* Left side info */}
          <div className="flex flex-wrap items-center gap-4">
            {/*<div className="flex items-center gap-2">*/}
            {/*  <Clock className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />*/}
            {/*  <span>Пн - Пт: 08.00 - 16.30</span>*/}
            {/*</div>*/}
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
              <span className="hidden md:inline">
                Uzbekiston Respublikasi, Toshkent shahar, Mirobod tuman
              </span>
              <span className="md:hidden">г. Набережные Челны</span>
            </div>
          </div>

          {/* Right side info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
              <a
                href="tel:998998660271"
                className="font-medium text-white hover:text-orange-400 transition-colors"
              >
                +998-99-866-02-71
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
              <a
                href="mailto:	sifat.saffatt@gmail.com"
                className="hover:text-orange-400 transition-colors"
              >
                 
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <i className="fab fa-facebook-f text-base"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <i className="fab fa-youtube text-base"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <i className="fab fa-vk text-base"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="Sifat Innovatsion Texnologiya"
            className="w-28 items-center pt-2-"
          />
          <div>
            <h1 className="text-gray-900 text-2xl max-w-md md:text-3xl font-extrabold tracking-tight mb-4">
              Sifat Innovatsion Texnologiya
            </h1>
            {/* <p className="text-gray-600 text-sm">
              Texnologiya
            </p> */}
          </div>
        </div>

        {/* Certification Logos */}
        <div className=" lg:flex flex-col items-end">
          <div className="flex gap-4">
            <a href="https://yandex.uz/maps/10335/tashkent/search/Uzbekiston%20Respublikasi%2C%20Toshkent%20shahar%2C%20Mirobod%20tuman/?ll=69.245719%2C41.312043&sll=69.279737%2C41.311151&sspn=0.299034%2C0.172920&z=13" target={"_blank"} className=" hover:cursor-pointer">
              <img
                src={LocationIcon}
                alt="Location"
                className="h-5 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
            <a href="" className=" hover:cursor-pointer">
              <img
                src={MessageIcon}
                alt="Message"
                className="h-5 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
            <a href="" className=" hover:cursor-pointer">
              <img
                src={PhoneIcon}
                alt="Phone"
                className="h-5 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
            <a href="" className=" hover:cursor-pointer">
              <img
                src={TimeIcon}
                alt="Time"
                className="h-5 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            Работаем с <span className="text-orange-500 font-bold">2014</span>{" "}
            года
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-1 md:gap-4 text-sm font-medium">
            <li className="px-3 py-2 text-gray-700 font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              ГЛАВНАЯ
            </li>
            <li className="px-3 py-2 text-gray-700 font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              О НАС
            </li>
            <li className="px-3 py-2 text-gray-700 font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              НАШИ УСЛУГИ
            </li>
            <li className="px-3 py-2 text-gray-700 font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              ВЫПОЛНЕННЫЕ РАБОТЫ
            </li>
            <li className="px-3 py-2 text-gray-700 font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              АКТУАЛЬНО
            </li>
            <li className="px-3 py-2 text-gray-700 font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              ЗАДАТЬ ВОПРОС
            </li>
            <li className="px-3 py-2 text-gray-700 font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              КОНТАКТЫ
            </li>
          </ul>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Поиск по сайту..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 text-sm transition-all"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
