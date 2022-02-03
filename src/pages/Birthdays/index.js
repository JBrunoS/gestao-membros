import React, { useState, useRef, useCallback } from "react";
import { FaSearch, FaPhone, FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'

import './style.css'
import api from '../../services/api'

import UsersPrint from "../Users/UsersPrint";

export default function Birthdays() {
    const [incidents, setIncidents] = useState([])
    const [mes, setMes] = useState('')

    const componentRef = useRef();
  
    const reactToPrintContent = useCallback(() => {
      return componentRef.current;
    }, []);
  
    const handlePrint = useReactToPrint({
      content: reactToPrintContent,
      documentTitle: "Listagem - Aniversariantes",
      removeAfterPrint: true,
    });

    async function handleIncidents() {
        await api.get(`birthday/${mes}`)
            .then(response => {
                setIncidents(response.data)
            })
    }
    return (
        <div className="container-birthdays">
            <div style={{ display: 'none' }}>
                <UsersPrint object={incidents} congregacao={'Aniversariantes - Mês: ' + mes}  ref={componentRef} />
            </div>
            
            <div className="head-birthdays">
                
                <div>
                    <select
                        id="month"
                        value={mes}
                        onChange={e => setMes(e.target.value)}
                    >
                        <option value=''></option>
                        <option value={'01'}>Janeiro</option>
                        <option value={'02'}>Fevereiro</option>
                        <option value={'03'}>Março</option>
                        <option value={'04'}>Abril</option>
                        <option value={'05'}>Maio</option>
                        <option value={'06'}>Junho</option>
                        <option value={'07'}>Julho</option>
                        <option value={'08'}>Agosto</option>
                        <option value={'09'}>Setembro</option>
                        <option value={'10'}>Outubro</option>
                        <option value={'11'}>Novembro</option>
                        <option value={'12'}>Dezembro</option>
                    </select>
                    <button type="button" onClick={handleIncidents} > <FaSearch size={20} color="#FFFF" /></button>
                </div>

                <div>
                    <span className="button-print" onClick={handlePrint} > <FaPrint size={30} color="#000" /> </span>
                </div>
            </div>
            {incidents.map(incidents => (
                <div className="card-birthdays" key={incidents.id}>
                    <img src={incidents.url} alt='imagem' />
                    <span>{incidents.nome.split(' ', 2).join(' ')}</span>
                    <span>{incidents.telefone}</span>
                    <span>{incidents.dia_nascimento + '/' + incidents.mes_nascimento + '/' + incidents.ano_nascimento}</span>
                    <span>{incidents.congregacao}</span>
                    <a href={'tel:+55' + incidents.telefone} > <FaPhone size={20} color='#337ED4' /> </a>
                </div>
            ))}


        </div>
    )
}