"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"

const NAVIGATION = [
  { name: "Servicios", href: "/servicios" },
  { name: "Pilares", href: "#ai-team" },
  { name: "Equipo", href: "#testimonials" },
  { name: "Clientes", href: "/clientes" },
] as const

type Theme = "light" | "dark"

export function GlassmorphismNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)
  const lastScrollY = useRef(0)

  // Mount detection
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize theme only on client
  useEffect(() => {
    if (!mounted) return

    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light")
      
      setTheme(initialTheme)
      document.documentElement.classList.toggle("light", initialTheme === "light")
    } catch (error) {
      console.warn("Error accessing localStorage:", error)
    }
  }, [mounted])

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("light", newTheme === "light")
    try {
      localStorage.setItem("theme", newTheme)
    } catch (error) {
      console.warn("Error saving theme:", error)
    }
  }

  // Close mobile menu
  const closeMenu = () => setIsOpen(false)

  // Scroll behavior
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100)

    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 50) {
        const scrollDiff = currentScrollY - lastScrollY.current
        if (Math.abs(scrollDiff) > 5) {
          setIsVisible(scrollDiff < 0)
        }
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY

      // Close mobile menu on scroll
      if (isOpen && window.innerWidth < 768) closeMenu()
    }

    window.addEventListener("scroll", controlNavbar, { passive: true })
    return () => {
      window.removeEventListener("scroll", controlNavbar)
      clearTimeout(timer)
    }
  }, [isOpen])

  // Scroll to section
  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) return
    
    const element = document.querySelector(href)
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: Math.max(0, elementTop - 100),
        behavior: "smooth",
      })
    }
    closeMenu()
  }

  const isDark = theme === "dark"

  const MenuItem = ({ name, href }: { name: string; href: string }) => {
    const isExternal = href.startsWith("/")
    const className = "font-medium text-lg text-current hover:scale-105 transition-transform duration-200"

    return isExternal ? (
      <Link href={href} className={className}>{name}</Link>
    ) : (
      <button onClick={() => scrollToSection(href)} className={className} aria-label={`Ir a ${name}`}>
        {name}
      </button>
    )
  }

  return (
    <>
      <nav 
        className={`fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
        } ${hasLoaded ? "opacity-100" : "opacity-0 translate-y-4"}`}
        aria-label="Navegación principal"
        suppressHydrationWarning
      >
        <div className="w-[90vw] max-w-6xl mx-auto">
          <GlassCard 
            rounded="full" 
            padding="sm" 
            className={`px-3 py-1.5 md:px-6 md:py-1 ${isDark ? "text-white/90" : "text-slate-800"}`}
          >
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <Link 
                href="/" 
                className="flex items-center hover:scale-105 transition-transform duration-200" 
                aria-label="Inicio"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 relative">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    style={{ filter: isDark ? "invert(1)" : "none" }}
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {NAVIGATION.map(item => <MenuItem key={item.name} {...item} />)}
              </div>

              {/* Desktop Controls */}
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-200"
                  aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                  suppressHydrationWarning
                >
                  {mounted && (isDark ? <Sun size={20} /> : <Moon size={20} />)}
                </button>
                <Button onClick={() => scrollToSection("#contact")} aria-label="Contactar">
                  Contáctanos
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden hover:scale-105 transition-transform duration-200"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <div className="relative w-6 h-6">
                  <Menu size={24} className={`absolute inset-0 transition-all ${isOpen ? "opacity-0 scale-75" : "opacity-100"}`} />
                  <X size={24} className={`absolute inset-0 transition-all ${isOpen ? "opacity-100" : "opacity-0 scale-75"}`} />
                </div>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden w-[90vw] max-w-4xl mx-auto mt-2">
            <GlassCard 
              rounded="lg" 
              padding="md"
              className={`${isDark ? "text-white/90" : "text-slate-800"}`}
            >
              <div className="flex flex-col space-y-1">
                {NAVIGATION.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      if (!item.href.startsWith("/")) scrollToSection(item.href)
                      closeMenu()
                    }}
                    className="rounded-lg px-4 py-3 font-medium text-current hover:scale-[1.02] transition-transform duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className={`h-px my-2 ${isDark ? "bg-white/10" : "bg-slate-300"}`} />
                <button
                  onClick={toggleTheme}
                  className="rounded-lg px-4 py-3 font-medium text-current hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2"
                  suppressHydrationWarning
                >
                  {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
                  {isDark ? "Modo Claro" : "Modo Oscuro"}
                </button>
                <div className="px-4 pt-2">
                  <Button 
                    className="w-full justify-center"
                    onClick={() => {
                      scrollToSection("#contact")
                      closeMenu()
                    }}
                  >
                    Contáctanos
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent md:hidden z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}