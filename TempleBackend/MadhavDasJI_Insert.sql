--
-- PostgreSQL database dump
--

\restrict Zr1j2NVagXCb8UuoCCdIEBaN4DRcjvhBKRfmuWcWzn8brmswY5g3QrxZSWO0Rru

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin_users (id, username, password, full_name, email, role, status, created_on) VALUES (1, 'admin', 'admin123', 'Shriram Sharma', 'shriram1157@gmail.com', 'Admin', true, '2026-08-03 18:20:51.588791');


--
-- Data for Name: daily_aarti; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.daily_aarti (aarti_id, aarti_name, aarti_time, description, display_order, status, created_on, modified_on) VALUES (6, 'Morning Aarti', '08:00AM', '', 2, true, '2026-08-07 00:40:35.146487', '2026-08-07 02:54:25.536145');
INSERT INTO public.daily_aarti (aarti_id, aarti_name, aarti_time, description, display_order, status, created_on, modified_on) VALUES (3, 'Evening Aarti', '7:00 PM', '', 3, true, '2026-08-07 00:20:08.188304', '2026-08-07 02:54:32.827784');
INSERT INTO public.daily_aarti (aarti_id, aarti_name, aarti_time, description, display_order, status, created_on, modified_on) VALUES (4, 'Bhajan Sandhya', '9:00 PM', '', 4, true, '2026-08-07 00:20:08.188304', '2026-08-07 02:54:40.041004');
INSERT INTO public.daily_aarti (aarti_id, aarti_name, aarti_time, description, display_order, status, created_on, modified_on) VALUES (1, 'Mangla Aarti', '05:30 AM', '', 1, true, '2026-08-07 00:20:08.188304', '2026-08-07 02:55:08.051681');


