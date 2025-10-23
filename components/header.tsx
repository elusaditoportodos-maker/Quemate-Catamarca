"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Montañas */}
              <div className="flex items-end mb-1">
                <div className="w-3 h-2 bg-white rounded-sm mr-1"></div>
                <div className="w-4 h-3 bg-white rounded-sm mr-1"></div>
                <div className="w-3 h-2 bg-white rounded-sm"></div>
              </div>
              {/* Texto */}
              <div className="text-center">
                <h1 className="text-xl font-bold text-white leading-none">QUÉMATE</h1>
                <p className="text-sm font-bold text-amber-400 leading-none">CATAMARCA</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#productos"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Productos
            </Link>
            <Link
              href="#nosotros"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                0
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-4">
              <Link
                href="#productos"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                href="#nosotros"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="#contacto"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
