import { Button } from '@material-ui/core';
import * as S from './styles';

export type TestProps = {
    title: string;
};

const Test: React.FC<TestProps> = ({ title }) => (
    <S.Wrapper>
        <p>{title}</p>
        <Button size="large" variant="contained" color="primary">
            Material-UI
        </Button>
    </S.Wrapper>
);

export default Test;
