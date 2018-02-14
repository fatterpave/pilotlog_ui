import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import AppStore from './AppStore';

const appStore = new AppStore();

render(
    <AppContainer>
        <App appStore={appStore}/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        console.log("Module is hot");

        render(
            <AppContainer>
                <NextApp appStore={appStore}/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
