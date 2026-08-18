import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import SettingsContext from "./SettingsContext";

function SettingsProvider({ children }) {

    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/settings`
            );

            setSettings(response.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                setSettings,
                loading,
                reloadSettings: loadSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export default SettingsProvider;