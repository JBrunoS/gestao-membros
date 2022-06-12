import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReactToPrint } from 'react-to-print'

import './style.css'

import MudancaPrint from '../Cartas/Mudanca'

export default function NaoCadastrados() {

    const [carta, setCarta] = useState('')
    const [nome, setNome] = useState('')
    const [sexo, setSexo] = useState('')
    const [estadoCivil, setEstadoCivil] = useState('')
    const [funcao, setFuncao] = useState('')
    const [data_nascimento, setData_nascimento] = useState('')
    const [data_batismo, setData_batismo] = useState('')
    const [incidents, setIncidents] = useState([])


    const componentMudanca = useRef();

    const reactToPrintMudanca = useCallback(() => {
        return componentMudanca.current;
    }, [])

    const handlePrintMudanca = useReactToPrint({
        content: reactToPrintMudanca,
        documentTitle: `Carta de ${carta}`,
        removeAfterPrint: true,
    });
    
    function handleFormatData(){
        let ano_nascimento = data_nascimento.slice(0, 4)
        let mes_nascimento = data_nascimento.slice(5, 7)
        let dia_nascimento = data_nascimento.slice(8)

        let ano_batismo = data_batismo.slice(0, 4)
        let mes_batismo = data_batismo.slice(5, 7)
        let dia_batismo = data_batismo.slice(8)

        setIncidents(JSON.parse(JSON.stringify({
            "nome": nome,
            "sexo": sexo,
            "funcao": funcao,
            "estado_civil": estadoCivil,
            "dia_nascimento": dia_nascimento,
            "mes_nascimento": mes_nascimento,
            "ano_nascimento": ano_nascimento,
            "dia_batismo": dia_batismo,
            "mes_batismo": mes_batismo,
            "ano_batismo": ano_batismo
        })))

    }
    function handleGerarCarta(e) {
        e.preventDefault()
        
        handleFormatData()
        
        handlePrintMudanca()
    }
    

    return (

        <div className="container-novas-cartas">
            <div style={{ display: 'none' }}>

                <MudancaPrint object={incidents} titulo={carta} ref={componentMudanca} />
            </div>
            <form onSubmit={handleGerarCarta}>
                <label>Motivo da Carta</label>
                <select
                    value={carta}
                    onChange={e => setCarta(e.target.value)}
                    required
                >
                    <option value=''></option>
                    <option value='Mudança'>Mudança</option>
                    <option value='Recomendação'>Recomendação</option>
                </select>

                <label>Nome</label>
                <input
                    placeholder="Nome completo"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />

                <div>
                    <div>
                        <label>Sexo</label>
                        <select
                            value={sexo}
                            onChange={e => setSexo(e.target.value)}
                            required
                        >
                            <option value=''></option>
                            <option value='Masculino'>Masculino</option>
                            <option value='Feminino'>Feminino</option>
                        </select>
                    </div>
                    <div>
                        <label>Estado Civil</label>
                        <select
                            value={estadoCivil}
                            onChange={e => setEstadoCivil(e.target.value)}
                            required
                        >
                            <option value=''></option>
                            <option value='Solteiro'>Solteiro</option>
                            <option value='Casado'>Casado</option>
                            <option value='Separado'>Separado</option>
                            <option value='Divorciado'>Divorciado</option>
                            <option value='Viúvo'>Viúvo</option>
                        </select>
                    </div>
                    <div>
                        <label>Função</label>
                        <select
                            value={funcao}
                            onChange={e => setFuncao(e.target.value)}
                            required
                        >
                            <option value=''></option>
                            <option value='Membro'>Membro</option>
                            <option value='Auxiliar'>Auxiliar</option>
                            <option value='Diácono'>Diácono</option>
                            <option value='Presbítero'>Presbítero</option>
                            <option value='Supervisor de Congregação'>Supervisor de Congregação</option>
                            <option value='Evangelista'>Evangelista</option>
                            <option value='Pastor'>Pastor</option>
                        </select>
                    </div>
                </div>

                <div className="datas">
                    <div>
                        <label>Data de Nascimento</label>
                        <input
                            type='date'
                            value={data_nascimento}
                            onChange={e => setData_nascimento(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Data de Batismo</label>
                        <input
                            type='date'
                            value={data_batismo}
                            onChange={e => setData_batismo(e.target.value)}
                            required
                        />

                    </div>
                </div>

                <button onClick={handleFormatData}>Gerar Carta</button>
            </form>
        </div>
    )
}