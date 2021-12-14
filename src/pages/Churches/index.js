import React from "react";
import { Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel, } from 'react-accessible-accordion'
import { Link } from "react-router-dom";
import { FaUserPlus, FaPrint } from 'react-icons/fa'

import './style.css'

export default function Churches(){
    return(
        <div className="container-churches">
            <div className="buttons-churches">
                <button>Buscar Todas</button>
                <button>Buscar Todas e Membros</button>
                <Link to='/users'><FaUserPlus size={30} color='#1B8D19' /> </Link>
            </div>

            <Accordion allowZeroExpanded >
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>Itapebussu</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <Link to='/'><FaPrint size={20} color='#000' /></Link>
                        <ul>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                            <li>Arroz Muito melhor cozido qufm,dnf nfhfdhhsdf hfhdsfdsh hfgdsgfsdgf hfghsdgfsgdff fhsdfhdsfhs hfhsfh</li>
                        </ul>
                    </AccordionItemPanel>
                </AccordionItem>
               
            </Accordion>
        </div>
    )
}