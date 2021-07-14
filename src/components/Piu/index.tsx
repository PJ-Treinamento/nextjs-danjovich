import React, { useState } from "react";

import { User } from "../User";
import formatedDate from "utils/formatedDate";

import like from "assets/images/like.svg";
import liked from "assets/images/liked.svg";
import favoriteSymbol from "assets/images/favoritado.svg";
import notFavoriteSymbol from "assets/images/favoritar.svg";
import deleteImage from "assets/images/deletar.svg";
import genericUserPhoto from "assets/images/perfil.svg";

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
    const [currentUserPiu, setCurrentUserPiu] = useState(false);
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(piu.likes.length);
    const [favoritePiu, setFavoritePiu] = useState(false);
    const [deletedPiu, setDeletedPiu] = useState(false);

    return (
        <PiuLi deletedPiu={deletedPiu}>
            <div className="info">
                <div className="square">
                    <img src={piu.user.photo === '' ? genericUserPhoto : piu.user.photo} alt="Foto de Perfil" />
                </div>
                <div className="name-and-username">
                    <strong>{piu.user.first_name} {piu.user.last_name} <span>@{piu.user.username} · {formatedDate(new Date(String(piu.updated_at)))}</span></strong>
                </div>
            </div>
            <p>{piu.text}</p>
            <div className="interactions">
                <div>
                    <img src={likedByCurrentUser ? liked : like} alt="Like" className="like" />
                    <span>{numberOfLikes}</span>
                </div>
                <img src={favoritePiu ? favoriteSymbol : notFavoriteSymbol} alt="Favoritar" />
                {currentUserPiu && <img src={deleteImage} alt="Deletar" className="delete" />}
            </div>
        </PiuLi>
    )
}

export default PiuTag;