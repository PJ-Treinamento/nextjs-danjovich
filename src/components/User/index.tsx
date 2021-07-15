import React from "react";

import genericProfilePhoto from "assets/images/perfil.png";

import { Piu, PiuLike } from "../Piu";
import { Profile } from "./styles";


export interface User {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    about: string,
    photo: string,
    pius: Piu[],
    likes: PiuLike[],
    following: User[],
    followers: User[],
    favorites: Piu[]
}

interface UserTagProps {
    user: User
}

const UserTag: React.FC<UserTagProps> = ({user}) => {
    return(
        <Profile className="profile">
            <div className="square">
                <img src={(user === null || user.photo.indexOf('http') === -1) ? genericProfilePhoto.src : user.photo} alt="Foto de Perfil" id="current-user-img" />
            </div>
            <div className="info">
                <div className="name-and-username" id="current-user-info">
                    <strong>{user && user!.first_name} {user && user!.last_name} <br /><span>@{user && user!.username}</span></strong>
                </div>
            </div>
        </Profile>
    )
}

export default UserTag;