--
-- Data for Name: event_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_master (event_id, title, description, event_date, event_time, location, image_url, status, created_by, created_on, modified_on) VALUES (5, 'अखंड श्री सीताराम संकीर्तन (रामधुन)', '📍 स्थान:
श्री क्षेत्र रोकडोबा हनुमान मंदिर, आरवी, जिला धुले (महाराष्ट्र)', '2026-08-07', '09:00:00', 'Jaipur', '/uploads/events/1786125766737-432871866.jpeg', true, 1, '2026-08-04 22:03:55.098503', '2026-08-07 23:32:46.909735');
INSERT INTO public.event_master (event_id, title, description, event_date, event_time, location, image_url, status, created_by, created_on, modified_on) VALUES (7, 'Janmashtami', 'Celebrate the Divine Birth of Lord Krishna – Janmashtami 2026
', '2026-09-03', '12:37:00', 'Jaipur', '/uploads/events/1786125541600-648800455.png', true, 1, '2026-08-04 22:35:40.759538', '2026-08-07 23:33:15.761404');
INSERT INTO public.event_master (event_id, title, description, event_date, event_time, location, image_url, status, created_by, created_on, modified_on) VALUES (8, 'Sundarkand Path', 'Collective recitation of Sundarkand followed by Hanuman Aarti and Prasad.', '2026-08-12', '19:16:00', 'Jaipur', '/uploads/events/1786132114290-776597800.png', true, 1, '2026-08-08 01:18:34.698423', '2026-08-09 11:28:13.26174');


--
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gallery (gallery_id, title, description, image_url, category, status, created_by, created_on, modified_on) VALUES (9, 'BabaMadhav Das ji', 'Final update', '/uploads/gallery/1786120753559-429600812.JPG', 'Aarti', true, 1, '2026-08-04 23:14:05.549212', '2026-08-07 22:09:13.972337');
INSERT INTO public.gallery (gallery_id, title, description, image_url, category, status, created_by, created_on, modified_on) VALUES (7, 'Baba Ji', 'Testing', '/uploads/gallery/1786120765390-171054786.JPG', 'MadhavDas', true, 1, '2026-08-04 13:58:51.303919', '2026-08-07 22:09:25.784334');
INSERT INTO public.gallery (gallery_id, title, description, image_url, category, status, created_by, created_on, modified_on) VALUES (4, 'Events Photos', 'Testing', '/uploads/gallery/1786120778049-106240077.JPG', 'Eventns', true, 1, '2026-08-04 12:58:09.271623', '2026-08-07 22:09:38.718154');
INSERT INTO public.gallery (gallery_id, title, description, image_url, category, status, created_by, created_on, modified_on) VALUES (10, 'Yagh', 'Yagh', '/uploads/gallery/1786121068949-982910847.JPG', 'Yagh', true, 1, '2026-08-07 22:14:29.492909', NULL);
INSERT INTO public.gallery (gallery_id, title, description, image_url, category, status, created_by, created_on, modified_on) VALUES (11, 'Yagh', 'Yagh', '/uploads/gallery/1786121388258-938686472.png', 'Yagh', true, 1, '2026-08-07 22:19:48.527151', NULL);
INSERT INTO public.gallery (gallery_id, title, description, image_url, category, status, created_by, created_on, modified_on) VALUES (12, 'Yagh', 'Yagh-2023', '/uploads/gallery/1786121427748-720618167.jpg', 'Yagh', true, 1, '2026-08-07 22:20:27.99122', '2026-08-09 11:32:57.537542');


--
-- Data for Name: news_master; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: temple_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.temple_services (service_id, service_name, description, image_url, display_order, status, created_on, modified_on) VALUES (6, 'Hanuman Chalisa', 'Collective chanting of Hanuman Chalisa with Deep Aarti', '/uploads/services/1786132291527-222568134.png', 3, true, '2026-08-08 01:21:31.788877', NULL);
INSERT INTO public.temple_services (service_id, service_name, description, image_url, display_order, status, created_on, modified_on) VALUES (1, 'Ramdhun Sankirtan', ' सीताराम संकीर्तन (रामधुन) for world peace and universal welfare', '/uploads/services/1786132918987-59954636.png', 2, true, '2026-08-07 00:32:20.975226', '2026-08-08 01:31:59.219391');
INSERT INTO public.temple_services (service_id, service_name, description, image_url, display_order, status, created_on, modified_on) VALUES (3, 'Bhajan Sandhya', 'Experience an evening of soulful bhajans and kirtans dedicated to Lord Shri Ram and Hanuman Ji.', '/uploads/services/1786127975658-176886546.png', 1, true, '2026-08-07 00:32:20.975226', '2026-08-09 11:12:11.873228');


--
-- Data for Name: temple_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.temple_settings (setting_id, temple_name, temple_logo, temple_banner, about_temple, address, city, state, pincode, mobile_no, whatsapp_no, email, website, facebook_url, instagram_url, youtube_url, google_map, live_darshan_url, created_on, modified_on) VALUES (1, 'Shri Shri 1008 Baba Madhav Das ji', '', '/uploads/settings/1786120363074-803718308.jpg', '🛕 माधव दास जी महाराज मंदिर – घिनोई धाम 🛕

यह पावन मंदिर माधव दास जी महाराज, घिनोई को समर्पित है, जहाँ श्रद्धा, शांति और भक्ति का अद्भुत संगम देखने को मिलता है।
घिनोई धाम में स्थित यह मंदिर भक्तों के लिए आस्था का प्रमुख केंद्र है।', 'Vpo-Ghinoi,Via-Kaladera,Teh-Chomu ,Jaipur(Rajasthan)', 'Jaipur', 'Rajasthan', '303801', '+91 96379 31008', '96379 31008', '1008shrimadhavdasji@gmail.com', '', 'https://www.facebook.com/profile.php?id=61557241029531', 'https://www.instagram.com/vrddhhsthnumaanmndir?igsh=MXdwMzF4MW5zb3NxZg==', 'https://www.youtube.com/watch?v=DwzrIiLndEs', '', ' https://www.youtube.com/watch?v=DwzrIiLndEs', '2026-08-05 00:54:33.222986', '2026-08-09 11:15:50.180952');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, full_name, username, email, password, mobile_no, role, status, created_on, modified_on) VALUES (1, 'Super Admin', 'admin', 'admin@temple.com', 'admin123', '9876543210', 'Super Admin', true, '2026-08-04 23:21:25.410686', NULL);
INSERT INTO public.users (user_id, full_name, username, email, password, mobile_no, role, status, created_on, modified_on) VALUES (2, 'Temple Admin', 'templeadmin', 'temple@temple.com', 'admin123', '9876500000', 'Admin', true, '2026-08-04 23:21:25.410686', NULL);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: daily_aarti_aarti_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.daily_aarti_aarti_id_seq', 6, true);


--
-- Name: event_master_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_master_event_id_seq', 8, true);


--
-- Name: gallery_gallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gallery_gallery_id_seq', 12, true);


--
-- Name: news_master_news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_master_news_id_seq', 1, false);


--
-- Name: temple_services_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temple_services_service_id_seq', 6, true);


--
-- Name: temple_settings_setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temple_settings_setting_id_seq', 1, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

\unrestrict Zr1j2NVagXCb8UuoCCdIEBaN4DRcjvhBKRfmuWcWzn8brmswY5g3QrxZSWO0Rru

