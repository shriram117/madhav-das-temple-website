import { createContext, useContext } from "react";

const SettingsContext = createContext();

export const useSettings = () => {

    return useContext(SettingsContext);

};

export default SettingsContext;