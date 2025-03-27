import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"

export default function Projects() {
  const { t } = useLanguage()

  const projects = [
    {
      title: "Blog",
      description: t("projects_details.blog.description"),
      technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
      image: "https://i.imgur.com/2VYp3iA.png",
      link: "https://urbanblog.onrender.com",
      demoLink: "https://urbanblog.onrender.com"
    },
    {
      title: "Landing Page",
      description: t("projects_details.landing.description"),
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      image: "https://i.imgur.com/wQpr0ve.png",
      link: "https://landingpage-portfolio.onrender.com/",
      demoLink: "https://landingpage-portfolio.onrender.com/"
    },
    {
      title: "Ecommerce",
      description: t("projects_details.ecommerce.description"),
      technologies: ["React", "Tailwind CSS", "Node.js", "Stripe"],
      image: "https://i.imgur.com/vWJ3EfK.png",
      link: "https://ecommerce-portfolio-8cbo.onrender.com/",
      demoLink: "https://ecommerce-portfolio-8cbo.onrender.com/"
    },
    {
      title: "Portfólio",
      description: t("projects_details.portfolio.description"),
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      image: "https://i.imgur.com/U0z8kZq.png",
      link: "https://portfolio-portfolio-cfrk.onrender.com/",
      demoLink: "https://portfolio-portfolio-cfrk.onrender.com/"
    },
    {
      title: "Webrush Brasil",
      description: t("projects_details.webrush.description"),
      technologies: ["React", "Tailwind CSS", "Node.js"],
      image: "https://i.imgur.com/fPTjbde.png",
      link: "https://www.webrushbrasil.com.br/",
      demoLink: "https://www.webrushbrasil.com.br/"
    }
  ]

  return (
    <section className="py-16" id="projects">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8"
        >
          {t("projects_details.title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    {t("projects_details.view_code")}
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    {t("projects_details.view_demo")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

