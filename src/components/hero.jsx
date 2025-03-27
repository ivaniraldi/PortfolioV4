"use client"

import { useLanguage } from "./language-provider"
import { Download, Github, Linkedin, Mail, Code, Server, Database } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {
  const { t } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="home" className="py-20 min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="order-2 md:order-1" variants={itemVariants}>
          <motion.div className="flex items-center gap-2 mb-4">
            <h2 className="text-primary font-medium tracking-wider">Full Stack Developer</h2>
            <div className="h-1 w-12 bg-primary"></div>
          </motion.div>

          {/* Animated name with larger size */}
          <motion.h1
            className="name-title font-heading mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
            }}
          >
            <span className="inline-block">Ivan</span> <span className="inline-block">Iraldi</span>
          </motion.h1>

          {/* Professional title with animation */}
          <motion.h2
            className="professional-title font-heading mb-4 text-base-content/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="relative">
              <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-primary">
                <Code size={24} />
              </span>
              {t("web_developer")}
            </span>
            <span className="text-lg mt-1 font-normal flex items-center gap-2">
              <Server size={16} className="text-primary" />
              <span>Backend</span>
              <span className="mx-2">•</span>
              <Code size={16} className="text-primary" />
              <span>Frontend</span>
              <span className="mx-2">•</span>
              <Database size={16} className="text-primary" />
              <span>Database</span>
            </span>
          </motion.h2>

          <motion.div className="relative overflow-hidden mb-6" variants={itemVariants}>
            <p className="text-lg md:text-xl opacity-80 max-w-lg leading-relaxed">{t("hero_description")}</p>
            {isLoaded && (
              <motion.div
                className="absolute inset-0 bg-base-100"
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
              />
            )}
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 mb-8" variants={itemVariants}>
            <a
              href="#contact"
              className="btn btn-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            >
              {t("contact_me")}
            </a>
            <a href="/resume.pdf" download className="btn btn-outline hover:bg-base-200 transition-all">
              <Download className="mr-2 h-4 w-4" />
              {t("download_cv")}
            </a>
          </motion.div>

          <motion.div className="flex gap-4" variants={itemVariants}>
            <motion.a
              href="https://linkedin.com/in/ivaniraldi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="btn btn-circle btn-ghost hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://github.com/ivaniraldi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="btn btn-circle btn-ghost hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="mailto:iraldiban@gmail.com"
              aria-label="Email"
              className="btn btn-circle btn-ghost hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={20} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="order-1 md:order-2 flex justify-center" variants={itemVariants}>
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl shadow-primary/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10"></div>
            <img src="https://i.imgur.com/f1ViSuk.jpeg" alt="Ivan Iraldi" className="w-full h-full object-cover" />

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent/30 rounded-full blur-md"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/30 rounded-full blur-md"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

