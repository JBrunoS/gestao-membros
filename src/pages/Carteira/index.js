import React from "react";
import user from '../../assets/user.png'
import { FaChevronRight, FaTimes } from 'react-icons/fa'

import './style.css'


export default function Carteira() {
    return (
        // {/* <div>
        //     
        // </div> */}
        <div className="container-card">
            <div className="header">
                <div>
                    <input id='cpf' />
                    <button> <FaChevronRight size={20} color='#FFF' /> </button>
                </div>

                <div className="content-incidents">
                    <div className="incidents">
                        <div>
                            <span>
                                Bruno
                            </span>
                            <button>
                                <FaTimes size={12} color="#000" />
                            </button>
                        </div>
                        <div>
                            <span>
                                Bruno
                            </span>
                            <button>
                                <FaTimes size={12} color="#000" />
                            </button>
                        </div>
                        <div>
                            <span>
                                Bruno
                            </span>
                            <button>
                                <FaTimes size={12} color="#000" />
                            </button>
                        </div>
                        <div>
                            <span>
                                Bruno
                            </span>
                            <button>
                                <FaTimes size={12} color="#000" />
                            </button>
                        </div>
                        <div>
                            <span>
                                Bruno
                            </span>
                            <button>
                                <FaTimes size={12} color="#000" />
                            </button>
                        </div>
                        <div>
                            <span>
                                Bruno
                            </span>
                            <button>
                                <FaTimes size={12} color="#000" />
                            </button>
                        </div>
                       
                        
                      
                    </div>
                    <div id='buttons'>
                        <button>Cancelar</button>
                        <button>Imprimir Todas</button>
                        <button>Imprimir Selecionadas</button>
                    </div>
                </div>
            </div>
            {/* <div className="body">
                <div className="content-card">
                    <div className="header-card">
                        <img src={user} alt="user" />

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
                            <input id='name' disabled value=' joao BRuno rodrigues de sousa' />
                        </div>
                        <div>
                            <label htmlFor="function">Função</label>
                            <input id="function" disabled />
                        </div>
                        <div>
                            <label htmlFor="churche">Congregação</label>
                            <input id="churche" disabled />
                        </div>

                        <div>
                            <div>
                                <label htmlFor="batismo">Batismo</label>
                                <input id="batismo" disabled />
                            </div>
                            <div>
                                <label htmlFor="numero-membro">Nº Membro</label>
                                <input id="numero-membro" disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-card">
                    <div className="body-card-2">
                        <div>
                            <label htmlFor="filiacao">Filiação</label>
                            <input id="filiacao" disabled />
                        </div>
                        <div>
                            <label htmlFor="assinatura">Assinatura</label>
                            <input id="assinatura" disabled />
                        </div>

                        <div className="documents-card">
                            <div>
                                <label htmlFor="cpf">CPF</label>
                                <input id="cpf" disabled />
                            </div>
                            <div>
                                <label htmlFor="rg">RG</label>
                                <input id="rg" disabled />
                            </div>
                        </div>
                        <div className="documents-card-2">
                            <div>
                                <label htmlFor="estado-civil">Est. Civil</label>
                                <input id="estado-civil" disabled />
                            </div>
                            <div>
                                <label htmlFor="nascimento">Nasc.</label>
                                <input id="nascimento" disabled />
                            </div>
                        </div>

                        <div className="footer-card">
                            <img src={user} alt="user" />
                            <div>
                                <input id="batismo" disabled />
                                <h2>Vicente Viana Barreto - Pastor Presidente</h2>
                                <span>CGADB nº034673 - CONADEC nº 461</span>
                            </div>
                            <img src={user} alt="user" />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}