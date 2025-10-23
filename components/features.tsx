import { Mountain, Shield, Truck } from "lucide-react"

const features = [
  {
    icon: Mountain,
    title: "Calidad Premium",
    description: "Productos seleccionados para resistir las condiciones más extremas",
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "Respaldamos cada producto con nuestra garantía de satisfacción",
  },
  {
    icon: Truck,
    title: "Envío Rápido",
    description: "Entrega en toda Argentina con seguimiento en tiempo real",
  },
]

export function Features() {
  return (
    <section className="py-20 border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="mb-4 p-4 rounded-xl bg-card border border-border group-hover:border-primary transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
