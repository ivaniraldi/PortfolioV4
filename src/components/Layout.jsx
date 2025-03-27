"use client"

import { useEffect } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import ScrollToTop from "./scroll-to-top"
import AnimatedBackground from "./animated-background"
import { motion } from "framer-motion"

export default function Layout({ children }) {
  // Initialize theme based on system preference
  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches
    document.documentElement.setAttribute("data-theme", darkModePreference ? "dark" : "light")
  }, [])

  return (
    <div className="min-h-screen bg-base-100 relative overflow-hidden">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Navbar />
        <div className="container mx-auto px-4 py-8">{children}</div>
        <Footer />
        <ScrollToTop />
      </motion.div>
    </div>
  )
}

