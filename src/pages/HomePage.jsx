import Hero from "../components/hero"
import Experience from "../components/experience"
import Skills from "../components/skills"
import Projects from "../components/projects"
import Education from "../components/education"
import Certificates from "../components/certificates"
import Languages from "../components/languages"
import Contact from "../components/contact"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certificates />
      <Languages />
      <Contact />
    </main>
  )
}

