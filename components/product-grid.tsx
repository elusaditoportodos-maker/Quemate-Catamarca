"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Mate Calabaza Premium",
    price: 8500,
    description: "Mate de calabaza curada artesanalmente",
  },
  {
    id: 2,
    name: "Yerba Mate Suave",
    price: 3200,
    description: "Yerba mate de hoja fina, sabor suave",
  },
  {
    id: 3,
    name: "Bombilla Alpaca",
    price: 4500,
    description: "Bombilla de alpaca con filtro desmontable",
  },
  {
    id: 4,
    name: "Termo Acero Inoxidable",
    price: 12000,
    description: "Termo de acero inoxidable 1 litro",
  },
  {
    id: 5,
    name: "Azúcar Mascabo Orgánica",
    price: 1800,
    description: "Azúcar mascabo orgánica 500g",
  },
  {
    id: 6,
    name: "Porta Mate Cuero",
    price: 6500,
    description: "Porta mate de cuero artesanal",
  },
]

export function ProductGrid() {
  return (
    <section id="productos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Nuestros Productos</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Productos artesanales de la mejor calidad para disfrutar del mate como se debe
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:border-primary transition-all duration-300">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-6xl">🧉</div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  <p className="text-2xl font-bold text-primary mb-4">${product.price.toLocaleString("es-AR")}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full group/btn">
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Agregar al Carrito
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
