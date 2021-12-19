import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

import user from '../../assets/user.png'
import api from "../../services/api";

import './style.css'


export default function PrintCard() {
    const componentRef = useRef();

    const [incidents, setIncidents] = useState([])
    const [batismo, setBatismo] = useState('')
    const [nascimento, setNascimento] = useState('')

    async function getUser() {

        if (incidents === '') {
            return
        }

        try {
            await api.get(`user/${localStorage.getItem('userCPF')}`)
                .then(response => {
                    setIncidents(response.data)
                    const batismo = response.data[0].data_batismo;
                    const nascimento = response.data[0].data_nascimento;

                    const diaBatismo = batismo.slice(8)
                    const mesBatismo = batismo.slice(5, 7)
                    const anoBatismo = batismo.slice(0, 4)

                    setBatismo(diaBatismo + '/' + mesBatismo + '/' + anoBatismo)

                    const diaNascimento = nascimento.slice(8)
                    const mesNascimento = nascimento.slice(5, 7)
                    const anoNascimento = nascimento.slice(0, 4)

                    setNascimento(diaNascimento + '/' + mesNascimento + '/' + anoNascimento)

                })

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser();
    })

    const Print  = forwardRef(function Print(ref){
        return (
            incidents.map(incidents => (
                <div className="body" key={incidents.id} ref={ref} >
                    <div className="content-card">
                        <div className="header-card">
                            <img src={process.env.REACT_APP_API_URL + '/files/' + incidents.key} alt='imagem' />
    
                            <div>
                                <h2>IGREJA EVANGÉLICA ASSEMBLEIA DE DEUS</h2>
                                <h2>Templo Central - Campo de Amanari</h2>
                                <span>Rua Raimundo Firmino, S/N - Amanari - Mpe - CE</span>
                                <span>CNPJ: 03.326.552/0001-82</span>
                                <span>adtccampodoamanari@gmail.com</span>
                            </div>
                        </div>
    
                        <div className="body-card">
                            <div className="body-card-name">
                                <label htmlFor="name">Nome</label>
                                <input id='name' disabled value={incidents.nome} />
                            </div>
                            <div>
                                <label htmlFor="function">Função</label>
                                <input id="function" disabled value={incidents.funcao} />
                            </div>
                            <div>
                                <label htmlFor="churche">Congregação</label>
                                <input id="churche" disabled value={incidents.congregacao} />
                            </div>
    
                            <div>
                                <div>
                                    <label htmlFor="batismo-print">Batismo</label>
                                    <input id="batismo-print" disabled value={batismo} />
                                </div>
                                <div>
                                    <label htmlFor="numero-membro">Nº Membro</label>
                                    <input id="numero-membro" disabled value={incidents.id} />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="content-card">
                        <div className="body-card-2">
                            <div>
                                <label htmlFor="filiacao">Filiação</label>
                                <input id="filiacao" disabled value={incidents.filiacao} />
                            </div>
    
                            <div className="documents-card">
                                <div>
                                    <label htmlFor="cpf-print">CPF</label>
                                    <input id="cpf-print" disabled value={incidents.cpf} />
                                </div>
                                <div>
                                    <label htmlFor="rg-print">RG</label>
                                    <input id="rg-print" disabled value={incidents.rg} />
                                </div>
                            </div>
                            <div className="documents-card-2">
                                <div>
                                    <label htmlFor="estado-civil">Est. Civil</label>
                                    <input id="estado-civil" disabled value={incidents.estado_civil} />
                                </div>
                                <div>
                                    <label htmlFor="nascimento-print">Nasc.</label>
                                    <input id="nascimento-print" disabled value={nascimento} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="assinatura">Assinatura</label>
                                <input id="assinatura" disabled />
                            </div>
    
                            <div className="footer-card">
                                <img src={user} alt="user" />
                                <div>
                                    <input disabled />
                                    <h2>Vicente Viana Barreto - Pastor Presidente</h2>
                                    <span>CGADB nº034673 - COMEADEC nº 461</span>
                                </div>
                                <img src={user} alt="user" />
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )
    })

    

return (
    <div className="container-card">
        <ReactToPrint
            trigger={() => <button>Imprimir</button> }
            content={() => componentRef.current}
        >
            <Print ref={componentRef} />
        </ReactToPrint>
    </div>
)
}