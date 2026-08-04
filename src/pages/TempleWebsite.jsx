import TopBar from "../components/TopBar/TopBar";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import AboutTemple from "../components/AboutTemple/AboutTemple";
import DailyAarti from "../components/DailyAarti/DailyAarti";
import TempleServices from "../components/TempleServices/TempleServices";
import Gallery from "../components/Gallery/Gallery";
import Donation from "../components/Donation/Donation";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

function TempleWebsite() {
    return (
        <>
            <TopBar />
            <Navbar />
            <Hero />
            <AboutTemple />
            <DailyAarti />
            <TempleServices />
            <Gallery />
            <Donation />
            <Contact />
            <Footer />
        </>
    );
}

export default TempleWebsite;