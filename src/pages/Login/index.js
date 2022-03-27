import React, { useState } from 'react'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

import './style.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const data = { email, senha };

        try {
           await api.post('/admin', data)
                .then(response => {
                    localStorage.setItem('user_logged', response.data)

                    if (response.data.length > 0) {
                        navigate('/')
                    }

                    if (response.data.length === 0) {
                        alert("Usuário não encontrado!")
                        return
                    }

                    setEmail('')
                    setSenha('')
                })
        } catch (error) {
            alert(error)
        }

    }

    return (
        <di className='login'>
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='E-mail'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Senha'
                    required
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button>Entrar</button>
            </form>
        </di>
    )
}