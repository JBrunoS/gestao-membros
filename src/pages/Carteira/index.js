import React, { useState, useRef, useCallback } from "react";
import { FaChevronRight, FaTimes } from 'react-icons/fa'
import InputMask from "react-input-mask";
import { useReactToPrint } from 'react-to-print'

import './style.css'
import api from "../../services/api";
import { Card } from "../Card";

export default function Carteira() {
    const [incidents, setIncidents] = useState([])
    const [cpf, setCpf] = useState('')
    const [incidentsPrint, setIncidentsPrint] = useState([])

    const componentRef = useRef();
    const componentRef1 = useRef();

    const reactToPrintContent1 = useCallback(() => {
        return componentRef1.current;
    }, []);

    const handlePrintSelected = useReactToPrint({
        content: reactToPrintContent1,
        documentTitle: "Carteiras - Usuários selecionados",
        removeAfterPrint: true,
    });
    
    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrintAll = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "Carteiras - Todos os usuários",
        removeAfterPrint: true,
        
    });


    async function handleIncidents() {

        if (cpf === '') {
            return
        }

        try {
            await api.get(`user/${cpf}`)
                .then(response => {

                    if (incidents.length === 0) {
                        if (response.data.length > 0) {
                            incidents.push(response.data[0])
                        }

                    } else {

                        if (response.data.length > 0) {
                            const user = incidents.findIndex(i => i.cpf === cpf)

                            if (user < 0) {
                                incidents.push(response.data[0])
                                return
                            } else {
                                return alert('Usuário já listado!')
                            }
                        } else {
                            return alert('Usuário não localizado!')
                        }
                    }
                })
            setCpf('')
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeleteIncidents(id) {
        incidents.splice(id, 0);

        setIncidents(incidents.filter(incident => incident.id !== id))
    }

    async function handleCancel() {
        setIncidents([]);

    }

    async function handleSearchAll() {
        try {
            api.get(`user`)
                .then(response => {
                    setIncidentsPrint(response.data)
                    handlePrintAll()
                    setIncidentsPrint([])
                })
        } catch (error) {
            console.log(error)
        }

    }

    async function handleSelected() {

        if (incidents.length === 0) {
            return alert('Por favor, fazer alguma seleção')
        } else {
            
            handlePrintSelected();
        }
    }

    return (
        <div className="container-card-all">
            <div style={{ display: 'none' }}>
                <Card object={incidentsPrint} ref={componentRef} />
                <Card object={incidents} ref={componentRef1} />
            </div>
            <div className="header">
                <div>
                    <InputMask
                        mask='999.999.999-99'
                        placeholder="CPF"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                    />
                    <button type='button' onClick={handleIncidents} > <FaChevronRight size={20} color='#FFF' /> </button>
                </div>

                <div className="content-incidents">
                    <div className="incidents">
                        {incidents.map(incidents => (
                            <div key={incidents.id}>
                                <span>
                                    {incidents.nome.split(' ', 2).join(' ')}
                                </span>
                                <button type='button' onClick={() => handleDeleteIncidents(incidents.id)}>
                                    <FaTimes size={12} color="#000" />
                                </button>
                            </div>
                        ))}

                    </div>
                    <div id='buttons'>
                        <button type='button' onClick={handleCancel} >Cancelar</button>
                        <button type='button' onClick={handleSearchAll} >Imprimir Todas</button>
                        <button type='button' onClick={handleSelected}  >Imprimir Selecionadas</button>
                    </div>
                </div>
            </div>
        </div>
    )
}