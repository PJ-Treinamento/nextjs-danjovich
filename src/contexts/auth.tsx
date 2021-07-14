import React, { createContext, useState, useEffect } from "react";
import Router from 'next/router';
// import { GetServerSideProps } from "next";

import CircularProgress from '@material-ui/core/CircularProgress';
import { AxiosResponse } from "axios";
import { setCookie, parseCookies } from 'nookies';

import api from '../services/api';

import { Piu, PiuTagProps } from "../components/Piu";
import { User } from "../components/User";

interface AuthContextData {
    isUserAuthenticated: boolean;
    user: User | null;
    users: User[];
    pius: Piu[];
    loadingInPage: boolean;
    logIn(email: string, password: string): Promise<void>;
    logOut(): void;
    getPius(): Promise<void>;
    publishPiu(text: string): Promise<void>;
    deletePiu(piu_id: string): Promise<void>;
    likePiu(piu_id: string): Promise<AxiosResponse<any>>;
    favoritePiu(piu_id: string, alreadyFavorite: boolean): Promise<AxiosResponse<any>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingInPage, setLoadingInPage] = useState(false);

    useEffect(() => {
        const { 'piupiuwer.token': localToken, 'piupiuwer.username': username } = parseCookies();

        if (localToken && username) {
            api.defaults.headers.authorization = `Bearer ${localToken}`;
            recoverUserInfromation(username).then((response) => {
                setUser(response);
                setToken(localToken);
            }).catch((error) => console.log(error));
        }

    }, []);

    useEffect(() => {
        api.defaults.headers.authorization = `Bearer ${token}`;
    }, [token]);

    async function logIn(email: string, password: string) {
        const response = await api.post('/sessions/login', {
            email: email,
            password: password
        });
        setUser(response.data.user);
        setToken(response.data.token);

        setCookie(undefined, 'piupiuwer.token', response.data.token, {
            maxAge: 60 * 60 * 24, // 24 horas
        });
        setCookie(undefined, 'piupiuwer.username', response.data.user.username, {
            maxAge: 60 * 60 * 24, // 24 horas
        });

        api.defaults.headers.authorization = `Bearer ${response.data.token}`;

        setLoading(true);

        getPius().catch((error) => {
            console.log(error);
        });

        getUsers(response.data.user.id);

        Router.push('/feed');
    }

    async function recoverUserInfromation(username: string) {
        const response = await api.get(`users?username=${username}`);
        return response.data.users[0];
    }

    async function logOut() {
        setUser(null);
        setToken('');
    }

    const [pius, setPius] = useState<Piu[]>([]);
    async function getPius() {
        const response = await api.get('pius');
        const data = response.data;
        let piusArray: Piu[];
        piusArray = [];
        for (const piu of data) {
            piusArray.push(piu);
        }
        piusArray = orderByDate(piusArray);
        // let piuTagsArray: PiuTagProps[];
        // piuTagsArray = [];
        // for (const piu of piusArray) {
        //     let piuTag: PiuTagProps;
        //     piuTag = {
        //         piu: piu
        //     }
        //     piuTagsArray.push(piuTag);
        // }
        setPius(piusArray);
        setLoading(false);
        setLoadingInPage(false);
    }

    async function publishPiu(text: string) {
        await api.post('pius', {
            text: text
        }).then(() => {
            setLoadingInPage(true);
            getPius();
        }).catch((error) => {
            console.log(error);
            alert('Erro: não foi possível publicar o Piu');
        });
    }
    
    async function deletePiu(piu_id: string) {
        await api.delete('pius', {
            data: { piu_id: piu_id }
        }).then(() => {
            setLoadingInPage(true);
            getPius();
        }).catch((error) => {
            console.log(error);
        });
    }

    async function likePiu(piu_id: string) {
        setLoadingInPage(true);
        const response = await api.post('pius/like', {
            piu_id: piu_id
        });
        setLoadingInPage(false);
        return response;
    }

    async function favoritePiu(piu_id: string, alreadyFavorite: boolean) {
        setLoadingInPage(true);
        let favoriteOrUnfavorite = alreadyFavorite ? 'unfavorite' : 'favorite';
        const response = await api.post(`pius/${favoriteOrUnfavorite}`, {
            piu_id: piu_id
        });
        setLoadingInPage(false);
        return response;
    }

    const [users, setUsers] = useState<User[]>([]);
    async function getUsers(currentUserId: string) {
        await api.get('users').then((response) => {
            let allUsers = response.data;
            allUsers = allUsers.filter((oneUser: User) => {
                return oneUser.id !== currentUserId;
            });
            setUsers(allUsers);
        }).catch((error) => {
            console.log(error);
        });
    }

    if (loading) {
        return (
            <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ 
            isUserAuthenticated: !!user, 
            user: user,
            users: users,
            pius: pius,
            loadingInPage: loadingInPage,
            logIn: logIn, 
            logOut: logOut,
            getPius: getPius,
            publishPiu: publishPiu,
            deletePiu: deletePiu,
            likePiu: likePiu,
            favoritePiu: favoritePiu,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

const orderByDate = (piusArray: Piu[]) => {
    type Tuple = [Piu, Date];

    let sortable: Tuple[];
    sortable = [];
    for (const piu of piusArray) {
        sortable.push([piu, piu.created_at]);
    }
    sortable.sort(function (a, b) {
        return Number(a[1]) - Number(b[1]);
    });

    let result = [];
    for (const tuple of sortable) {
        result.push(tuple[0]);
    }
    return result;
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const { ['piupiuwer.token']: token } = parseCookies(ctx)

//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {}
//     }

// }
