import React from 'react'

import './style.css'
import LogoAD from '../../../assets/logo.png'


const UsersPrint = React.forwardRef(function UsersPrint(props, ref) {

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = dia + '/' + mes + '/' + ano;

    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    const milisegundos = data.getMilliseconds();

    const horaAtual = hora + ':' + minutos + ":" + segundos + ':' + milisegundos

    return (
        <div ref={ref} className='print'>
            <div>
                <img src={LogoAD} alt='Logo Assembleia de Deus' />
                <span>Assembleia de Deus - Campo do Amanari</span>
                <span>Relação de todos os membros - {props.congregacao} </span>
                <span>{horaAtual}</span>
                <span>{dataAtual}</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>Sexo</th>
                        <th>Filiação</th>
                        <th>Nascimento</th>
                        <th>Batismo</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Número</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Congregação</th>
                        <th>Função</th>
                        <th>Estado Civil</th>
                    </tr>

                </thead>
                <tbody>

                    {props.object.map(incidents => (
                        <tr key={incidents.id}>
                            <td>{incidents.nome}</td>
                            <td>{incidents.cpf}</td>
                            <td>{incidents.rg}</td>
                            <td>{incidents.sexo.slice(0, 1)}</td>
                            <td>{incidents.filiacao}</td>
                            <td>{incidents.dia_nascimento + '/' + incidents.mes_nascimento + '/' + incidents.ano_nascimento}</td>
                            <td>{incidents.dia_batismo + '/' + incidents.mes_batismo + '/' + incidents.ano_batismo}</td>
                            <td>{incidents.email}</td>
                            <td>{incidents.telefone}</td>
                            <td>{incidents.endereco}</td>
                            <td>{incidents.numero}</td>
                            <td>{incidents.bairro}</td>
                            <td>{incidents.cidade}</td>
                            <td>{incidents.uf}</td>
                            <td>{incidents.congregacao}</td>
                            <td>{incidents.funcao}</td>
                            <td>{incidents.estado_civil}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
})

export default UsersPrint