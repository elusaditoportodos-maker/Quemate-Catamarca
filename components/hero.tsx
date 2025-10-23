import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Mates y yerbas de Catamarca"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight text-white drop-shadow-2xl">
            Disfruta los mejores <span className="text-yellow-300">Mates</span> y Yerbas
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed drop-shadow-lg">
            Mates, yerbas y accesorios artesanales de Catamarca: tradición y sabor para cada ronda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base font-semibold group bg-yellow-500 hover:bg-yellow-600 text-black border-0 shadow-xl">
              Ver Productos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-base font-semibold bg-transparent border-white text-white hover:bg-white hover:text-black shadow-xl">
              Conocer Más
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
