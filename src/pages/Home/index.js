import React from "react";

import './style.css'

export default function Home(){
    return(
        <div className="container-home">
            <div>
                <span>Membros</span>
                <span>500</span>
            </div>
            <div>
                <span>Congregações</span>
                <span>18</span>
            </div>
            <div>
                <span>Cidades do Campo</span>
                <span>8</span>
            </div>
        </div>
    )
}