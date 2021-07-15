import styled from 'styled-components';

export const PageDiv = styled.div`
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const FrameDiv = styled.div`
    background: ${({ theme }) => theme.colors.plainWhite};
    border: 2px solid ${({ theme }) => theme.colors.frameStroke};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2% 0;

    p:not(#error) {
        text-align: center;
        color: ${({ theme }) => theme.colors.gray};
        margin-top: 2%;
    }

    p#info {
        max-width: 55%;
        margin-bottom: 10%;
    }

    p#cadastro {
        margin-bottom: 5%;
    }

    p#cadastro a {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.link};
    }

    p.not-display {
        display: none;
    }

    p.display {
        display: block;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    input {
        margin-top: 2.5%;
    }
`

export const StyledButton = styled.button`
    padding: 3% 0;
    min-width: 56.5%;
    margin-top: 7.5% !important;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.plainWhite};
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    :hover {
        background: ${({ theme }) => theme.colors.lightBlue};
    }
`

export const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.colors.error};
`

// export const NonSubmitStyledButton = styled.button`
//     background: transparent;
//     border: none;
//     cursor: pointer;
//     margin-top: 2.5%;
//     margin-bottom: -3%;
//     color: ${({ theme }) => theme.colors.link};
    
// `