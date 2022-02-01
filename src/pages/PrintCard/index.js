import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReactToPrint } from 'react-to-print'

import api from "../../services/api";
import { Card } from "../Card";

import './style.css'

export default function PrintCard() {
    const componentRef = useRef();

    const [incidents, setIncidents] = useState([])

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "AwesomeFileName",
        removeAfterPrint: true,

    });

    function handleCancel() {
        window.close()
    }

    async function getUser() {

        if (incidents === '') {
            return
        }

        try {
            await api.get(`user/${localStorage.getItem('userCPF')}`)
                .then(response => {
                    setIncidents(response.data)
                })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
    })


    return (
        <div className="print-card">
            <Card object={incidents} ref={componentRef} />
            <div className="print-card-buttons">
                <button onClick={handleCancel} >Cancelar</button>
                <button onClick={handlePrint} >Imprimir</button>
            </div>
        </div>
    )
}