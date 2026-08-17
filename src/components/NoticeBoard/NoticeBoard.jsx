import "./NoticeBoard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function NoticeBoard() {

    const [notices, setNotices] = useState([]);

    useEffect(() => {

        loadNotices();

    }, []);


    const loadNotices = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/notices`
            );

            setNotices(response.data);

        }
        catch (error) {

            console.log("Notice API Error:", error);

        }

    };


    return (

        <section
            id="notices"
            className="notice-board-section"
        >

            <div className="container">

                <h2 className="text-center mb-5">
                    📢 Notice Board
                </h2>


                <div className="notice-list">

                    {
                        notices.length > 0 ? (

                            notices.map((item) => (

                                <div
                                    className="public-notice-card"
                                    key={item.notice_id}
                                >

                                    <div className="notice-icon">
                                        🔔
                                    </div>


                                    <div className="notice-content">

                                        <div className="notice-top">

                                            <h4>
                                                {item.title}
                                            </h4>

                                            <span
                                                className={
                                                    item.notice_type === "Important"
                                                        ? "notice-badge important"
                                                        : "notice-badge"
                                                }
                                            >
                                                {item.notice_type}
                                            </span>

                                        </div>


                                        <p>
                                            {item.description}
                                        </p>


                                        <div className="notice-info">

                                            {
                                                item.notice_date && (

                                                    <span>
                                                        📅{" "}
                                                        {new Date(
                                                            item.notice_date
                                                        ).toLocaleDateString(
                                                            "en-GB"
                                                        )}
                                                    </span>

                                                )
                                            }


                                            {
                                                item.notice_time && (

                                                    <span>
                                                        ⏰{" "}
                                                        {item.notice_time.substring(
                                                            0,
                                                            5
                                                        )}
                                                    </span>

                                                )
                                            }


                                            {
                                                item.location && (

                                                    <span>
                                                        📍{" "}
                                                        {item.location}
                                                    </span>

                                                )
                                            }

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="no-notice">

                                <h4>
                                    No Notices Available
                                </h4>

                                <p>
                                    Please check again later.
                                </p>

                            </div>

                        )
                    }

                </div>

            </div>

        </section>

    );

}

export default NoticeBoard;