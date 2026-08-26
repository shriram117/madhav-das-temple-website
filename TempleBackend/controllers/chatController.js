const { GoogleGenAI } = require("@google/genai");

const pool = require("../config/db");

// ======================================================
// GEMINI CLIENT
// ======================================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ======================================================
// TEMPLE CONTACT / ADDRESS
// ======================================================

const getTempleContactAnswer = async (message) => {

    const text = message.toLowerCase();

    const isContactQuestion =
        text.includes("मंदिर का पता") ||
        text.includes("पता और संपर्क") ||
        text.includes("मंदिर कहाँ") ||
        text.includes("मंदिर कहां") ||
        text.includes("मंदिर का एड्रेस") ||
        text.includes("संपर्क") ||
        text.includes("address") ||
        text.includes("contact") ||
        text.includes("location") ||
        text.includes("phone") ||
        text.includes("mobile") ||
        text.includes("whatsapp");

    if (!isContactQuestion) {
        return null;
    }


    const result = await pool.query(`
        SELECT
            temple_name,
            address,
            city,
            state,
            pincode,
            mobile_no,
            whatsapp_no,
            email,
            website,
            google_map
        FROM temple_settings
        ORDER BY setting_id DESC
        LIMIT 1
    `);


    if (result.rows.length === 0) {

        return "🙏 मंदिर की संपर्क जानकारी अभी उपलब्ध नहीं है।";

    }


    const temple = result.rows[0];


    const location = [
        temple.address,
        temple.city,
        temple.state,
        temple.pincode
    ]
        .filter(Boolean)
        .join(", ");


    let answer =
        `📍 ${temple.temple_name || "1008 माधव दास जी मंदिर"}\n\n`;


    if (location) {

        answer += `🏠 पता: ${location}\n`;

    }


    if (temple.mobile_no) {

        answer += `📞 मोबाइल: ${temple.mobile_no}\n`;

    }


    if (temple.whatsapp_no) {

        answer += `💬 WhatsApp: ${temple.whatsapp_no}\n`;

    }


    if (temple.email) {

        answer += `📧 Email: ${temple.email}\n`;

    }


    if (temple.website) {

        answer += `🌐 Website: ${temple.website}\n`;

    }


    if (temple.google_map) {

        answer += `\n🗺️ Google Map: ${temple.google_map}`;

    }


    return answer;
};


// ======================================================
// AARTI - DIRECT DATABASE ANSWER
// ======================================================

const getAartiAnswer = async (message) => {

    const lowerMessage = message.toLowerCase();


    const isHindi =
        /आरती|आरती का समय|आरती कितने बजे|आरती कब/i.test(
            message
        );


    const isEnglish =
        /\baarti\b|\baarti timing\b|\baarti timings\b|\baarti time\b/i.test(
            message
        );


    if (!isHindi && !isEnglish) {

        return null;

    }


    // ==================================================
    // SPECIFIC AARTI
    // ==================================================

    const aartiNames = [

        "Mangla Aarti",

        "Morning Aarti",

        "Evening Aarti",

        "Bhajan Sandhya"

    ];


    const selectedAarti = aartiNames.find(
        (name) =>
            lowerMessage.includes(
                name.toLowerCase()
            )
    );


    if (selectedAarti) {

        const result = await pool.query(
            `
            SELECT
                aarti_name,
                aarti_time
            FROM daily_aarti
            WHERE status = true
              AND LOWER(aarti_name) = LOWER($1)
            LIMIT 1
            `,
            [selectedAarti]
        );


        if (result.rows.length === 0) {

            return isHindi

                ? `🙏 ${selectedAarti} की जानकारी अभी उपलब्ध नहीं है।`

                : `🙏 Information for ${selectedAarti} is currently unavailable.`;

        }


        const item = result.rows[0];


        if (isHindi) {

            return `🪔 ${item.aarti_name}

⏰ समय: ${item.aarti_time}`;

        }


        return `🪔 ${item.aarti_name}

⏰ Time: ${item.aarti_time}`;

    }


    // ==================================================
    // ALL AARTI
    // ==================================================

    const result = await pool.query(`
        SELECT
            aarti_name,
            aarti_time
        FROM daily_aarti
        WHERE status = true
        ORDER BY display_order, aarti_id
    `);


    if (result.rows.length === 0) {

        return isHindi

            ? "🙏 अभी आरती की जानकारी उपलब्ध नहीं है।"

            : "🙏 Aarti timing information is currently unavailable.";

    }


    if (isHindi) {

        return `🙏 मंदिर की दैनिक आरती के समय:

${result.rows
                .map(
                    (item) =>
                        `• ${item.aarti_name} — ${item.aarti_time}`
                )
                .join("\n")}`;

    }


    return `🙏 Daily Aarti timings:

${result.rows
            .map(
                (item) =>
                    `• ${item.aarti_name} — ${item.aarti_time}`
            )
            .join("\n")}`;
};


