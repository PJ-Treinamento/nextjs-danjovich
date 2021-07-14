import React, { FormEvent, useContext, useState } from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import Input from '../../components/Input';
import Logo from '../../components/Logo';
import AuthContext from 'contexts/auth';

import { ErrorMessage, FrameDiv, NonSubmitStyledButton, PageDiv, StyledButton, StyledForm } from './styles';

const LoginComponent = () => {
    const { register, handleSubmit } = useForm();
    const { logIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState(false);

    const handleLogIn = () => {
        try {
            logIn(email, password);
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
    }

    return (
        <PageDiv>
            <FrameDiv>
                <Logo to="/" />
                <p id="info">Entre no PiuPiuwer e veja o que seus amigos estão pensando.</p>
                {loginError && <ErrorMessage id="error">Email ou senha incorretos. Tente novamente.</ErrorMessage>}
                <StyledForm onSubmit={handleSubmit(handleLogIn)}>
                    <Input
                        {...register('email')}
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <Input
                        {...register('password')}
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <StyledButton type="submit">Entrar</StyledButton>
                </StyledForm>
                <p id="cadastro">Ainda não tem um cadastro? <Link href="/">Crie uma nova conta.</Link></p>
            </FrameDiv>
        </PageDiv>
    );
}

export default LoginComponent;