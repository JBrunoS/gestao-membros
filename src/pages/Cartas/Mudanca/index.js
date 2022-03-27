import React from 'react'

import './style.css'
import logoAD from '../../../assets/logo.png'


const UsersPrint = React.forwardRef(function MudancaPrint(props, ref) {

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()).padStart(2, '0');
    const ano = data.getFullYear();

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return (
        <div ref={ref} className='print-mudanca'>
            <div className='header-mudanca'>
                <div>
                    <img src={logoAD} alt='logo AD' />
                </div>
                <div>
                    <h1>Igreja Evangélica Assembleia de Deus <br /> Templo Central</h1>
                    <h2>Rua Raimundo Firmino, 000</h2>
                    <h2>Amanari - Maranguape - Ceará</h2>
                </div>
            </div>

            <div className='body-mudanca' >
                <h1>Carta de {props.titulo}</h1>
                <div>
                    <div className='title-mudanca'>
                        <p>
                            Apresentamos à igreja:
                        </p>
                        <span className='igreja-mudanca' ></span>
                    </div>

                    <span className='igreja-mudanca-second'></span>
                    <p>O portador da presente carta de <span>{props.titulo}</span> .</p>
                    <div>
                        <p>Nome:
                            <span>{props.object.nome}</span>
                        </p>
                        <p>Sexo:
                            <span>{props.object.sexo}</span>
                        </p>
                    </div>
                    <div>
                        <p>Data de Nascimento:
                            <span>{props.object.dia_nascimento + '/' + props.object.mes_nascimento + '/' + props.object.ano_nascimento}</span>
                        </p>
                        <p>Estado Civil:
                            <span>{props.object.estado_civil}</span>
                        </p>
                    </div>

                    <div>
                        <p>Data de Batismo:
                            <span>{props.object.dia_batismo + '/' + props.object.mes_batismo + '/' + props.object.ano_batismo}</span>
                        </p>
                        <p> Cargo que exercia:
                            <span>{props.object.funcao}</span>
                        </p>
                    </div>


                    <p>O qual se acha no gozo da perfeita  comunhão com esta igreja e servia com muito bom trabalho.</p>
                    <p>Portanto nós recomendamos para que o recebais no Senhor como usam fazer os santos.</p>


                    <p>Fraternalmente em Cristo,</p>

                    <div className='data-mudanca'>
                        <p>Amanari, Maranguape - CE, {dia} de {meses[parseInt(mes)]} de {ano}</p>
                    </div>


                    <div className='assinatura-mudanca'>
                        <p>Pastor</p>
                    </div>
                </div>
            </div>

            <div className='footer-mudanca' >

                <p>Essa Carta deve ser apresentada à Igreja destinatária e entregue a sua secretaria dentro do prazo de (30) trinta dias a contar da data de sua emissão.</p>
            </div>



        </div>
    )
})

export default UsersPrint