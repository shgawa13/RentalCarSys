import React from "react";
import { BrowserRouter } from "react-router-dom";
import '../index.css';
import App from "../App";



const root =ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
              <BrowserRouter>
        <App/>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();