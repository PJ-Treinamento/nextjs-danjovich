import styled from 'styled-components';

export const StyledInput = styled.input`
    min-width: 80%;
    font-size: 16px;
    background: ${({ theme }) => theme.colors.transparentGray};
    padding: 3% 2%;
    border: 1px solid ${({ theme }) => theme.colors.frameStroke};
    border-radius: 4px;

    ::placeholder {
        color: ${({ theme }) => theme.colors.lightGray};
    }

    :focus {
        outline: none;
    }
`