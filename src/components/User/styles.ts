import styled from "styled-components";

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    .square {
        width: 58px;
        height: 58px;
    }

    .info {
        display: flex;
        flex-direction: column;
    }

    .name-and-username span {
        font-weight: normal;
        color: #b3b3b3;
    }
`