import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { parseCookies } from 'nookies';

import LoginComponent from 'components/LoginComponent';

const Home: NextPage = () => {
    return <LoginComponent />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['piupiuwer.token']: token } = parseCookies(ctx);

    if (token) {
        return {
            redirect: {
                destination: '/feed',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}