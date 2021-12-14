import React from "react";
import { FaSearch, FaPhone, FaPrint } from 'react-icons/fa'

import './style.css'

export default function Birthdays() {
    return (
        <div className="container-birthdays">
            <div className="head-birthdays">
                <div>
                    <select>
                        <option></option>
                        <option>Janeiro</option>
                        <option>Fevereiro</option>
                        <option>Março</option>
                        <option>Abril</option>
                        <option>Maio</option>
                        <option>Junho</option>
                        <option>Julho</option>
                        <option>Agosto</option>
                        <option>Setembro</option>
                        <option>Outubro</option>
                        <option>Novembro</option>
                        <option>Dezembro</option>
                    </select>
                    <button> <FaSearch size={20} color="#FFFF" /></button>
                </div>

                <div>
                    <a href="#"> <FaPrint size={25} color="#000" /> </a>
                </div>
            </div>

            <div className="card-birthdays">
                <span>João Bruno Rodrigues de Sousa</span>
                <span>(85) 987306182</span>
                <span>23/02/19992</span>
                <span>Itapebussu</span>
                <a href='tel:+55085987306183' > <FaPhone size={20} color='#337ED4' /> </a>
            </div>
            <div className="card-birthdays">
                <span>João Bruno Rodrigues de Sousa</span>
                <span>(85) 987306182</span>
                <span>23/02/19992</span>
                <span>Itapebussu</span>
                <a href='tel:+55085987306183' > <FaPhone size={20} color='#337ED4' /> </a>
            </div>
            <div className="card-birthdays">
                <span>João Bruno Rodrigues de Sousa</span>
                <span>(85) 987306182</span>
                <span>23/02/19992</span>
                <span>Itapebussu</span>
                <a href='tel:+55085987306183' > <FaPhone size={20} color='#337ED4' /> </a>
            </div>
            <div className="card-birthdays">
                <span>João Bruno Rodrigues de Sousa</span>
                <span>(85) 987306182</span>
                <span>23/02/19992</span>
                <span>Itapebussu</span>
                <a href='tel:+55085987306183' > <FaPhone size={20} color='#337ED4' /> </a>
            </div>
            <div className="card-birthdays">
                <span>João Bruno Rodrigues de Sousa</span>
                <span>(85) 987306182</span>
                <span>23/02/19992</span>
                <span>Itapebussu</span>
                <a href='tel:+55085987306183' > <FaPhone size={20} color='#337ED4' /> </a>
            </div>
            <div className="card-birthdays">
                <span>João Bruno Rodrigues de Sousa</span>
                <span>(85) 987306182</span>
                <span>23/02/19992</span>
                <span>Itapebussu</span>
                <a href='tel:+55085987306183' > <FaPhone size={20} color='#337ED4' /> </a>
            </div>
        </div>
    )
}