import { Phone, Mail, MapPin, Clock, Search } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full bg-white shadow-sm">
            {/* Top Bar */}
            <div className="bg-gray-900 text-gray-300 text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-2">
                    {/* Left side info */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 hover:text-white transition-colors">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span>Пн - Пт: 08.00 - 16.30</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white transition-colors">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span className="hidden md:inline">Республика Татарстан, г. Набережные Челны, ул. Магистральная, д.16</span>
                            <span className="md:hidden">г. Набережные Челны</span>
                        </div>
                    </div>

                    {/* Right side info */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone className="w-4 h-4 text-orange-500" />
                            <a href="tel:88005003935" className="font-medium">8-800-500-39-35</a>
                        </div>
                        <div className="hidden md:flex items-center gap-2 hover:text-white transition-colors">
                            <Mail className="w-4 h-4 text-orange-500" />
                            <a href="mailto:skb-visota@mail.ru">skb-visota@mail.ru</a>
                        </div>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3 text-gray-400">
                            <a href="#" className="hover:text-orange-500 transition-colors"><i className="fab fa-facebook text-lg"></i></a>
                            <a href="#" className="hover:text-orange-500 transition-colors"><i className="fab fa-youtube text-lg"></i></a>
                            <a href="#" className="hover:text-orange-500 transition-colors"><i className="fab fa-vk text-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-4 gap-6">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="СКБ Высота" className="h-12" />
                    <div>
                        <h1 className="text-gray-900 text-2xl font-bold">СКБ «ВЫСОТА»</h1>
                        <p className="text-gray-600 text-sm">Механизация подъемных и высотных работ</p>
                    </div>
                </div>

                {/* Certification Logos */}
                <div className="hidden lg:flex flex-col items-end">
                    <div className="flex gap-4">
                        <img src="/cert1.png" alt="Cert1" className="h-10 opacity-90 hover:opacity-100 transition-opacity" />
                        <img src="/cert2.png" alt="Cert2" className="h-10 opacity-90 hover:opacity-100 transition-opacity" />
                        <img src="/cert3.png" alt="Cert3" className="h-10 opacity-90 hover:opacity-100 transition-opacity" />
                        <img src="/cert4.png" alt="Cert4" className="h-10 opacity-90 hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-orange-500 text-sm mt-1 font-medium">Работаем с 2009 года</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                    <ul className="flex flex-wrap items-center gap-1 md:gap-6 text-sm font-medium">
                        <li className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer transition-colors">ГЛАВНАЯ</li>
                        <li className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer transition-colors">О НАС</li>
                        <li className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer transition-colors">НАШИ УСЛУГИ</li>
                        <li className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer transition-colors">ВЫПОЛНЕННЫЕ РАБОТЫ</li>
                        <li className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer transition-colors">АКТУАЛЬНО</li>
                        <li className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer transition-colors">ЗАДАТЬ ВОПРОС</li>
                        <li className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer transition-colors">КОНТАКТЫ</li>
                    </ul>

                    {/* Search */}
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Поиск по сайту..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 text-sm w-full md:w-64"
                        />
                    </div>
                </div>
            </nav>
        </header>
    );
}