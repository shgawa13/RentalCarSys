import { BrowserRouter as Bro, Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import App from "./App";
import Register from "./components/login/Register";
import ListsCars from "./components/ListsCars/ListsCars";
import ChatBotPage from "./components/ChatBot/ChatBotPage";
import ChatPage from "./components/ChatBot/ChatPage";
import CarDetails from "./components/ListsCars/CarDetails";
import APITest from "./components/Tester/APITest";
const Router = () => {
  return (
    <Bro>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ListsCars" element={<ListsCars />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/APITest" element={<APITest />} />
      </Routes>
    </Bro>
  );
};

export default Router;
