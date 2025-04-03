import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "./language-provider"
import ModeToggle from "./mode-toggle"
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Code,
  Briefcase,
  GraduationCap,
  MessageSquare,
  LanguagesIcon,
  Home,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const { language, setLanguage, t, languageName } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const dropdownRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Calculate scroll progress for progress bar
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  const navItems = [
    {
      label: "home",
      href: "home",
      icon: <Home size={16} />,
      dropdown: false,
    },
    {
      label: "experience",
      href: "experience",
      icon: <Briefcase size={16} />,
      dropdown: false,
    },
    {
      label: "skills_and_projects",
      href: "#",
      icon: <Code size={16} />,
      dropdown: true,
      items: [
        { label: "skills", href: "skills" },
        { label: "projects", href: "projects" },
      ],
    },
    {
      label: "certificates",
      href: "certificates",
      icon: <GraduationCap size={16} />,
    },
    {
      label: "languages",
      href: "languages",
      icon: <LanguagesIcon size={16} />,
      dropdown: false,
    },
    {
      label: "contact",
      href: "contact",
      icon: <MessageSquare size={16} />,
      dropdown: false,
    },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-base-100/80 shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <button 
          onClick={() => scrollToSection("home")}
          className="text-xl font-bold font-heading"
        >
          <motion.span
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            Ivan Iraldi
          </motion.span>
        </button>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <LanguageSelector language={language} setLanguage={setLanguage} languageName={languageName} />
              <ModeToggle />
              <motion.button
                className="btn btn-ghost btn-circle"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute left-0 top-16 z-50 w-full bg-base-100/95 backdrop-blur-md shadow-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="container mx-auto py-4 px-4">
                    <ul className="menu menu-vertical w-full gap-1">
                      {navItems.map((item, index) => (
                        <motion.li
                          key={item.href + index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full"
                        >
                          {item.dropdown ? (
                            <div className="w-full">
                              <button
                                onClick={() => toggleDropdown(item.label)}
                                className="flex w-full items-center justify-between py-2 px-4 rounded-lg"
                              >
                                <span className="flex items-center gap-2">
                                  {item.icon}
                                  {t(item.label)}
                                </span>
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                                />
                              </button>

                              <AnimatePresence>
                                {activeDropdown === item.label && (
                                  <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="pl-6 mt-1"
                                  >
                                    {item.items?.map((subItem, subIndex) => (
                                      <motion.li
                                        key={subItem.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: subIndex * 0.05 }}
                                      >
                                        <button
                                          onClick={() => scrollToSection(subItem.href)}
                                          className="block w-full text-left py-2 hover:bg-base-200 hover:rounded-sm"
                                        >
                                          {t(subItem.label)}
                                        </button>
                                      </motion.li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <button
                              onClick={() => scrollToSection(item.href)}
                              className="flex w-full items-center gap-2 py-2  hover:bg-base-200 rounded-lg"
                            >
                              {item.icon}
                              {t(item.label)}
                            </button>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            <div ref={dropdownRef} className="flex items-center">
              <ul className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href + index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {item.dropdown ? (
                      <div>
                        <motion.button
                          onClick={() => toggleDropdown(item.label)}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                            activeDropdown === item.label ? "bg-base-200" : "hover:bg-base-200 hover:rounded-lg"
                          }`}
                          aria-expanded={activeDropdown === item.label}
                          aria-haspopup="true"
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 0 }}
                        >
                          <span className="flex items-center gap-1">
                            {item.icon}
                            {t(item.label)}
                          </span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-base-100/95 backdrop-blur-md ring-1 ring-black ring-opacity-5 z-50"
                            >
                              <div className="py-1">
                                {item.items?.map((subItem) => (
                                  <button
                                    key={subItem.href}
                                    onClick={() => scrollToSection(subItem.href)}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-base-200"
                                  >
                                    {t(subItem.label)}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                        <button
                          onClick={() => scrollToSection(item.href)}
                          className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
                        >
                          {item.icon}
                          {t(item.label)}
                        </button>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSelector language={language} setLanguage={setLanguage} languageName={languageName} />
              <ModeToggle />
            </div>
          </>
        )}
      </div>
    </motion.nav>
  )
}

function LanguageSelector({ language, setLanguage, languageName }) {
  return (
    <div className="dropdown dropdown-end">
      <motion.div
        tabIndex={0}
        role="button"
        className="btn btn-ghost gap-1 normal-case"
        aria-label="Select language"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{languageName}</span>
        <ChevronDown size={14} />
      </motion.div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100/95 backdrop-blur-md rounded-box w-52">
        <motion.li onClick={() => setLanguage("en")} whileHover={{ x: 5 }}>
          <button className={`w-full text-left ${language === "en" ? "font-bold bg-base-200" : ""}`}>
            <span className="fi fi-us mr-2"></span>
            English
          </button>
        </motion.li>
        <motion.li onClick={() => setLanguage("pt")} whileHover={{ x: 5 }}>
          <button className={`w-full text-left ${language === "pt" ? "font-bold bg-base-200" : ""}`}>
            <span className="fi fi-br mr-2"></span>
            Português
          </button>
        </motion.li>
        <motion.li onClick={() => setLanguage("es")} whileHover={{ x: 5 }}>
          <button className={`w-full text-left ${language === "es" ? "font-bold bg-base-200" : ""}`}>
            <span className="fi fi-es mr-2"></span>
            Español
          </button>
        </motion.li>
      </ul>
    </div>
  )
}

