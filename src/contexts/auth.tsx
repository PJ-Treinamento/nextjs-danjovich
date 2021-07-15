import React, { createContext, useState, useEffect } from 'react';
import Router from 'next/router';

import CircularProgress from '@material-ui/core/CircularProgress';
import { AxiosResponse } from "axios";
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import api from 'services/api';
import orderPiusByDate from 'utils/orderPiusByDate';

import { Piu } from 'components/Piu';
import { User } from 'components/User';

import { LoadingDiv } from 'styles';

interface AuthContextData {
    isUserAuthenticated: boolean;
    user: User | null;
    users: User[];
    pius: Piu[];
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
    const [loading, setLoading] = useState(true);
    const [pius, setPius] = useState<Piu[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const cookies = parseCookies();
        const localToken = cookies['piupiuwer.token'];
        const username = cookies['piupiuwer.username'];

        if (localToken && username) {
            recoverUserInformation(username).then((response) => {
                setUser(response.data[0]);
            }).catch((error) => console.log(error));
        } else {
            setLoading(false);
        }
    }, []);

    async function recoverUserInformation(username: string) {
        const response = await api.get(`users?username=${username}`);
        getPius();
        getUsers(response.data[0].id);
        return response;
    }

    async function logIn(email: string, password: string) {
        const response = await api.post('/sessions/login', {
            email: email,
            password: password
        });

        setLoading(true);
        
        setCookie(undefined, 'piupiuwer.token', response.data.token, {
            maxAge: 60 * 60 * 24, // 24 horas
            path: '/',
        });
        setCookie(undefined, 'piupiuwer.username', response.data.user.username, {
            maxAge: 60 * 60 * 24, // 24 horas
            path: '/',
        });
        
        setUser(response.data.user);

        api.defaults.headers.authorization = `Bearer ${response.data.token}`;

        getPius().catch((error) => {
            console.log(error);
        });

        getUsers(response.data.user.id);

        Router.push('/feed');
    }

    async function logOut() {
        setUser(null);
        destroyCookie(undefined, 'piupiuwer.token');
        destroyCookie(undefined, 'piupiuwer.username');
    }

    async function getPius() {
        const response = await api.get('pius');
        const data = response.data;
        let piusArray: Piu[];
        piusArray = [];
        for (const piu of data) {
            piusArray.push(piu);
        }
        piusArray = orderPiusByDate(piusArray);
        setPius(piusArray);
    }

    async function publishPiu(text: string) {
        console.log(text);

        await api.post('pius', {
            text: text
        }).then(() => {
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
            getPius();
        }).catch((error) => {
            console.log(error);
        });
    }

    async function likePiu(piu_id: string) {
        const response = await api.post('pius/like', {
            piu_id: piu_id
        });
        return response;
    }

    async function favoritePiu(piu_id: string, alreadyFavorite: boolean) {
        let favoriteOrUnfavorite = alreadyFavorite ? 'unfavorite' : 'favorite';
        const response = await api.post(`pius/${favoriteOrUnfavorite}`, {
            piu_id: piu_id
        });
        return response;
    }

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
        setLoading(false);
    }

    if (loading) {
        return (
            <LoadingDiv>
                <CircularProgress />
            </LoadingDiv>
        );
    }

    return (
        <AuthContext.Provider value={{ 
            isUserAuthenticated: !!user, 
            user: user,
            users: users,
            pius: pius,
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
