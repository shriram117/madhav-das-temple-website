import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL, { SERVER_URL } from "../../config/api";
import "./MemberDetails.css";

function MemberDetails() {

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMembers = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/members`
            );

            setMembers(response.data);

        } catch (error) {

            console.error(
                "Member API Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadMembers();

    }, []);


    if (loading) {

        return (
            <section className="member-section">

                <div className="member-container">

                    <p className="member-loading">
                        Loading members...
                    </p>

                </div>

            </section>
        );

    }


    if (members.length === 0) {

        return null;

    }


    return (

        <section className="member-section">

            <div className="member-container">

                <div className="member-heading">

                    <span className="member-subtitle">
                        🛕 Temple Committee
                    </span>

                    <h2>
                        Member Details
                    </h2>

                    <p>
                        हमारे मंदिर समिति के प्रमुख सदस्यों की जानकारी
                    </p>

                </div>


                <div className="member-grid">

                    {
                        members.map((member) => {

                            const imageUrl =
                                member.image_url
                                    ? member.image_url.startsWith("http")
                                        ? member.image_url
                                        : `${SERVER_URL}${member.image_url}`
                                    : null;


                            return (

                                <div
                                    className="member-card"
                                    key={member.member_id}
                                >

                                    <div className="member-image">

                                        {
                                            imageUrl ? (

                                                <img
                                                    src={imageUrl}
                                                    alt={member.member_name}
                                                    onError={(e) => {

                                                        e.target.style.display =
                                                            "none";

                                                    }}
                                                />

                                            ) : (

                                                <div className="member-placeholder">
                                                    👤
                                                </div>

                                            )
                                        }

                                    </div>


                                    <div className="member-content">

                                        <h3>
                                            {member.member_name}
                                        </h3>


                                        {
                                            member.designation && (

                                                <div className="member-designation">

                                                    {member.designation}

                                                </div>

                                            )
                                        }


                                        {
                                            member.mobile_no && (

                                                <a
                                                    href={`tel:${member.mobile_no}`}
                                                    className="member-mobile"
                                                >

                                                    📞 {member.mobile_no}

                                                </a>

                                            )
                                        }


                                        {
                                            member.description && (

                                                <p>
                                                    {member.description}
                                                </p>

                                            )
                                        }

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </section>

    );

}

export default MemberDetails;