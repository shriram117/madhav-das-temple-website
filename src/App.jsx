import TopBar from "./components/TopBar/TopBar";
import Navbar from "./components/Navbar/navbar";
import Hero from "./components/Hero/Hero";
import AboutTemple from "./components/AboutTemple/AboutTemple";
import DailyAarti from "./components/DailyAarti/DailyAarti";
import TempleServices from "./components/TempleServices/TempleServices";
import UpcomingEvents from "./components/UpcomingEvents/UpcomingEvents";
import Gallery from "./components/Gallery/Gallery";
import Donation from "./components/Donation/Donation";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import AOS from "aos";
function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <>
            <TopBar />
            <Navbar />
            <Hero />
            <AboutTemple />
            <DailyAarti />
            <TempleServices />
            <UpcomingEvents />
            <Gallery />
            <Donation />
            <Contact />
            <Footer />
        </>
    );
}

export default App;