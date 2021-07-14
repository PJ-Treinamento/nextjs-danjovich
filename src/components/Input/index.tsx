import React, { InputHTMLAttributes } from 'react';
import { StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
    return (
            <StyledInput type="text" id={name} {...rest} />
    )
}

export default Input;