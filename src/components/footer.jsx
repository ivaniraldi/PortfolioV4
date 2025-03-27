"use client"

import { useLanguage } from "./language-provider"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="py-8 mt-16 bg-base-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm opacity-70 flex items-center gap-1">
              © {currentYear} Ivan Iraldi. {t("all_rights_reserved")}
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Heart className="h-3 w-3 text-primary" />
              </motion.span>
            </p>
          </div>
          <div className="flex space-x-4">
            <motion.a
              href="https://linkedin.com/in/ivaniraldi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="btn btn-circle btn-ghost btn-sm"
              whileHover={{ scale: 1.1 }}
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href="https://github.com/ivaniraldi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="btn btn-circle btn-ghost btn-sm"
              whileHover={{ scale: 1.1 }}
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="mailto:iraldiban@gmail.com"
              aria-label="Email"
              className="btn btn-circle btn-ghost btn-sm"
              whileHover={{ scale: 1.1 }}
            >
              <Mail size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

