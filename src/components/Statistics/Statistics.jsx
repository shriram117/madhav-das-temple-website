import "./Statistics.css";
import CountUp from "react-countup";
import { FaUsers, FaPlaceOfWorship, FaCalendarAlt, FaHandsHelping } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

function Statistics() {

    const { ref, inView } = useInView({

        triggerOnce: true,

        threshold: 0.3

    });

    const stats = [

        {
            icon: <FaUsers />,
            value: 50000,
            suffix: "+",
            title: "Devotees"
        },

        {
            icon: <FaPlaceOfWorship />,
            value: 100,
            suffix: "+",
            title: "Years of Faith"
        },

        {
            icon: <FaCalendarAlt />,
            value: 250,
            suffix: "+",
            title: "Temple Events"
        },

        {
            icon: <FaHandsHelping />,
            value: 365,
            suffix: "",
            title: "Days Service"
        }

    ];

    return (

        <section
            className="statistics-section"
            ref={ref}
        >

            <div className="container">

                <h2 className="text-center mb-5">

                    Temple Statistics

                </h2>

                <div className="row">

                    {

                        stats.map((item, index) => (

                            <div
                                className="col-lg-3 col-md-6 mb-4"
                                key={index}
                            >

                                <div className="stat-card">

                                    <div className="stat-icon">

                                        {item.icon}

                                    </div>

                                    <h3>

                                        {

                                            inView ?

                                                <CountUp

                                                    end={item.value}

                                                    duration={3}

                                                />

                                                :

                                                0

                                        }

                                        {item.suffix}

                                    </h3>

                                    <p>

                                        {item.title}

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

export default Statistics;