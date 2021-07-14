import React, { useContext, useState } from 'react';
import { NextPage } from 'next';

import AuthContext from 'contexts/auth';
import Pius from 'components/Pius';

import Logo from 'components/Logo';
import { Piu } from "components/Piu";
// import { PiuTagProps } from 'components/Piu';
import UserTag, { User } from 'components/User';

import feedImage from 'assets/images/feed.svg';
import exitImage from 'assets/images/sair.svg';
import filterImage from 'assets/images/filtro.svg';

import { Aside, NewPiu, PageDiv, Sticky, StyledHeader, StyledSection } from 'styles/Feed';

const Feed: NextPage = () => {
    const { pius, publishPiu } = useContext(AuthContext);

    const [filteredPius, setFilteredPius] = useState<Piu[]>(pius);
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentUserFound, setCourrentUserFound] = useState(false);
    const [users, setUsers] = useState<User[]>();

    const [viewFilter, setViewFilter] = useState(false);
    const changeFilterVisibilty = () => {
        setViewFilter(!viewFilter);
    }

    const [filterOption, setFilterOption] = useState('users');
    const [searchContent, setSearchContent] = useState('');

    const filterSearch = (newFilterOption: any) => {
        setFilterOption(newFilterOption.value);
        search(searchContent);
    }

    const search = (newSearchContent: string) => {
        const uppercase = newSearchContent.toUpperCase();
        setSearchContent(uppercase);
        let filteringPius = pius;
        if (filterOption === 'pius') {
            filteringPius = filteringPius.filter((piu: Piu) => {
                return piu.text.toUpperCase().indexOf(uppercase) > -1;
            });
        } else if (filterOption === 'users') {
            filteringPius = filteringPius.filter((piu: Piu) => {
                return (piu.user.first_name.toUpperCase().indexOf(uppercase) > -1
                    || piu.user.last_name.toUpperCase().indexOf(uppercase) > -1
                    || piu.user.username.toUpperCase().indexOf(uppercase) > -1);
            });
        }
        setFilteredPius(filteringPius);
    }

    const [newPiu, setNewPiu] = useState('');
    const [publishingDisabled, setPublishingDisabled] = useState(true);
    const [lengthSize, setLengthSize] = useState('');
    const handleKeyPress = (content: string) => {
        setNewPiu(content);
        const currentLength = content.length;
        if (currentLength > 0 && currentLength < 140) {
            setPublishingDisabled(false);
            setLengthSize('');
        } else if (currentLength >= 140) {
            setPublishingDisabled(true);
            setLengthSize('too-big');
        } else if (currentLength === 0) {
            setPublishingDisabled(true);
            setLengthSize('too-short');
        }
    }

    const handlePublishPiu = () => {
        publishPiu(newPiu);
    }

    return (<PageDiv>
            <StyledHeader>
                <Logo to="/feed" />
                <nav>
                    <ul>
                        <li><a href="/feed" title="Seu Feed"><img src={feedImage} alt="Feed" id="feed-icon" /> Seu Feed</a></li>
                        <li><a href="/" title="Sair"><img src={exitImage} alt="Sair" id="exit-icon" /> Sair</a></li>
                    </ul>
                </nav>
            </StyledHeader>

            <StyledSection>
                <Sticky>
                    <div className="searchbar">
                        <input type="text" placeholder="Buscar no PiuPiuwer"
                               onChange={(e) => {
                                    e.preventDefault();
                                    search(e.target.value);
                                }} />
                        <img src={filterImage} onClick={changeFilterVisibilty} alt="Filtrar" />
                    </div>

                    {viewFilter &&
                    <form id="filter" onChange={(e) => filterSearch(e.target)}>
                        <h3>Buscar pius por:</h3>
                        <div>
                            <input type="radio" name="search-mode" value="users" defaultChecked />
                            <label htmlFor="users">Nome/username</label>
                        </div>
                        <div>
                            <input type="radio" name="search-mode" value="pius" />
                            <label htmlFor="pius">Conteúdo dos pius</label>
                        </div>
                    </form>}
                </Sticky>

                <NewPiu className={lengthSize} onSubmit={handlePublishPiu}>
                        <label htmlFor="new-piu-textarea" id="count">Caracteres: {newPiu.length}/140</label>
                        <textarea name="new-piu" id="new-piu-textarea" placeholder="Novo piu..."
                                onChange={(e) => handleKeyPress(e.target.value)}></textarea>
                        <div>
                            <input type="submit" id="publish" className="button" value="Publicar" disabled={publishingDisabled} />
                        </div>
                </NewPiu>

                <Pius pius={pius} />
            </StyledSection>

            <Aside>
                <h2>Seu Perfil</h2>
                {currentUserFound && <UserTag user={currentUser!} />}
                <h2>Outros Usuários</h2>
                {users?.map((user: User) => {
                    return <UserTag user={user} key={user.id} />
                })}
            </Aside>

        </PageDiv>
        
    );
};

export default Feed;