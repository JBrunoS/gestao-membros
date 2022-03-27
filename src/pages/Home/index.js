import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './style.css'
import api from '../../services/api'

export default function Home() {
    const [userCounted, setUserCounted] = useState('')
    const [churcheCounted, setChurcheCounted] = useState('')
    const [cityCounted, setCityCounted] = useState('')

    const navigate = useNavigate();

    async function getCountUsers() {
        await api.get('count/users')
            .then(response => {
                setUserCounted(response.data[0].count)
            })
    }
    async function getCountChurches() {
        await api.get('count/churches')
            .then(response => {
                setChurcheCounted(response.data.length)

            })
    }
    async function getCountCities() {
        await api.get('count/cities')
            .then(response => {
                setCityCounted(response.data.length)
            })
    }
    
    useEffect(() => {
        if (!localStorage.getItem('user_logged')) {

            navigate('/login')
        }
    }, [])


    useEffect(() => {
        getCountUsers();
    }, [userCounted])

    useEffect(() => {
        getCountChurches();
    }, [churcheCounted])

    useEffect(() => {
        getCountCities();
    }, [cityCounted])

    return (
        <div className="container-home">
            <div>
                <span>Membros</span>
                <span>{userCounted}</span>
            </div>
            <div>
                <span>Congregações</span>
                <span>{churcheCounted}</span>
            </div>
            <div>
                <span>Cidades do Campo</span>
                <span>{cityCounted}</span>
            </div>
        </div>
    )
}