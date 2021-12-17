import React, { useState } from "react";
import { FaSearch, FaPrint, FaUserPlus, FaUserAlt, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'

import './style.css'

import api from '../../../services/api'
import UserLogin from '../../../assets/user.png'


export default function Users() {
    const [cpf, setCpf] = useState('')
    const [incidents, setIncidents] = useState([])

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

    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const dataImage = new FormData();

        dataImage.append('file', imagem)

        const data = {
            nome,
            cpf,
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
        }

        try {
            if (nome === '' || cpf === '' || rg === '' || filiacao === '' ||
                data_nascimento === '' || data_batismo === '' || email === '' ||
                telefone === '' || endereco === '' || numero === '' || bairro === '' ||
                cidade === '' || uf === '' || congregacao === '' || funcao === '' || imagem === '') {

                alert('Todos os campos são necessários');

            } else {

                await api.post('user', data)
                    .then(response => {
                        console.log(response.status)
                        if (response.status === 204) {

                            api.get(`user/specific/${cpf}`)
                                .then(response => {
                                    api.post(`user/${response.data.id}`, dataImage)
                                })

                            alert("Cadastro Realizado com sucesso!");


                        } else {

                            alert('Já existe alguém cadastrado com esse CPF e/ou RG');
                        }
                    })
            }
            setNome('')
            setCpfNew('')
            setRg('')
            setFiliacao('')
            setData_nascimento('')
            setData_batismo('')
            setEmail('')
            setTelefone('')
            setEndereco('')
            setNumero('')
            setBairro('')
            setCidade('')
            setCongregacao('')
            setFuncao('')
            setImagem('')
            setEstado_civil('')

        } catch (error) {
            console.log(error.response)
        }
    }

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

    async function handleDelete(id, key) {

        
        try {
            await api.delete(`user/${id}/${key}`)
            .then(response =>{
                console.log(response.data)
                setIncidents(incidents.filter(incident => incident.id !== id))
            })

        } catch (error) {
            console.log(error)
        }

    }

    function closeModal() {
        setIsOpen(!isOpen)
    }

    async function openModal(id) {
        console.log(process.env.PATH)
        setIsOpen(!isOpen)

        try {
            await api.get(`user/id/${id}`)
                .then(response => {
                    console.log(response.data)

                    setNome(response.data.nome)
                    setCpfNew(response.data.cpf)
                    setRg(response.data.rg)
                    setFiliacao(response.data.filiacao)
                    setData_nascimento(response.data.data_nascimento)
                    setData_batismo(response.data.data_batismo)
                    setEmail(response.data.email)
                    setTelefone(response.data.telefone)
                    setEndereco(response.data.endereco)
                    setNumero(response.data.numero)
                    setBairro(response.data.bairro)
                    setCidade(response.data.cidade)
                    setCongregacao(response.data.congregacao)
                    setFuncao(response.data.funcao)
                    setImagem(response.data.key)
                    setEstado_civil(response.data.estado_civil)
                })
        } catch (error) {
            console.log(error.response)
        }

    }
    return (

        <div className="container-users">
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className='modal'
                contentLabel='Editar Usuário'
            >
                <div className='container-cadastro' >
                    <form onSubmit={handleSubmit}>
                        <div className="section-head">
                            <div className='container-box-preview'>
                                {<img></img> || <img></img>}
                                <img src={process.env.REACT_APP_API_URL + '/files/' + imagem} alt='imagem' />
                                <label htmlFor='file' >Escolher foto</label>
                                <input
                                    type='file'
                                    id='file'
                                    name='file'
                                    accept='image/*'
                                    onChange={e => setImagem(e.target.files[0])}
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
                                        <option value='Congregado'>Congregado</option>
                                        <option value='Membro'>Membro</option>
                                        <option value='Auxiliar'>Auxiliar</option>
                                        <option value='Diácono'>Diácono</option>
                                        <option value='Presbítero'>Presbítero</option>
                                        <option value='Pastor'>Pastor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="buttons">
                            <button type='button' onClick={closeModal} >cancelar</button>
                            <button type='button'>Salvar</button>
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
                <div>
                    <button type='button' onClick={handleSearchAll} >Buscar Todos</button>
                </div>
                <div>
                    <a href="#"><FaPrint size={30} color='#000' /></a>
                    <a href="http://localhost:3000/" target='_blank' rel="noreferrer"><FaUserPlus size={30} color='#1B8D19' /></a>
                </div>
            </div>

            <div className="box-body">

                {
                    incidents.map(incidents => (
                        <div className="box-incidents" key={incidents.id}>
                            <a href={process.env.REACT_APP_API_URL + '/files/' + incidents.key} target='_blank' rel="noreferrer">
                                <img src={process.env.REACT_APP_API_URL + '/files/' + incidents.key} alt='imagem' />
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
                                <a><FaPrint size={20} color='#000' /></a>
                                <a onClick={() => openModal(incidents.id)}><FaEdit size={20} color='#E78124' /></a>
                                <a onClick={() => handleDelete(incidents.id, incidents.key) } ><FaTrash size={20} color='#E70404' /></a>
                            </div>
                        </div>
                    ))
                }



            </div>
        </div>
    )
}