import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Home";
import SignUp from "./Views/SignUp";
import Restaurant from "./Views/Restaurant";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/restaurant/:slug" element={<Restaurant />} />
            </Routes>
        </BrowserRouter>
    );
}