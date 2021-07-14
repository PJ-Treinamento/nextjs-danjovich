import styled from "styled-components";

interface liProps {
    deletedPiu: boolean
}

export const PiuLi = styled.li<liProps>`
    display: ${props => props.deletedPiu ? 'none' : 'block'};
    border: 1px solid #6c8193;
    background: #fff;
    margin-top: -1px;

    .info {
        display: flex;
        align-items: center;
        margin: 16px 16px;
    }

    .info img,
    aside .profile .square img {
        max-height: 100%;
    }

    p {
        margin: 8px 16px;
        overflow-wrap: break-word;
    }

    .interactions {
        display: flex;
        align-content: center;
        justify-content: space-around;
        margin: 16px 142px;
    }

    .interactions img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .interactions div {
        display: flex;
        align-content: center;
    }

    .interactions div img {
        margin-right: 4px;
    }

    @media(max-width: 1024px) {
        .interactions {
            display: flex;
            justify-content: center;
            margin-left: 0;
        }

        .interactions div,
        .interactions > img {
            margin-right: 32px;
            margin-left: 32px;
        }

        .interactions:last-child {
            margin-right: 0;
        }
    }
`