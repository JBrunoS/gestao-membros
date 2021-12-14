import React from "react";
import { FaSearch, FaPrint, FaUserPlus, FaUserAlt, FaEdit, FaTrash } from 'react-icons/fa'

import  './style.css' 

export default function Users(){
    return(
        <div className="container-users">
            <div className="box-users">
                <form>
                    <input type='text' />
                    <button>
                        <FaSearch size={20} color='#FFF' />
                    </button>
                </form>
                <div>
                    <button type='button' >Buscar Todos</button>
                </div>
                <div>
                    <a href="#"><FaPrint size={30} color='#000' /></a>
                    <a href="#"><FaUserPlus size={30} color='#1B8D19' /></a>
                </div>
            </div>

            <div className="box-body">
                <div className="box-incidents">
                    <a><FaUserAlt size={30} color='#000' /></a>
                    <div>
                        <span>João Bruno Rodrigues de Sousa</span>
                        <span>CPF: 000.000.000-00</span>
                        <span>Rua Antonio Sabino, 000, Itapebussu</span>
                    </div>
                    <div>
                        <span>(85) 98730-6182</span>
                        <span>Congragegação Itapebussu</span>
                        <span>joaobruno.sousa@outlook.com</span>
                    </div>
                    <div>
                        <a alt='Imprimir Carteira de Membro'><FaPrint size={28} color='#000' /></a>
                        <a><FaEdit size={28} color='#E78124' /></a>
                        <a><FaTrash size={28} color='#E70404' /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}