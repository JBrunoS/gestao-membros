import React, { useEffect, useRef, useState, useCallback } from 'react'
import { FaPrint, FaSearch } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'

import api from '../../services/api'
import UsersPrint from '../Users/UsersPrint'

import './style.css'

export default function Obreiros() {
    const [incidents, setIncidents] = useState([])
    const [cargos, setcargos] = useState([])
    const [cargo, setCargo] = useState('')

    const componentRef = useRef()

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "Listagem - Funções",
        removeAfterPrint: true,
    });

    useEffect(() => {
        listCargos();
    },[])

    async function listCargos(){
        try {
            await api.get('obreiros')
            .then(response => {
                setcargos(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleIncidents(){
        
        try {
            await api.get(`obreiros/${cargo}`)
            .then(response => {
                setIncidents(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container-obreiros'>
            <div style={{ display: 'none' }}>
                <UsersPrint object={incidents} congregacao={cargo} ref={componentRef} />
            </div>
            <div className='header-obreiros'>
                <div>
                    <select
                        value={cargo}
                        onChange={e => setCargo(e.target.value)}
                    >
                        <option value=''></option>
                        {cargos.map((cargos, index) => (
                           <option key={index} value={cargos.funcao}>{cargos.funcao}</option> 
                        ))}
                    </select>
                    <button type='button' onClick={handleIncidents}><FaSearch size={25} color='#FFF' /></button>
                </div>
                <div>
                    <button type='button' onClick={handlePrint} ><FaPrint size={30} color='#000'/></button>
                </div>
            </div>
            <div className='body-obreiros'>
                {incidents.map(incidents => (
                    <div key={incidents.id}>
                        <a href={process.env.REACT_APP_API_URL + '/files/' + incidents.key} target='_blank' rel="noreferrer">
                            <img src={process.env.REACT_APP_API_URL + '/files/' + incidents.key} alt='imagem' />
                        </a>
                        
                        <span>{incidents.nome}</span>
                        <span> {incidents.endereco},  {incidents.numero}, {incidents.cidade} </span>
                        <span>{incidents.telefone}</span>
                        <span>{incidents.congregacao}</span>
                        <span>{incidents.email}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}