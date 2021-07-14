import AppProvider from 'hooks';
import { AppProps } from 'next/app';
import { GlobalStyles } from 'styles';
import { AuthProvider } from 'contexts/auth';
import './_app.css';


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AppProvider>
                <AuthProvider>
                    <GlobalStyles />
                    <Component {...pageProps} />
                </AuthProvider>
            </AppProvider>
        </>
    );
}

export default MyApp;
