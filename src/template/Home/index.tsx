import { Button } from '@material-ui/core';
import * as S from './styles';

const HomeTemplate = () => (
    <S.Container>
        <S.Title>
            Esse template está usando o Material UI foi criado pela equipe de
            Research 21.1 para projetos internos da Polijunior.
        </S.Title>
        <Button size="large" variant="contained" color="primary">
            Material-UI
        </Button>
    </S.Container>
);
export default HomeTemplate;