// ======================================================
// EVENTS - DIRECT DATABASE ANSWER
// ======================================================

const getEventsAnswer = async (message) => {

    const isHindi =
        /कार्यक्रम|आने वाले कार्यक्रम|इवेंट|इवेंट्स|कार्यक्रमों/i.test(
            message
        );


    const isEnglish =
        /\bevent\b|\bevents\b|\bupcoming event\b|\bupcoming events\b|\bprogram\b|\bprograms\b/i.test(
            message
        );


    if (!isHindi && !isEnglish) {

        return null;

    }


    const result = await pool.query(`
        SELECT
            title,
            description,
            event_date,
            event_time,
            location
        FROM event_master
        WHERE status = true
        ORDER BY event_date ASC, event_time ASC
        LIMIT 20
    `);


    if (result.rows.length === 0) {

        return isHindi

            ? "🙏 अभी कोई आगामी कार्यक्रम उपलब्ध नहीं है।"

            : "🙏 No upcoming events are currently available.";

    }


    if (isHindi) {

        return `📅 मंदिर के आगामी कार्यक्रम:

${result.rows
                .map((item) => {

                    const date = item.event_date
                        ? String(item.event_date)
                        : "तारीख उपलब्ध नहीं";


                    const time = item.event_time
                        ? String(item.event_time)
                        : "समय उपलब्ध नहीं";


                    const location =
                        item.location ||
                        "स्थान उपलब्ध नहीं";


                    return `• ${item.title}
  तारीख: ${date}
  समय: ${time}
  स्थान: ${location}`;

                })
                .join("\n\n")}`;

    }


    return `📅 Upcoming temple events:

${result.rows
            .map((item) => {

                const date = item.event_date
                    ? String(item.event_date)
                    : "Date not available";


                const time = item.event_time
                    ? String(item.event_time)
                    : "Time not available";


                const location =
                    item.location ||
                    "Location not available";


                return `• ${item.title}
  Date: ${date}
  Time: ${time}
  Location: ${location}`;

            })
            .join("\n\n")}`;
};


// ======================================================
// SERVICES - DIRECT DATABASE ANSWER
// ======================================================

const getServicesAnswer = async (message) => {

    const isHindi =
        /सेवा|सेवाएं|सेवाएँ|मंदिर में कौन.*सेवा|कौन-कौन सी सेवाएं/i.test(
            message
        );


    const isEnglish =
        /\bservice\b|\bservices\b|\btemple services\b/i.test(
            message
        );


    if (!isHindi && !isEnglish) {

        return null;

    }


    const result = await pool.query(`
        SELECT
            service_name,
            description
        FROM temple_services
        WHERE status = true
        ORDER BY display_order, service_id
    `);


    if (result.rows.length === 0) {

        return isHindi

            ? "🙏 अभी मंदिर की सेवाओं की जानकारी उपलब्ध नहीं है।"

            : "🙏 Temple service information is currently unavailable.";

    }


    if (isHindi) {

        return `🛕 मंदिर में उपलब्ध सेवाएं:

${result.rows
                .map((item) => {

                    return `• ${item.service_name}${item.description
                        ? `\n  ${item.description}`
                        : ""}`;

                })
                .join("\n\n")}`;

    }


    return `🛕 Temple services:

${result.rows
            .map((item) => {

                return `• ${item.service_name}${item.description
                    ? `\n  ${item.description}`
                    : ""}`;

            })
            .join("\n\n")}`;
};


// ======================================================
// NOTICES - DIRECT DATABASE ANSWER
// ======================================================

