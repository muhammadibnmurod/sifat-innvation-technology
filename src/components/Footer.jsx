import React from 'react'
import Logo from '../assets/Logo.png'

const Footer = () => {
  return (
      <footer className="bg-gradient-to-br from-gray-100 to-gray-200 border-t border-gray-300">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">

            <div className="flex flex-col gap-4">
              <img
                  src={Logo}
                  alt="Sifat Innovatsiya Texnologiya"
                  className="w-[140px] h-auto rounded-full"
              />
              <p className="text-sm leading-relaxed max-w-[280px]">
                “Sifat Innovatsiya Texnologiya” MCHJ — yuk ko‘taruvchi kranlar va balandlikda bajariladigan ishlar bo‘yicha
                ta’mirlash hamda texnik ko‘rik xizmatlarini ko‘rsatuvchi korxona.
              </p>
              <button className="w-fit mt-2 px-5 py-2 bg-red-500 hover:bg-red-600 transition text-white text-xs font-semibold rounded-full shadow">
                Bizga yozish
              </button>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700 mt-4">
                Maxfiylik siyosati
              </a>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="text-sm font-bold uppercase tracking-wide">
                Aloqa ma’lumotlari
              </h4>
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-semibold">Manzil</p>
                  <p className="text-gray-600">
                    Toshkent shahri, Mirobod tumani
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Telefon</p>
                  <p className="text-gray-600">
                    +998 99 866 02 71
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">
                    sifat.saffatt@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="text-sm font-bold uppercase tracking-wide">
                Xizmatlar
              </h4>
              <ul className="text-sm space-y-3">
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Texnik ekspertiza
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Ta’mirlash ishlari
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    O‘rnatish va sozlash
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Dasturlar yaratish
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Loyihalash ishlari
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition">
                    Malakali mutaxassislar tayyorlash
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 border-t border-gray-300 pt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Sifat Innovatsiya Texnologiya MCHJ. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
  )
}

export default Footer
