import { AppProps } from 'next/app';
import AppWrapper  from '../context/state';
import 'antd/dist/antd.css';
import '../styles/globals.scss';

const JurChatApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return  <AppWrapper>
        <Component {...pageProps} />
        </AppWrapper>
}

export default JurChatApp;