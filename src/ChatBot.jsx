import { useState } from "react";
import axios from "axios";

import API_BASE_URL from "./config/api";

import "./ChatBot.css";


// ==========================================
// DEFAULT SUGGESTED QUESTIONS
// ==========================================

const suggestedQuestions = [
    "🙏 आरती का समय क्या है?",
    "📅 आने वाले कार्यक्रम कौन से हैं?",
    "🛕 मंदिर में कौन-कौन सी सेवाएं हैं?",
    "📢 आज की सूचना क्या है?",
    "📍 मंदिर का पता और संपर्क क्या है?"
];


// ==========================================
// AARTI OPTIONS
// ==========================================

const aartiOptions = [
    {
        name: "Mangla Aarti",
        question: "Mangla Aarti का समय क्या है?"
    },
    {
        name: "Morning Aarti",
        question: "Morning Aarti का समय क्या है?"
    },
    {
        name: "Evening Aarti",
        question: "Evening Aarti का समय क्या है?"
    },
    {
        name: "Bhajan Sandhya",
        question: "Bhajan Sandhya का समय क्या है?"
    }
];


// ==========================================
// CHATBOT COMPONENT
// ==========================================

function ChatBot() {

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [showAartiOptions, setShowAartiOptions] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text:
                "नमस्ते 🙏 मैं 1008 माधव दास जी मंदिर का AI सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?"
        }
    ]);


    // ==========================================
    // SEND MESSAGE TO BACKEND
    // ==========================================

    const sendMessageText = async (text) => {

        const userMessage = text.trim();

        if (!userMessage) {
            return;
        }

        if (loading) {
            return;
        }


        // Add user message
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);


        setMessage("");

        setLoading(true);


        try {

            console.log(
                "🤖 Sending question:",
                userMessage
            );


            const response = await axios.post(
                `${API_BASE_URL}/chat`,
                {
                    message: userMessage
                }
            );


            console.log(
                "🤖 Chat response:",
                response.data
            );


            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text:
                        response.data?.answer ||
                        "क्षमा करें 🙏 अभी उत्तर नहीं मिल पाया।"
                }
            ]);

        }
        catch (error) {

            console.error(
                "❌ CHAT ERROR:",
                error
            );


            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text:
                        "क्षमा करें 🙏 अभी AI सेवा उपलब्ध नहीं है। कृपया थोड़ी देर बाद प्रयास करें।"
                }
            ]);

        }
        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // NORMAL SEND
    // ==========================================

    const sendMessage = () => {

        const text = message.trim();

        if (!text) {
            return;
        }

        // BACK COMMAND
        if (
            text.toLowerCase() === "back" ||
            text.toLowerCase() === "go back" ||
            text === "वापस" ||
            text === "पीछे"
        ) {

            backToQuestions();

            return;
        }

        sendMessageText(text);

    };


    // ==========================================
    // SUGGESTED QUESTION
    // ==========================================

    const askSuggestedQuestion = (question) => {

        // Aarti question → show Aarti options
        if (
            question.includes("आरती का समय")
        ) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "user",
                    text: question
                },
                {
                    sender: "bot",
                    text:
                        "🙏 आप किस आरती का समय जानना चाहते हैं?"
                }
            ]);

            setShowAartiOptions(true);

            return;
        }


        // Other questions → send normally
        sendMessageText(question);

    };


    // ==========================================
    // SELECT AARTI
    // ==========================================

    const selectAarti = (aarti) => {

        setShowAartiOptions(false);

        sendMessageText(aarti.question);

    };


    // ==========================================
    // KEYBOARD HANDLER
    // ==========================================

    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            sendMessage();

        }

    };


    // ==========================================
    // OPEN CHAT
    // ==========================================

    const openChat = () => {

        setOpen(true);

    };


    // ==========================================
    // CLOSE CHAT
    // ==========================================

    const closeChat = () => {

        setOpen(false);

    };


    // ==========================================
    // BACK TO QUESTIONS
    // ==========================================

    const backToQuestions = () => {

        if (loading) {
            return;
        }


        setShowAartiOptions(false);


        setMessages([
            {
                sender: "bot",
                text:
                    "नमस्ते 🙏 मैं 1008 माधव दास जी मंदिर का AI सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?"
            }
        ]);


        setMessage("");

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <>

            {/* ==================================
                FLOATING NAMASTE BUTTON
            ================================== */}

            {!open && (

                <button
                    type="button"
                    className="chatbot-image-button"
                    onClick={openChat}
                    aria-label="Madhav Das Ji AI Assistant"
                >

                    <img
                        src="/chatbot-namaste.png"
                        alt="Namaste Madhav Das Ji AI Assistant"
                    />

                </button>

            )}


            {/* ==================================
                CHAT WINDOW
            ================================== */}

            {open && (

                <div className="chatbot-window">


                    {/* ==============================
                        HEADER
                    ============================== */}

                    <div className="chatbot-header">

                        <div className="chatbot-header-info">

                            <div className="chatbot-title">

                                🤖 Madhav Das Ji AI

                            </div>


                            <div className="chatbot-status">

                                <span className="status-dot">
                                    ●
                                </span>

                                Online

                            </div>

                        </div>


                        <div className="chatbot-header-actions">

                            <button
                                type="button"
                                className="chatbot-back"
                                onClick={backToQuestions}
                                disabled={loading}
                                aria-label="Back to questions"
                                title="मुख्य प्रश्न"
                            >

                                ← वापस

                            </button>


                            <button
                                type="button"
                                className="chatbot-close"
                                onClick={closeChat}
                                aria-label="Close chat"
                            >

                                ×

                            </button>

                        </div>

                    </div>


                    {/* ==============================
                        MESSAGES
                    ============================== */}

                    <div className="chatbot-messages">


                        {/* ==========================
                            DEFAULT QUESTIONS
                        ========================== */}

                        {messages.length === 1 &&
                            !loading &&
                            !showAartiOptions && (

                                <div className="suggested-questions">

                                    <div className="suggested-title">

                                        आप इनमें से कुछ पूछ सकते हैं:

                                    </div>


                                    {suggestedQuestions.map(
                                        (question, index) => (

                                            <button
                                                type="button"
                                                key={index}
                                                className="suggested-question"
                                                onClick={() =>
                                                    askSuggestedQuestion(
                                                        question
                                                    )
                                                }
                                            >

                                                {question}

                                            </button>

                                        )
                                    )}

                                </div>

                            )}


                        {/* ==========================
                            AARTI OPTIONS
                        ========================== */}

                        {showAartiOptions && !loading && (

                            <div className="aarti-options">

                                <div className="suggested-title">

                                    🙏 कौन-सी आरती का समय जानना चाहते हैं?

                                </div>


                                {aartiOptions.map(
                                    (aarti, index) => (

                                        <button
                                            type="button"
                                            key={index}
                                            className="suggested-question"
                                            onClick={() =>
                                                selectAarti(aarti)
                                            }
                                        >

                                            🪔 {aarti.name}

                                        </button>

                                    )
                                )}

                            </div>

                        )}


                        {/* ==========================
                            CHAT MESSAGES
                        ========================== */}

                        {messages.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className={
                                        item.sender === "user"
                                            ? "chat-message user-message"
                                            : "chat-message bot-message"
                                    }
                                >

                                    {item.text}

                                </div>

                            )
                        )}


                        {/* ==========================
                            LOADING
                        ========================== */}

                        {loading && (

                            <div className="chat-message bot-message">

                                <span className="chat-loading">

                                    AI सोच रहा है...

                                </span>

                            </div>

                        )}

                    </div>


                    {/* ==============================
                        INPUT
                    ============================== */}

                    <div className="chatbot-input-area">

                        <textarea
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="सवाल लिखें या 'back' लिखें..."
                            rows="1"
                            disabled={loading}
                            aria-label="Chat message"
                        />


                        <button
                            type="button"
                            onClick={sendMessage}
                            disabled={
                                loading ||
                                !message.trim()
                            }
                            aria-label="Send message"
                        >

                            ➤

                        </button>

                    </div>

                </div>

            )}

        </>

    );

}


export default ChatBot;