import React from "react";
import { FaPowerOff, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import './style.css'

export default function Header() {
    return (
        <div className='container'>

            <div>
                <Link to='/'>
                    <FaUserAlt size={50} color='#FFF' />
                </Link>
            </div>


            <div>
                <Link to='/users' >Usuários</Link>
                <Link to='/churches' >Congregações</Link>
                <Link to='/'  >Obreiros</Link>
                <Link to='/birthdays' >Aniversariantes</Link>
                <Link to='/cards' >Gerar Carteira</Link>

            </div>

            <div>
                <Link to='/'>
                    <FaPowerOff size={30} color='#FFF' />
                </Link>
            </div>

        </div>
    )
}