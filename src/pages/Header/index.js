import React, { useState, useEffect } from "react";
import { FaPowerOff, FaBars, FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import './style.css'
import LogoAD from '../../assets/logo-ad.png'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [class1, setClas1] = useState('links')
    const [class2, setClas2] = useState('links')
    const [class3, setClas3] = useState('links')
    const [class4, setClas4] = useState('links')
    const [class5, setClas5] = useState('links')
    const [class6, setClas6] = useState('links')
    const [class7, setClas7] = useState('links')
    const [class8, setClas8] = useState('links')

    const user_logged = localStorage.getItem('user_logged')

    const navigate = useNavigate()

    function usersSelected(){
        setClas1('link-selected')
        setClas2('links')
        setClas3('links')
        setClas4('links')
        setClas5('links')
        setClas6('links')
        setClas7('links')
        setClas8('links')
    }
    function igrejaSelected(){
        setClas1('links')
        setClas2('link-selected')
        setClas3('links')
        setClas4('links')
        setClas5('links')
        setClas6('links')
        setClas7('links')
        setClas8('links')
    }
    function obreiroSelected(){
        setClas1('links')
        setClas2('links')
        setClas3('link-selected')
        setClas4('links')
        setClas5('links')
        setClas6('links')
        setClas7('links')
        setClas8('links')
    }
    function aniversarioSelected(){
        setClas1('links')
        setClas2('links')
        setClas3('links')
        setClas4('link-selected')
        setClas5('links')
        setClas6('links')
        setClas7('links')
        setClas8('links')
    }
    function carteiraSelected(){
        setClas1('links')
        setClas2('links')
        setClas3('links')
        setClas4('links')
        setClas5('link-selected')
        setClas6('links')
        setClas7('links')
        setClas8('links')
    }
    function certificadoSelected(){
        setClas1('links')
        setClas2('links')
        setClas3('links')
        setClas4('links')
        setClas5('links')
        setClas6('links')
        setClas7('link-selected')
        setClas8('links')
    }
    function cartasSelected(){
        setClas1('links')
        setClas2('links')
        setClas3('links')
        setClas4('links')
        setClas5('links')
        setClas6('links')
        setClas7('links')
        setClas8('link-selected')
    }
    function reportsSelected(){
        setClas1('links')
        setClas2('links')
        setClas3('links')
        setClas4('links')
        setClas5('links')
        setClas6('link-selected')
        setClas7('links')
        setClas8('links')
    }

    function unselectedAll(){
        setClas1('links')
        setClas2('links')
        setClas3('links')
        setClas4('links')
        setClas5('links')
        setClas6('links')
        setClas7('links')
        setClas8('links')
    }

    function closeModal() {
        setIsOpen(!isOpen);
    }

    function openModal() {
        setIsOpen(!isOpen)
    }

    function loggOff(){
        unselectedAll();
        localStorage.clear();
        navigate('/login')
    }

    useEffect(() => {
        if (!user_logged) {
            
            navigate('/login')
        }
    },[])

    return (
        <div className='container'>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className='modal-header'
                contentLabel='Editar Usuário'
                closeTimeoutMS={200}
            >
                <div className="header-links">
                    <Link onClick={closeModal} to='/users' >Usuários</Link>
                    <Link onClick={closeModal} to='/churches' >Congregações</Link>
                    <Link onClick={closeModal} to='/obreiros'  >Obreiros</Link>
                    <Link onClick={closeModal} to='/birthdays' >Aniversariantes</Link>
                    <Link onClick={closeModal} to='/cards' >Gerar Carteira</Link>
                    <Link onClick={closeModal} to='/cards' >Certificados</Link>
                    <Link onClick={closeModal} to='/cards' >Cartas</Link>
                    <Link onClick={closeModal} to='/reports' >Relatórios</Link>
                </div>

            </Modal>

            <div className="header-image">
                <Link onClick={unselectedAll} to='/'>
                    <img src={LogoAD} alt='Logo' width={60} />
                </Link>
            </div>


            <div className="header-links">
                <Link onClick={usersSelected} className={class1} to='/users' >Usuários</Link>
                <Link onClick={igrejaSelected} className={class2} to='/churches' >Congregações</Link>
                <Link onClick={obreiroSelected} className={class3} to='/obreiros'  >Obreiros</Link>
                <Link onClick={aniversarioSelected} className={class4} to='/birthdays' >Aniversariantes</Link>
                <Link onClick={carteiraSelected} className={class5} to='/cards' >Gerar Carteira</Link>
                <Link onClick={certificadoSelected} className={class7} to='/cards' >Certificados</Link>
                <Link onClick={cartasSelected} className={class8} to='/novasCartas' >Cartas</Link>
                <Link onClick={reportsSelected} className={class6} to='/reports' >Relatórios</Link>
            </div>

            <div className="header-off">
                <button onClick={loggOff}>
                    <FaPowerOff size={30} color='#FFF' />
                </button>
            </div>

            <div className="header-menu">
                <button onClick={openModal} >
                    {
                        !isOpen ? <FaBars size={30} color='#FFF' /> : <FaTimes size={30} color='#FFF' />
                    }

                </button>
            </div>

        </div>
    )
}