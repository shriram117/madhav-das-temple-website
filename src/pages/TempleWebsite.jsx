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
import LiveDarshan from "../components/LiveDarshan/LiveDarshan";
import Statistics from "../components/Statistics/Statistics";
import UpcomingEvents from "../components/UpcomingEvents/UpcomingEvents";
import ScrollTop from "../components/ScrollTop/ScrollTop";

function TempleWebsite() {

    return (

        <>

            <TopBar />
            <Navbar />
            <Hero />
            <LiveDarshan />
            <AboutTemple />
            <Statistics />
            <UpcomingEvents />
            <DailyAarti />
            <TempleServices />
            <Gallery />
            <Donation />
            <Contact />
            <Footer />
            <ScrollTop />
        </>

    );

}

export default TempleWebsite;