import TempleInfo from "./TempleInfo";
import ContactInfo from "./ContactInfo";
import SocialMedia from "./SocialMedia";
import LiveDarshan from "./LiveDarshan";

function SettingsForm(props) {

    return (

        <>

            <TempleInfo
                templeName={props.templeName}
                setTempleName={props.setTempleName}
                aboutTemple={props.aboutTemple}
                setAboutTemple={props.setAboutTemple}
                logo={props.logo}
                setLogo={props.setLogo}
                banner={props.banner}
                setBanner={props.setBanner}
                oldLogo={props.oldLogo}
                oldBanner={props.oldBanner}
            />

            <ContactInfo
                address={props.address}
                setAddress={props.setAddress}
                city={props.city}
                setCity={props.setCity}
                state={props.state}
                setState={props.setState}
                pincode={props.pincode}
                setPincode={props.setPincode}
                mobileNo={props.mobileNo}
                setMobileNo={props.setMobileNo}
                whatsappNo={props.whatsappNo}
                setWhatsappNo={props.setWhatsappNo}
                email={props.email}
                setEmail={props.setEmail}
            />

            <SocialMedia
                website={props.website}
                setWebsite={props.setWebsite}
                facebookUrl={props.facebookUrl}
                setFacebookUrl={props.setFacebookUrl}
                instagramUrl={props.instagramUrl}
                setInstagramUrl={props.setInstagramUrl}
                youtubeUrl={props.youtubeUrl}
                setYoutubeUrl={props.setYoutubeUrl}
            />

            <LiveDarshan
                googleMap={props.googleMap}
                setGoogleMap={props.setGoogleMap}
                liveDarshanUrl={props.liveDarshanUrl}
                setLiveDarshanUrl={props.setLiveDarshanUrl}
            />

            <div className="text-end mb-5">

                <button
                    className="btn btn-success btn-lg px-5"
                    onClick={props.saveSettings}
                >
                    💾 Update Settings
                </button>

            </div>

        </>

    );

}

export default SettingsForm;