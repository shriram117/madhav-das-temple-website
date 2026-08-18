import TempleInfo from "./TempleInfo";
import ContactInfo from "./ContactInfo";
import SocialMedia from "./SocialMedia";
import LiveDarshan from "./LiveDarshan";

function SettingsForm({

    templeName,
    setTempleName,

    aboutTemple,
    setAboutTemple,

    logo,
    setLogo,

    banner,
    setBanner,

    oldLogo,
    oldBanner,

    address,
    setAddress,

    city,
    setCity,

    state,
    setState,

    pincode,
    setPincode,

    mobileNo,
    setMobileNo,

    whatsappNo,
    setWhatsappNo,

    email,
    setEmail,

    website,
    setWebsite,

    facebookUrl,
    setFacebookUrl,

    instagramUrl,
    setInstagramUrl,

    youtubeUrl,
    setYoutubeUrl,

    googleMap,
    setGoogleMap,

    liveDarshanUrl,
    setLiveDarshanUrl,

    saveSettings

}) {

    return (

        <>

            <TempleInfo

                templeName={templeName}
                setTempleName={setTempleName}

                aboutTemple={aboutTemple}
                setAboutTemple={setAboutTemple}

                logo={logo}
                setLogo={setLogo}

                banner={banner}
                setBanner={setBanner}

                oldLogo={oldLogo}
                oldBanner={oldBanner}

            />

            <ContactInfo

                address={address}
                setAddress={setAddress}

                city={city}
                setCity={setCity}

                state={state}
                setState={setState}

                pincode={pincode}
                setPincode={setPincode}

                mobileNo={mobileNo}
                setMobileNo={setMobileNo}

                whatsappNo={whatsappNo}
                setWhatsappNo={setWhatsappNo}

                email={email}
                setEmail={setEmail}

            />

            <SocialMedia

                website={website}
                setWebsite={setWebsite}

                facebookUrl={facebookUrl}
                setFacebookUrl={setFacebookUrl}

                instagramUrl={instagramUrl}
                setInstagramUrl={setInstagramUrl}

                youtubeUrl={youtubeUrl}
                setYoutubeUrl={setYoutubeUrl}

            />

            <LiveDarshan

                googleMap={googleMap}
                setGoogleMap={setGoogleMap}

                liveDarshanUrl={liveDarshanUrl}
                setLiveDarshanUrl={setLiveDarshanUrl}

            />

            <div className="text-end mb-5">

                <button
                    className="btn btn-success btn-lg px-5"
                    onClick={saveSettings}
                >
                    💾 Update Settings
                </button>

            </div>

        </>

    );

}

export default SettingsForm;