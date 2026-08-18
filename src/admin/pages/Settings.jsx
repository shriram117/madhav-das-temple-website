import { useEffect, useState } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import AdminLayout from "../components/AdminLayout";
import SettingsForm from "../components/settings/SettingsForm";

function Settings() {

    const [templeName, setTempleName] = useState("");
    const [aboutTemple, setAboutTemple] = useState("");

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [mobileNo, setMobileNo] = useState("");
    const [whatsappNo, setWhatsappNo] = useState("");
    const [email, setEmail] = useState("");

    const [website, setWebsite] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [googleMap, setGoogleMap] = useState("");
    const [liveDarshanUrl, setLiveDarshanUrl] = useState("");

    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);

    const [oldLogo, setOldLogo] = useState("");
    const [oldBanner, setOldBanner] = useState("");

    const loadSettings = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/settings`
            );

            const data = response.data;

            setTempleName(data.temple_name || "");
            setAboutTemple(data.about_temple || "");

            setAddress(data.address || "");
            setCity(data.city || "");
            setState(data.state || "");
            setPincode(data.pincode || "");

            setMobileNo(data.mobile_no || "");
            setWhatsappNo(data.whatsapp_no || "");
            setEmail(data.email || "");

            setWebsite(data.website || "");
            setFacebookUrl(data.facebook_url || "");
            setInstagramUrl(data.instagram_url || "");
            setYoutubeUrl(data.youtube_url || "");

            setGoogleMap(data.google_map || "");
            setLiveDarshanUrl(data.live_darshan_url || "");

            setOldLogo(data.temple_logo || "");
            setOldBanner(data.temple_banner || "");

        }
        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadSettings();

    }, []);

    const saveSettings = async () => {

        try {

            const formData = new FormData();

            formData.append("temple_name", templeName);
            formData.append("about_temple", aboutTemple);

            formData.append("address", address);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("pincode", pincode);

            formData.append("mobile_no", mobileNo);
            formData.append("whatsapp_no", whatsappNo);
            formData.append("email", email);

            formData.append("website", website);
            formData.append("facebook_url", facebookUrl);
            formData.append("instagram_url", instagramUrl);
            formData.append("youtube_url", youtubeUrl);

            formData.append("google_map", googleMap);
            formData.append("live_darshan_url", liveDarshanUrl);

            //formData.append("old_logo", oldLogo);
            //formData.append("old_banner", oldBanner);

            if (logo)
                formData.append("temple_logo", logo);

            if (banner)
                formData.append("temple_banner", banner);

            await axios.put(
                `${API_BASE_URL}/settings`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Settings Updated Successfully");

            loadSettings();

        }
        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Save Failed"
            );

        }

    };

    return (

        <AdminLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    ⚙ Temple Settings
                </h2>

                <SettingsForm

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

                    website={website}
                    setWebsite={setWebsite}

                    facebookUrl={facebookUrl}
                    setFacebookUrl={setFacebookUrl}

                    instagramUrl={instagramUrl}
                    setInstagramUrl={setInstagramUrl}

                    youtubeUrl={youtubeUrl}
                    setYoutubeUrl={setYoutubeUrl}

                    googleMap={googleMap}
                    setGoogleMap={setGoogleMap}

                    liveDarshanUrl={liveDarshanUrl}
                    setLiveDarshanUrl={setLiveDarshanUrl}

                    saveSettings={saveSettings}

                />

            </div>

        </AdminLayout>

    );

}

export default Settings;