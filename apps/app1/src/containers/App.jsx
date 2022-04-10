import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { StaticRouter, BrowserRouter } from 'react-router-dom';


export const AppComponent = ({client}) => {
    let Router = client? StaticRouter : BrowserRouter
    return (
        <Fragment>
            <Router>
                <Provider>
                    <ApolloProvider>
                    </ApolloProvider>
                </Provider>
            </Router>
        </Fragment>
    )
}

export const App = hot(module)(AppComponent)