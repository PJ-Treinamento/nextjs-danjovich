import React, { useContext, useEffect, useState } from "react";

import formatedDate from "utils/formatedDate";
import AuthContext from "contexts/auth";
import { User } from "../User";

import { AiOutlineHeart, AiFillHeart, AiOutlineStar, AiFillStar } from 'react-icons/ai';

import deleteImage from "assets/images/deletar.png";
import genericUserPhoto from "assets/images/perfil.png";

import { PiuLi } from "./styles";

export interface PiuLike {
    id: string,
    user: User,
    piu: Piu
}

export interface Piu {
    id: string,
    user: User,
    likes: PiuLike[],
    text: string,
    created_at: Date,
    updated_at: Date
}

export interface PiuTagProps {
    piu: Piu
}

const PiuTag: React.FC<PiuTagProps> = ({ piu }) => { 
    const { user, deletePiu, likePiu, favoritePiu } = useContext(AuthContext);
    const [currentUserPiu, setCurrentUserPiu] = useState(false);
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(piu.likes.length);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (user!.id === piu.user.id) setCurrentUserPiu(true);
        for (const piuLike of piu.likes) {
            if (piuLike.user.id === user?.id) {
                setLikedByCurrentUser(true);
            }
        }
        for (const favoritePiu of user?.favorites!) {
            if (favoritePiu.id === piu.id) setFavorite(true);
        }
    }, []);

    const handleLikePiu = () => {
        likePiu(piu.id).then((response) => {
            setNumberOfLikes(likedByCurrentUser
                ? numberOfLikes - 1
                : numberOfLikes + 1);
            setLikedByCurrentUser(!likedByCurrentUser);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleFavoritePiu = () => {
        setFavorite(!favorite);
        favoritePiu(piu.id, favorite).catch((error) => {
            console.log(error);
        });
    }

    const handleDetletePiu = () => {
        deletePiu(piu.id);
    }

    return (
        <PiuLi>
            <div className="info">
                <div className="square">
                    <img src={piu.user.photo === '' ? genericUserPhoto.src : piu.user.photo} alt="Foto de Perfil" />
                </div>
                <div className="name-and-username">
                    <strong>{piu.user.first_name} {piu.user.last_name} <span>@{piu.user.username} · {formatedDate(new Date(String(piu.updated_at)))}</span></strong>
                </div>
            </div>
            <p>{piu.text}</p>
            <div className="interactions">
                <div>
                    {likedByCurrentUser 
                        ? <AiFillHeart onClick={handleLikePiu} color="#C70039" />
                        : <AiOutlineHeart onClick={handleLikePiu} />}
                    <span>{numberOfLikes}</span>
                </div>
                {favorite 
                    ? <AiFillStar onClick={handleFavoritePiu} color="#FFC300" />
                    : <AiOutlineStar onClick={handleFavoritePiu} />}
                {currentUserPiu && 
                <img 
                    src={deleteImage.src} 
                    alt="Deletar" 
                    className="delete" 
                    onClick={handleDetletePiu}
                />}
            </div>
        </PiuLi>
    )
}

export default PiuTag;