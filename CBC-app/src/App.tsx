import Capabilities from "./components/Capabilities"
import Contact from "./components/Contact"
import Experience from "./components/Expirience"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Methodology from "./components/Methodology"
import Nav from "./components/Nav"
import RealState from "./components/RealState"
import Team from "./components/Team"
import Values from "./components/Values"
import VisionMission from "./components/VisionMission"
import WhatsappButton from "./components/WhatsappButton"

function App() {
  return (
    <main>
      <Nav/>
      <Hero/>
      <Capabilities/>
      <Experience/>
      <Methodology/>
      <RealState/>
      <Values/>
      <VisionMission/>
      <Team/>
      <Contact/>
      <Footer/>
      <WhatsappButton/>
    </main>
  )
}

export default App