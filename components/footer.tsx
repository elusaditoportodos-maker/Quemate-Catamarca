import Link from "next/link"
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border/40 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-start mb-4">
              {/* Montañas */}
              <div className="flex items-end mb-2">
                <div className="w-4 h-3 bg-white rounded-sm mr-1"></div>
                <div className="w-5 h-4 bg-white rounded-sm mr-1"></div>
                <div className="w-4 h-3 bg-white rounded-sm"></div>
              </div>
              {/* Texto */}
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white leading-none">QUÉMATE</h2>
                <p className="text-lg font-bold text-amber-400 leading-none">CATAMARCA</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Tu tienda de confianza para mates, yerbas y accesorios artesanales en Catamarca. Tradición y sabor para cada ronda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#productos" className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-400" />
                <span>Catamarca, Argentina</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <span>+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <span>info@quemate.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">© 2025 Quémate Catamarca. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
