import React from 'react';
import Link from 'next/link';

import logoImage from '../../assets/images/piupiuwer.png';

import { StyledDiv } from './styles';

interface LogoProps {
    to: string
}

const Logo: React.FC<LogoProps> = ({to}) => {
    return (
        <Link href={to}>
            <StyledDiv>
                <img src={logoImage.src} alt="PiuPiuwer" />
                <h1>PiuPiuwer</h1>
            </StyledDiv>
        </Link>
    )
}

export default Logo;