const getNoticesAnswer = async (message) => {

    const isHindi =
        /सूचना|नोटिस|नोटिस बोर्ड|आज की सूचना|नई सूचना/i.test(
            message
        );


    const isEnglish =
        /\bnotice\b|\bnotices\b|\bnotice board\b|\blatest notice\b/i.test(
            message
        );


    if (!isHindi && !isEnglish) {

        return null;

    }


    const result = await pool.query(`
        SELECT
            title,
            description,
            notice_date,
            notice_time,
            location,
            notice_type,
            valid_upto
        FROM notice_master
        WHERE status = true
        ORDER BY notice_date DESC, notice_time DESC
        LIMIT 20
    `);


    if (result.rows.length === 0) {

        return isHindi

            ? "📢 अभी कोई सूचना उपलब्ध नहीं है।"

            : "📢 No notices are currently available.";

    }


    if (isHindi) {

        return `📢 मंदिर की नवीनतम सूचनाएं:

${result.rows
                .map((item) => {

                    const date = item.notice_date
                        ? String(item.notice_date)
                        : "तारीख उपलब्ध नहीं";


                    const time = item.notice_time
                        ? String(item.notice_time)
                        : "";


                    const location =
                        item.location || "";


                    const validUpto =
                        item.valid_upto
                            ? String(item.valid_upto)
                            : "";


                    return `• ${item.title}
  तारीख: ${date}${time ? `\n  समय: ${time}` : ""}${location ? `\n  स्थान: ${location}` : ""}${validUpto ? `\n  मान्य: ${validUpto}` : ""}
  ${item.description || ""}`;

                })
                .join("\n\n")}`;

    }


    return `📢 Latest temple notices:

${result.rows
            .map((item) => {

                const date = item.notice_date
                    ? String(item.notice_date)
                    : "Date not available";


                const time = item.notice_time
                    ? String(item.notice_time)
                    : "";


                const location =
                    item.location || "";


                const validUpto =
                    item.valid_upto
                        ? String(item.valid_upto)
                        : "";


                return `• ${item.title}
  Date: ${date}${time ? `\n  Time: ${time}` : ""}${location ? `\n  Location: ${location}` : ""}${validUpto ? `\n  Valid until: ${validUpto}` : ""}
  ${item.description || ""}`;

            })
            .join("\n\n")}`;
};


// ======================================================
// GET TEMPLE DATA FOR GEMINI
// ======================================================

const getTempleData = async () => {

    const templeResult = await pool.query(`
        SELECT
            temple_name,
            about_temple,
            address,
            city,
            state,
            pincode,
            mobile_no,
            whatsapp_no,
            email,
            website,
            live_darshan_url
        FROM temple_settings
        ORDER BY setting_id
        LIMIT 1
    `);


    const aartiResult = await pool.query(`
        SELECT
            aarti_name,
            aarti_time,
            description
        FROM daily_aarti
        WHERE status = true
        ORDER BY display_order, aarti_id
    `);


    const eventResult = await pool.query(`
        SELECT
            title,
            description,
            event_date,
            event_time,
            location
        FROM event_master
        WHERE status = true
        ORDER BY event_date ASC, event_time ASC
        LIMIT 50
    `);


    const serviceResult = await pool.query(`
        SELECT
            service_name,
            description
        FROM temple_services
        WHERE status = true
        ORDER BY display_order, service_id
    `);


    const noticeResult = await pool.query(`
        SELECT
            title,
            description,
            notice_date,
            notice_time,
            location,
            notice_type,
            valid_upto
        FROM notice_master
        WHERE status = true
        ORDER BY notice_date DESC, notice_time DESC
        LIMIT 50
    `);


    return {

        temple: templeResult.rows,

        aarti: aartiResult.rows,

        events: eventResult.rows,

        services: serviceResult.rows,

        notices: noticeResult.rows

    };

};


// ======================================================
// BUILD GEMINI CONTEXT
// ======================================================

const buildTempleContext = (data) => {

    const temple = data.temple[0] || {};


    const templeText = `
Temple Name: ${temple.temple_name || ""}
About: ${temple.about_temple || ""}
Address: ${temple.address || ""}
City: ${temple.city || ""}
State: ${temple.state || ""}
Pincode: ${temple.pincode || ""}
Mobile: ${temple.mobile_no || ""}
WhatsApp: ${temple.whatsapp_no || ""}
Email: ${temple.email || ""}
Website: ${temple.website || ""}
Live Darshan: ${temple.live_darshan_url || ""}
`.trim();


    const aartiText = data.aarti.length

        ? data.aarti
            .map(
                item =>
                    `- ${item.aarti_name}: ${item.aarti_time}`
            )
            .join("\n")

        : "No Aarti information available.";


    const eventsText = data.events.length

        ? data.events
            .map(item => {

                return `- ${item.title}
  Date: ${item.event_date || ""}
  Time: ${item.event_time || ""}
  Location: ${item.location || ""}
  Description: ${item.description || ""}`;

            })
            .join("\n")

        : "No event information available.";


    const servicesText = data.services.length

        ? data.services
            .map(item => {

                return `- ${item.service_name}: ${item.description || ""}`;

            })
            .join("\n")

        : "No service information available.";


    const noticesText = data.notices.length

        ? data.notices
            .map(item => {

                return `- ${item.title}
  Date: ${item.notice_date || ""}
  Time: ${item.notice_time || ""}
  Location: ${item.location || ""}
  Type: ${item.notice_type || ""}
  Valid Upto: ${item.valid_upto || ""}
  Description: ${item.description || ""}`;

            })
            .join("\n")

        : "No notice information available.";


    return `
==================================================
OFFICIAL TEMPLE DETAILS
==================================================

${templeText}


==================================================
OFFICIAL AARTI
==================================================

${aartiText}


==================================================
OFFICIAL EVENTS
==================================================

${eventsText}


==================================================
OFFICIAL SERVICES
==================================================

${servicesText}


==================================================
OFFICIAL NOTICES
==================================================

${noticesText}
`;
};


