import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home";
import Users from "./pages/Users"
import Header from "./pages/Header";
import Churches from "./pages/Churches";
import Birthdays from "./pages/Birthdays";
import Carteira from "./pages/Carteira";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/users' exact element={<Users />} />
                <Route path='/churches' exact element={<Churches />} />
                <Route path='/birthdays' exact element={<Birthdays />} />
                <Route path='/cards' exact element={<Carteira />} />
            </Routes>
        </BrowserRouter>
    )
}