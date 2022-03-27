import React, { useState, useRef, useCallback } from "react";
import { FaSearch, FaPrint, FaUserPlus, FaEdit, FaTrash, FaTimes, FaEnvelopeOpenText, FaEnvelope  } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import { useReactToPrint } from 'react-to-print'


import './style.css'

import api from '../../../services/api'

import UsersPrint from "../UsersPrint";
import MudancaPrint from '../../Cartas/Mudanca'

Modal.setAppElement("#root");

export default function Users() {

    const [cpf, setCpf] = useState('')
    const [incidents, setIncidents] = useState([])
    const [incidentToPrint, setIncidentToPrint] = useState([])

    //modal constantes
    const [nome, setNome] = useState('');
    const [cpfNew, setCpfNew] = useState('');
    const [rg, setRg] = useState('');
    const [filiacao, setFiliacao] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [data_batismo, setData_batismo] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf] = useState('CE');
    const [congregacao, setCongregacao] = useState('');
    const [funcao, setFuncao] = useState('');
    const [estado_civil, setEstado_civil] = useState('')
    const [imagem, setImagem] = useState('')
    const [newImage, setNewImage] = useState('')
    const [key, setKey] = useState('')
    const [id, setId] = useState('')
    const [status, setStatus] = useState('')
    const [type, setType] = useState('')

    const [isOpen, setIsOpen] = useState(false);

    //Início configuração para o print da tela
    const componentRef = useRef();
    const componentMudanca = useRef();

    const reactToPrintMudanca = useCallback(() => {
        return componentMudanca.current;
    },[])

    const handlePrintMudanca = useReactToPrint({
        content: reactToPrintMudanca,
        documentTitle: "Carta de Mudança",
        removeAfterPrint: true,
    });
    
    const reactToPrintRecomendacao = useCallback(() => {
        return componentMudanca.current;
    },[])

    const handlePrintRecomendacao = useReactToPrint({
        content: reactToPrintRecomendacao,
        documentTitle: "Carta de Recomendação",
        removeAfterPrint: true,
    });

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "Listagem - Todos os Membros",
        removeAfterPrint: true,
    });


    //Fim da configuração do Print da tela

    async function handleSearch() {
        if (cpf === '') {
            return
        }

        try {
            await api.get(`user/${cpf}`)
                .then(response => {
                    setIncidents(response.data)
                })
            setCpf('')
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSearchAll() {
        try {
            api.get(`user`)
                .then(response => {
                    setIncidents(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSearchActives() {
        try {
            api.get('user/active')
                .then(response => {
                    setIncidents(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSearchInactives() {
        try {
            api.get('user/inactive')
                .then(response => {
                    setIncidents(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete(id, key) {

        try {
            await api.delete(`user/${id}/${key}`)

            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (error) {
            console.log(error)
        }

    }

    function closeModal() {
        setNewImage('');
        setIsOpen(!isOpen)

    }

    async function PrintMudanca(id){
        setType('Mudança');
        try {
            await api.get(`user/id/${id}`)
                .then(response => {
                    setIncidentToPrint(response.data)
                })

            
        } catch (error) {
            alert(error)
        }

        handlePrintMudanca();
        setType('');
    }
    async function PrintRecomendacao(id){
        setType('Recomendação')
        try {
            await api.get(`user/id/${id}`)
                .then(response => {
                    setIncidentToPrint(response.data)
                })

            
        } catch (error) {
            alert(error)
        }

        handlePrintRecomendacao();
        setType('');
    }


    async function openModal(id) {
        setIsOpen(!isOpen)



        try {
            await api.get(`user/id/${id}`)
                .then(response => {

                    setNome(response.data.nome)
                    setCpfNew(response.data.cpf)
                    setRg(response.data.rg)
                    setFiliacao(response.data.filiacao)
                    setEmail(response.data.email)
                    setTelefone(response.data.telefone)
                    setEndereco(response.data.endereco)
                    setNumero(response.data.numero)
                    setBairro(response.data.bairro)
                    setCidade(response.data.cidade)
                    setCongregacao(response.data.congregacao)
                    setFuncao(response.data.funcao)
                    setImagem(response.data.url)
                    setKey(response.data.key)
                    setEstado_civil(response.data.estado_civil)
                    setId(response.data.id)
                    setData_batismo(response.data.ano_batismo + '-' + response.data.mes_batismo + '-' + response.data.dia_batismo)
                    setData_nascimento(response.data.ano_nascimento + '-' + response.data.mes_nascimento + '-' + response.data.dia_nascimento)
                    setStatus((response.data.status).toString())

                })
        } catch (error) {
            console.log(error.response)
        }
    }

    function handlePrintCard(cpf) {
        localStorage.setItem('userCPF', cpf);
        window.open('/printCard')
    }

    async function handleEditUser(id, key) {
        const dataImage = new FormData();

        dataImage.append('file', newImage)
        
        const data = {
            nome,
            cpfNew,
            rg,
            filiacao,
            data_nascimento,
            data_batismo,
            email,
            telefone,
            endereco,
            numero,
            bairro,
            cidade,
            uf,
            congregacao,
            funcao,
            estado_civil,
            status: (status === 'true' ? true : false)
        }

        if (newImage) {

            if (newImage.type !== 'image/jpeg' && newImage.type !== 'image/jpg' && newImage.type !== 'image/png') {
                alert("Formato de foto não permitido. Formatos aceitos: image.jpeg, image.jpg, image.png");
                return;
            }

            if (newImage.size > (2 * 1024 * 1024)) {
                alert("Foto maior que 2 megas")
                return;
            } else {
                
                try {
                    await api.put(`user/${id}/${key}`, data)
                    await api.delete(`delete/image/${id}/${key}`)
                    await api.put(`update/image/${id}`, dataImage)

                } catch (error) {
                    alert(error)
                }
            }
        } 
        
        if(!newImage){
            
            
            try {
                await api.put(`user/${id}/${key}`, data)
            } catch (error) {
                alert(error)
            }
        }

        closeModal()
        setIncidents([])
    }

    return (

        <div className="container-users">
            <div style={{ display: 'none' }}>
                <UsersPrint object={incidents} congregacao={'Todas as congregações'} ref={componentRef} />
                <MudancaPrint object={incidentToPrint} titulo={type} ref={componentMudanca} />
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className='modal'
                contentLabel='Editar Usuário'
            >
                <div className='container-cadastro' >
                    <form>
                        <div className="section-head">
                            <div className='container-box-preview'>
                                {!newImage ? <img src={imagem} alt='imagem' /> : <img src={URL.createObjectURL(newImage)} alt='imagem' />}

                                <label htmlFor='file'  >Alterar foto</label>
                                <input
                                    type='file'
                                    id='file'
                                    name='file'
                                    accept='image/*'
                                    onChange={e => setNewImage(e.target.files[0])}
                                    required
                                />
                            </div>
                            <div>
                                <div className="section">

                                    <input
                                        id='nome'
                                        type='text'
                                        placeholder='Nome Completo'
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        required
                                    />

                                    <InputMask
                                        id="cpf"
                                        mask='999.999.999-99'
                                        placeholder='000.000.000-00'
                                        value={cpfNew}
                                        onChange={e => setCpfNew(e.target.value)}
                                        required
                                    />

                                    <input
                                        id='rg'
                                        type='phone'
                                        placeholder='0000000000-0'
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="section">

                                    <input
                                        id='mae'
                                        type='text'
                                        placeholder='Nome da mãe completo'
                                        value={filiacao}
                                        onChange={e => setFiliacao(e.target.value)}
                                        required
                                    />

                                    <input
                                        id='nascimento'
                                        type='date'
                                        value={data_nascimento}
                                        onChange={e => setData_nascimento(e.target.value)}
                                        required
                                    />

                                    <input
                                        id='batismo'
                                        type='date'
                                        value={data_batismo}
                                        onChange={e => setData_batismo(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        id='email'
                                        type='email'
                                        placeholder='seunome@provedor.com'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <InputMask
                                        mask='(99) 99999-9999'
                                        id='telefone'
                                        type='tel'
                                        placeholder='(85) 98888-0000'
                                        value={telefone}
                                        onChange={e => setTelefone(e.target.value)}
                                        required
                                    />
                                    <select
                                        id='estado_civil'
                                        value={estado_civil}
                                        onChange={e => setEstado_civil(e.target.value)}
                                        required
                                        className='estado_civil'
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
                                    <input
                                        id='endereco'
                                        type='text'
                                        placeholder='Ex: Rua Alameda dos Anjos'
                                        value={endereco}
                                        onChange={e => setEndereco(e.target.value)}
                                        required
                                    />
                                    <input
                                        id='numero'
                                        type='number'
                                        placeholder='102'
                                        min='0'
                                        value={numero}
                                        onChange={e => setNumero(e.target.value)}
                                        required
                                    />
                                    <input
                                        id='bairro'
                                        type='text'
                                        placeholder='Ex: Areais, Altos, etc'
                                        value={bairro}
                                        onChange={e => setBairro(e.target.value)}
                                        required
                                    />
                                    <select
                                        id='cidade'
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                        required
                                    >
                                        <option value=""></option>
                                        <option value="amanari">Amanari</option>
                                        <option value="itapebussu">Itapebussu</option>
                                        <option value="são joão do amanari">São João do Amanari</option>
                                        <option value="manoel guedes">Manoel Guedes</option>
                                        <option value="penedo">Penedo</option>
                                        <option value="jardim">Jardim</option>
                                        <option value="jardim">Monte Horebe</option>
                                    </select>
                                    <input id='uf' type='text' value={uf} disabled />
                                </div>

                                <div>
                                    <select
                                        id='congregacao'
                                        value={congregacao}
                                        onChange={e => setCongregacao(e.target.value)}
                                        required
                                    >
                                        <option value=""></option>
                                        <optgroup label='Setor I' >
                                            <option value='Penedo'>Penedo</option>
                                            <option value='Passagem Franca'>Passagem Franca</option>
                                            <option value='Jardim de Dentro'>Jardim de Dentro</option>
                                            <option value='Jardim de Fora'>Jardim de Fora</option>
                                            <option value='Monte Horebe'>Monte Horebe</option>
                                        </optgroup>
                                        <optgroup label='Setor II' >
                                            <option value="Itapebussu">Itapebussu</option>
                                            <option value="Novo Itapebussu">Novo Itapebussu</option>
                                            <option value="Altos Itapebussu">Altos Itapebussu</option>
                                            <option value="Sede">Sede</option>
                                            <option value="Residencial">Residencial</option>
                                            <option value="Rua dos Professores">Rua dos Professores</option>
                                            <option value="Vassouras">Vassouras</option>
                                            <option value="Recanto">Recanto</option>
                                            <option value="Alto dos Pereiras">Ato dos Pereiras</option>
                                            <option value="São João do Amanari">São João do Amanari</option>
                                        </optgroup>
                                        <optgroup label='Setor III' >
                                            <option value="Agrovila">Agrovila</option>
                                            <option value="Jordão">Jordão</option>
                                            <option value="Riacho da Palha">Riacho da Palha</option>
                                            <option value="Monte Hebrom">Monte Hebrom</option>
                                        </optgroup>

                                    </select>
                                    <select
                                        id='funcao'
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

                                    <select
                                        id="status"
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}
                                        required
                                    >
                                        <option value={true}>Ativo</option>
                                        <option value={false}>Inativo</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="buttons">
                            <button type='button' onClick={closeModal} >cancelar</button>
                            <button type='button' onClick={() => handleEditUser(id, key)} >Salvar</button>
                            <button type='button' onClick={closeModal}><FaTimes size={20} color='#c4c4c4' /></button>
                        </div>

                    </form>
                </div>
            </Modal>
            <div className="box-users">

                <form>
                    <InputMask mask='999.999.999-99' placeholder="CPF" type='text' value={cpf} onChange={e => setCpf(e.target.value)} />
                    <button type='button' onClick={handleSearch}>
                        <FaSearch size={20} color='#FFF' />
                    </button>
                </form>

                <div className="box-users-buttons">
                    <button type='button' onClick={handleSearchAll} >Buscar Todos</button>
                    <button type='button' onClick={handleSearchActives} >Buscar Ativos</button>
                    <button type='button' onClick={handleSearchInactives} >Buscar Inativos</button>
                </div>
                <div>
                    <button className="button-print" onClick={handlePrint} > <FaPrint size={30} color='#000' /> </button>
                    <a href="https://cadastro-cartao-membro.herokuapp.com/" target='_blank' rel="noreferrer"><FaUserPlus size={30} color='#1B8D19' /></a>
                </div>


            </div>

            <div className="box-body">

                {
                    incidents.map(incidents => (
                        <div className="box-incidents" key={incidents.id}>
                            <a href={incidents.url} target='_blank' rel="noreferrer">
                                <img src={incidents.url} alt='imagem' />
                            </a>

                            <div>
                                <span>{incidents.nome}</span>
                                <span>CPF: {incidents.cpf}</span>
                                <span> {incidents.endereco},  {incidents.numero}, {incidents.cidade} </span>
                            </div>
                            <div>
                                <span>{incidents.telefone}</span>
                                <span>Congragegação {incidents.congregacao}</span>
                                <span>{incidents.email}</span>
                            </div>
                            <div>
                                <button className="button-print" onClick={() => PrintMudanca(incidents.id)} >CM<FaEnvelope size={20} color='#337ED4'/> </button>
                                <button className="button-print" onClick={() => PrintRecomendacao(incidents.id)} >CR <FaEnvelopeOpenText size={20} color='#1b8d19'/></button>
                                <button className="button-print" onClick={() => handlePrintCard(incidents.cpf)} ><FaPrint size={20} color='#000' /></button>
                                <button className="button-print" onClick={() => openModal(incidents.id)}><FaEdit size={20} color='#E78124' /></button>
                                <button className="button-print" onClick={() => handleDelete(incidents.id, incidents.key)} ><FaTrash size={20} color='#E70404' /></button>
                            </div>
                        </div>
                    ))
                }



            </div>
        </div>
    )
}