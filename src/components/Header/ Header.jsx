import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { getImageUrl } from "../../utils/imageUrl";
import "./Header.css";

function Header() {

    const [settings, setSettings] = useState({});

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const response = await axios.get(

                `${API_BASE_URL}/settings`

            );

            setSettings(response.data);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (<header className="header">

        <div className="container">

            <div className="header-content">

                <div className="logo">

                    {

                        settings.temple_logo ?

                            <img
                                src={getImageUrl(settings.temple_logo)}
                                alt="Temple Logo"
                            />

                            :

                            <img
                                src="/logo.png"
                                alt="Temple Logo"
                            />

                    }

                    <h2>

                        {

                            settings.temple_name ||

                            "Madhav Das Ji Temple"

                        }

                    </h2>

                </div>

                <nav>

                    <ul>

                        <li>

                            <a href="#home">

                                Home

                            </a>

                        </li>

                        <li>

                            <a href="#about">

                                About

                            </a>

                        </li>

                        <li>

                            <a href="#gallery">

                                Gallery

                            </a>

                        </li>

                        <li>

                            <a href="#services">

                                Services

                            </a>

                        </li>

                        <li>

                            <a href="#aarti">

                                Daily Aarti

                            </a>

                        </li>

                        <li>

                            <a href="#contact">

                                Contact

                            </a>

                        </li>

                    </ul>

                </nav>

            </div>

        </div>

    </header>

    );

}

export default Header;