import React from 'react';
import PiuTag, { Piu } from '../Piu';
import { PiusList } from './styles';

interface PiusProps {
    pius: Piu[]
}

const Pius: React.FC<PiusProps> = ({ pius }) => {
    return (
        <PiusList>
            {pius.map((piu: Piu) => {
                return <PiuTag key={piu.id} piu={piu} />
            })}
        </PiusList>
    );
}

export default Pius;