// ======================================================
// AI CHAT
// ======================================================

const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;


        if (!message || !message.trim()) {

            return res.status(400).json({

                success: false,

                message: "Message is required"

            });

        }


        const userMessage = message.trim();


        console.log(
            "🤖 User Question:",
            userMessage
        );


        // ==================================================
        // 1. TEMPLE CONTACT / ADDRESS
        // ==================================================

        const contactAnswer =
            await getTempleContactAnswer(userMessage);


        if (contactAnswer) {

            console.log(
                "📍 CONTACT ANSWER FROM DATABASE"
            );


            return res.json({

                success: true,

                answer: contactAnswer

            });

        }


        // ==================================================
        // 2. AARTI
        // ==================================================

        const aartiAnswer =
            await getAartiAnswer(userMessage);


        if (aartiAnswer) {

            console.log(
                "🙏 AARTI ANSWER FROM DATABASE"
            );


            return res.json({

                success: true,

                answer: aartiAnswer

            });

        }


        // ==================================================
        // 3. EVENTS
        // ==================================================

        const eventsAnswer =
            await getEventsAnswer(userMessage);


        if (eventsAnswer) {

            console.log(
                "📅 EVENTS ANSWER FROM DATABASE"
            );


            return res.json({

                success: true,

                answer: eventsAnswer

            });

        }


        // ==================================================
        // 4. SERVICES
        // ==================================================

        const servicesAnswer =
            await getServicesAnswer(userMessage);


        if (servicesAnswer) {

            console.log(
                "🛕 SERVICES ANSWER FROM DATABASE"
            );


            return res.json({

                success: true,

                answer: servicesAnswer

            });

        }


        // ==================================================
        // 5. NOTICES
        // ==================================================

        const noticesAnswer =
            await getNoticesAnswer(userMessage);


        if (noticesAnswer) {

            console.log(
                "📢 NOTICES ANSWER FROM DATABASE"
            );


            return res.json({

                success: true,

                answer: noticesAnswer

            });

        }


        // ==================================================
        // 6. GEMINI FOR OTHER QUESTIONS
        // ==================================================

        const templeData =
            await getTempleData();


        console.log(
            "🛕 Temple data loaded"
        );


        const templeContext =
            buildTempleContext(templeData);


        const response =
            await ai.models.generateContent({

                model: "gemini-3.6-flash",

                contents: `

VISITOR QUESTION
================

${userMessage}


OFFICIAL TEMPLE INFORMATION
===========================

${templeContext}

                `,

                config: {

                    systemInstruction: `

You are the official AI assistant for
1008 Madhav Das Ji Temple.

Be polite, respectful and helpful.

==================================================
LANGUAGE
==================================================

Answer in Hindi when the visitor asks in Hindi.

Answer in English when the visitor asks in English.

==================================================
TEMPLE INFORMATION
==================================================

For temple-specific questions, use ONLY the
official temple information provided.

Never invent:

- Aarti timings
- Event dates
- Event times
- Services
- Notices
- Address
- Phone numbers
- Contact information

==================================================
AARTI
==================================================

Use the official Aarti information.

Never guess an Aarti time.

==================================================
EVENTS
==================================================

Use the official Events information.

Never invent an event.

==================================================
SERVICES
==================================================

Use the official Services information.

Never invent a service.

==================================================
NOTICES
==================================================

Use the official Notices information.

Never invent a notice.

==================================================
UNKNOWN INFORMATION
==================================================

If official temple information is not available,
say:

"क्षमा करें 🙏 यह जानकारी अभी उपलब्ध नहीं है।"

Do not guess.

==================================================
PRIVACY
==================================================

Never reveal:

- API keys
- passwords
- SQL
- PostgreSQL
- database names
- admin information
- donor information
- private member information

==================================================
STYLE
==================================================

Keep responses:

- concise
- clear
- respectful
- visitor-friendly

Do not mention internal database processing.

                    `

                }

            });


        const answer =
            response.text ||
            "क्षमा करें 🙏 अभी उत्तर उपलब्ध नहीं है।";


        console.log(
            "🤖 Gemini Answer:",
            answer
        );


        return res.json({

            success: true,

            answer: answer

        });

    }
    catch (error) {

        console.error(
            "❌ GEMINI CHAT ERROR:"
        );

        console.error(error);


        return res.status(500).json({

            success: false,

            message:
                "AI service is temporarily unavailable."

        });

    }

};


// ======================================================
// EXPORT
// ======================================================

module.exports = {

    chatWithAI

};