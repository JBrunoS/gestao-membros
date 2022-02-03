import React, { useRef, useState, useCallback, useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import { Link } from "react-router-dom";
import { FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'

import './style.css'
import api from '../../services/api'
import UsersPrint from "../Users/UsersPrint";

export default function Churches() {
    const [incidents, setIncidents] = useState([])
    const [churches, setChurches] = useState([])
    const [congregacao, setCongregacao] = useState('')
    const componentRef = useRef();

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "Listagem - Congregação",
        removeAfterPrint: true,
    });

    async function handleCount() {
        await api.get('count/churches')
            .then(response => {
                setChurches(response.data)
            })
    }


    async function HandleIncidents(id) {
        api.get(`churches/${id}`)
            .then(response => {
                setIncidents(response.data)
                setCongregacao(id)
            })
    }

    useEffect(() => {
        handleCount();
    }, [])

    return (
        <div className="container-churches">
            <div style={{ display: 'none' }}>
                <UsersPrint object={incidents} congregacao={congregacao} ref={componentRef} />
            </div>

            <Accordion allowZeroExpanded >

                {churches.map((churches, index) => (
                    <AccordionItem onClickCapture={() => HandleIncidents(churches.congregacao)} key={index} >
                        <AccordionItemHeading >
                            <AccordionItemButton>{churches.congregacao}</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel >
                            <Link to=''><FaPrint onClick={handlePrint} size={20} color='#000' /></Link>
                            {incidents.map(incidents => (
                                <ul key={incidents.id}>
                                    <li>
                                        <a href={incidents.url} target='_blank' rel="noreferrer">
                                            <img src={incidents.url} alt='imagem' />
                                        </a>
                                        <span>{incidents.nome + ' - ' + incidents.telefone}</span>
                                    </li>
                                </ul>
                            ))}
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}