import "./DailyAarti.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { getImageUrl } from "../../utils/imageUrl";
function DailyAarti() {

    const [aartiList, setAartiList] = useState([]);

    useEffect(() => {

        loadAarti();

    }, []);

    const loadAarti = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/aarti`
            );

            const activeAarti = response.data.filter(
                item => item.status === true
            );

            setAartiList(activeAarti);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <section
            id="aarti"
            className="aarti-section"
        >

            <div className="container">

                <h2 className="text-center mb-5">

                    Daily Aarti

                </h2>

                <div className="row">

                    {

                        aartiList.map((item) => (

                            <div
                                className="col-lg-3 col-md-6 mb-4"
                                key={item.aarti_id}
                            >

                                <div className="aarti-card">

                                    {

                                        item.image_url && (

                                            <img

                                                src={getImageUrl(item.image_url)}

                                                alt={item.aarti_name}

                                                className="aarti-image"

                                            />

                                        )

                                    }

                                    <h4>

                                        {item.aarti_name}

                                    </h4>

                                    <p className="aarti-time">

                                        {item.aarti_time}

                                    </p>

                                    <p>

                                        {item.description}

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default DailyAarti;