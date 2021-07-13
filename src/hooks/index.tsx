import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/default.theme';

const AppProvider: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default AppProvider;
