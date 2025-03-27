"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import HomePage from "./pages/HomePage"
import Layout from "./components/Layout"
import { Loader2 } from "lucide-react"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Add flag icons CSS for language selector
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
    document.head.appendChild(link)

    // Simulate loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => {
      document.head.removeChild(link)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-lg font-medium">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AnimatePresence>
  )
}

export default App

