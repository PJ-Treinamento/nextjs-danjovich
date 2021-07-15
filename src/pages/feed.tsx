import React, { useContext, useState, useEffect, FormEvent } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { parseCookies } from 'nookies';

import AuthContext from 'contexts/auth';
import Pius from 'components/Pius';
// import { getApiClient } from 'services/axios';

import Logo from 'components/Logo';
import UserTag, { User } from 'components/User';
import { Piu } from 'components/Piu';

import { IoIosMusicalNotes } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
import { MdTune } from 'react-icons/md';

import { Aside, NewPiu, PageDiv, Sticky, StyledHeader, StyledSection } from 'styles/Feed';

const Feed: NextPage = (/*props*/) => {
    const { pius, publishPiu, user, users, logOut } = useContext(AuthContext);

    const [filteredPius, setFilteredPius] = useState<Piu[]>(pius);
    const [viewFilter, setViewFilter] = useState(false);
    const [filterOption, setFilterOption] = useState('users');
    const [searchContent, setSearchContent] = useState('');
    const [newPiu, setNewPiu] = useState('');
    const [publishingDisabled, setPublishingDisabled] = useState(true);
    const [lengthSize, setLengthSize] = useState('');

    useEffect(() => {
        setFilteredPius(pius);
        if (searchContent.length > 0) {
            search(searchContent);
        }
    }, [pius]);

    const changeFilterVisibilty = () => {
        setViewFilter(!viewFilter);
    }

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

    const handleKeyPress = (content: string) => {
        setNewPiu(content);
        const currentLength = content.length;
        const trimmedCurrentLenght = content.trim().length;
        if (trimmedCurrentLenght > 0 && currentLength < 140) {
            setPublishingDisabled(false);
            setLengthSize('');
        } else if (currentLength >= 140) {
            setPublishingDisabled(true);
            setLengthSize('too-big');
        } else if (trimmedCurrentLenght === 0) {
            setPublishingDisabled(true);
            setLengthSize('too-short');
        }
    }

    const handlePublishPiu = (e: FormEvent) => {
        e.preventDefault();

        publishPiu(newPiu).then(() => {
            setNewPiu('');
            setPublishingDisabled(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (<PageDiv>
            <StyledHeader>
                <Logo to="/feed" />
                <nav>
                    <ul>
                        <li><a href="/feed" title="Seu Feed"><IoIosMusicalNotes /> Seu Feed</a></li>
                    <li><a href="/" title="Sair" onClick={logOut}><ImExit /> Sair</a></li>
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
                        <MdTune onClick={changeFilterVisibilty} />
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
                        <textarea 
                            name="new-piu" 
                            id="new-piu-textarea" 
                            placeholder="Novo piu..."
                            onChange={(e) => handleKeyPress(e.target.value)}
                            value={newPiu}
                        ></textarea>
                        <div>
                            <input 
                                // onClick={handlePublishPiu}
                                type="submit" 
                                id="publish" 
                                className="button" 
                                value="Publicar" 
                                disabled={publishingDisabled} 
                            />
                        </div>
                </NewPiu>

                <Pius pius={filteredPius} />
            </StyledSection>

            <Aside>
                <h2>Seu Perfil</h2>
                <UserTag user={user!} />
                <h2>Outros Usuários</h2>
                {users?.map((user: User) => {
                    return <UserTag user={user} key={user?.id} />
                })}
            </Aside>

        </PageDiv>
        
    );
};

export default Feed;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const apiClient = getApiClient(ctx);
    const { ['piupiuwer.token']: token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}