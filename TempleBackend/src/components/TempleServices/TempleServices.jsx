import "./TempleServices.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { getImageUrl } from "../../utils/imageUrl";
function TempleServices() {

    const [services, setServices] = useState([]);

    useEffect(() => {

        loadServices();

    }, []);

    const loadServices = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/services`
            );

            const activeServices = response.data.filter(
                service => String(service.status).toLowerCase() === "true"
            );


            setServices(activeServices);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <section id="services" className="services">

            <div className="container">

                <h2 className="text-center mb-5">

                    Temple Services

                </h2>

                <div className="row">

                    {

                        services.map((service) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={service.service_id}
                            >

                                <div className="service-card">

                                    {

                                        service.image_url && (

                                            <img

                                                src={getImageUrl(service.image_url)}

                                                alt={service.service_name}

                                                className="service-image"

                                            />

                                        )

                                    }

                                    <h4 className="mt-3">

                                        {service.service_name}

                                    </h4>

                                    <p>

                                        {service.description}

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

export default TempleServices;