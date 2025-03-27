"use client"

import { useLanguage } from "./language-provider"
import { motion, useInView } from "framer-motion"
import { Globe, Languages } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export default function LanguageSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true)
    }
  }, [isInView])

  const languages = [
    {
      name: "spanish",
      level: "native_level",
      proficiency: 100,
      description: "Lengua materna con dominio completo",
      icon: "🇪🇸",
      color: "text-green-500"
    },
    {
      name: "english",
      level: "proficient_level",
      proficiency: 95,
      description: "Alto nivel de competencia (C2)",
      icon: "🇬🇧",
      color: "text-blue-500"
    },
    {
      name: "portuguese",
      level: "proficient_level",
      proficiency: 85,
      description: "Nivel avanzado de competencia",
      icon: "🇧🇷",
      color: "text-yellow-500"
    },
  ]

  return (
    <section 
      id="languages" 
      className="py-16 relative overflow-hidden" 
      ref={sectionRef}
      aria-labelledby="languages-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_50%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "auto" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-hidden"
          >
            <h2 
              id="languages-title"
              className="text-4xl font-bold text-center"
            >
              <span className="border-b-4 border-primary pb-2 relative">
                {t("languages")}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          className="card bg-base-200/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2 mb-8">
              <Globe className="h-6 w-6 text-primary" />
              {t("language_proficiency")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-xl bg-base-100/50 hover:bg-base-100 transition-all duration-300">
                    <div className="relative">
                      <div className="radial-progress" style={{ "--value": shouldAnimate ? lang.proficiency : 0, "--size": "8rem" }}>
                        <span className="text-4xl">{lang.icon}</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 radial-progress"
                        style={{ "--value": 100, "--size": "8rem" }}
                        initial={{ opacity: 0 }}
                        animate={shouldAnimate ? { opacity: 0.1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                      />
                    </div>
                    <div className="mt-4">
                      <h4 className={`text-xl font-semibold mb-2 ${lang.color} group-hover:scale-105 transition-transform`}>
                        {t(lang.name)}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {lang.description}
                      </p>
                      <div className="badge badge-primary badge-outline">
                        {t(lang.level)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

