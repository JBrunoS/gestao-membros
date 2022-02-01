import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, Pie, PieChart, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'


import './style.css'
import api from '../../services/api'

export default function Reports() {
    const date = new Date().getFullYear();

    const [churches, setChurches] = useState([])
    const [churche, setChurche] = useState('')
    const [ano, setAno] = useState(date)

    const data = [
        { name: 'Jan', membros: 400,  },
        { name: 'Fev', membros: 300,  },
        { name: 'Mar', membros: 200, },
        { name: 'Abr', membros: 120, },
        { name: 'Mai', membros: 80,  },
        { name: 'Jun', membros: 255, },
        { name: 'Jul', membros: 255, },
        { name: 'Ago', membros: 255, },
        { name: 'Set', membros: 255, },
        { name: 'Out', membros: 255, },
        { name: 'Nov', membros: 255, },
        { name: 'Dez', membros: 555, }
    ]

    const faixaEtaria = [
        { name: 'Crianças', qtd: 400 },
        { name: 'Jovens', qtd: 200 },
        { name: 'Adultos', qtd: 120 },
        { name: 'Idosos', qtd: 80 },
    ]

    const sexo = [
        { name: 'Feminino', qtd: 400 },
        { name: 'Masculino', qtd: 300 },
    ]
    const criancas = [
        { name: 'Feminino', qtd: 80 },
        { name: 'Masculino', qtd: 60 },
    ]
    const jovens = [
        { name: 'Feminino', qtd: 10 },
        { name: 'Masculino', qtd: 14 },
    ]
    const adultos = [
        { name: 'Feminino', qtd: 75 },
        { name: 'Masculino', qtd: 66 },
    ]
    const idosos = [
        { name: 'Feminino', qtd: 10 },
        { name: 'Masculino', qtd: 12 },
    ]
    const estadoCivil = [
        { name: 'Solteiros', qtd: 40 },
        { name: 'Casados', qtd: 73 },
    ]



    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    async function handleCount() {
        try {
            await api.get('count/churches')
                .then(response => {
                    setChurches(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCount();
    }, [])
    return (
        <div className='container-reports'>
            <div>
                <select
                    value={churche}
                    onChange={e => setChurche(e.target.value)}
                >
                    <option value=''></option>
                    {churches.map((churches, index) => (
                        <option key={index} value={churches.congregacao}>{churches.congregacao}</option>
                    ))}
                </select>

                <select
                    value={ano}
                    onChange={e => setAno(e.target.value)}
                >
                    <option value=''></option>
                    <option value={date - 3}>{date - 3}</option>
                    <option value={date - 2}>{date - 2}</option>
                    <option value={date - 1}>{date - 1}</option>
                    <option value={date}>{date}</option>
                    <option value={date + 1}>{date + 1}</option>
                    <option value={date + 2}>{date + 2}</option>
                    <option value={date + 3}>{date + 3}</option>
                </select>

                <button type='button'>Gerar Relatório</button>
                <button type='button'> Imprimir</button>
            </div>
            <div className='reports'>
                <label>Membros por mês - {ano}</label>
                <ResponsiveContainer width='110%' height='90%' >
                    <BarChart
                        data={data}
                        margin={{
                            top: 15,
                            right: 35,
                            left: 10,
                            bottom: 2
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip wrapperClassName='tooltip' />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="membros" fill="#8884d8"  />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='reports-pie'>
                <div>
                    <label>Sexo</label>
                    <ResponsiveContainer width='90%' height='90%'>
                        <PieChart width={800} height={400}>
                            <Legend

                                iconSize={5}

                                height={8}
                                layout='horizontal'
                                verticalAlign='bottom'
                                align='center'
                                margin={{
                                    top: 100,
                                }}

                            />

                            <Tooltip wrapperClassName='tooltip' />
                            <Pie
                                data={sexo}

                                innerRadius={70}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="qtd"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <label>Faixa Etária</label>
                    <ResponsiveContainer width='90%' height='90%'>
                        <PieChart width={800} height={400}>
                            <Legend

                                iconSize={5}

                                height={8}
                                layout='horizontal'
                                verticalAlign='bottom'
                                align='center'
                                margin={{
                                    top: 100,
                                }}

                            />

                            <Tooltip wrapperClassName='tooltip' />
                            <Pie
                                data={faixaEtaria}

                                innerRadius={70}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="qtd"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            <div className='reports-pie'>
                <div>
                    <label>0 - 12 anos</label>
                    <ResponsiveContainer width='90%' height='90%'>
                        <PieChart width={800} height={400}>
                            <Legend

                                iconSize={5}

                                height={8}
                                layout='horizontal'
                                verticalAlign='bottom'
                                align='center'
                                margin={{
                                    top: 100,
                                }}

                            />

                            <Tooltip wrapperClassName='tooltip' />
                            <Pie
                                data={criancas}

                                innerRadius={70}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="qtd"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <label>12 - 18 anos</label>
                    <ResponsiveContainer width='90%' height='90%'>
                        <PieChart width={800} height={400}>
                            <Legend

                                iconSize={5}

                                height={8}
                                layout='horizontal'
                                verticalAlign='bottom'
                                align='center'
                                margin={{
                                    top: 100,
                                }}

                            />

                            <Tooltip wrapperClassName='tooltip' />
                            <Pie
                                data={jovens}

                                innerRadius={70}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="qtd"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
            <div className='reports-pie'>
                <div>
                    <label>18 - 59 anos</label>
                    <ResponsiveContainer width='90%' height='90%'>
                        <PieChart width={800} height={400}>
                            <Legend

                                iconSize={5}

                                height={8}
                                layout='horizontal'
                                verticalAlign='bottom'
                                align='center'
                                margin={{
                                    top: 100,
                                }}

                            />

                            <Tooltip wrapperClassName='tooltip' />
                            <Pie
                                data={adultos}

                                innerRadius={70}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="qtd"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <label>60 + anos</label>
                    <ResponsiveContainer width='90%' height='90%'>
                        <PieChart width={800} height={400}>
                            <Legend

                                iconSize={5}

                                height={8}
                                layout='horizontal'
                                verticalAlign='bottom'
                                align='center'
                                margin={{
                                    top: 100,
                                }}

                            />

                            <Tooltip wrapperClassName='tooltip' />
                            <Pie
                                data={idosos}

                                innerRadius={70}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="qtd"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
            <div className='reports-pie'>
                <div>
                    <label>Estado Civil</label>
                    <ResponsiveContainer width='90%' height='90%'>
                        <PieChart width={800} height={400}>
                            <Legend

                                iconSize={5}

                                height={8}
                                layout='horizontal'
                                verticalAlign='bottom'
                                align='center'
                                margin={{
                                    top: 100,
                                }}

                            />

                            <Tooltip wrapperClassName='tooltip' />
                            <Pie
                                data={estadoCivil}

                                innerRadius={70}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="qtd"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}