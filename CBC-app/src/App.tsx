import Capabilities from "./components/Capabilities"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Methodology from "./components/Methodology"
import Nav from "./components/Nav"
import RealEstate from "./components/RealEstate"
import Team from "./components/Team"
import Values from "./components/Values"
import VisionMission from "./components/VisionMission"
import WhatsappButton from "./components/WhatsappButton"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <main>
      <Nav/>
      <Hero/>
      <Capabilities/>
      <Experience/>
      <Methodology/>
      <RealEstate/>
      <Values/>
      <VisionMission/>
      <Team/>
      <Contact/>
      <Footer/>
      <WhatsappButton/>
      <SpeedInsights/>
    </main>
  )
}

export default App