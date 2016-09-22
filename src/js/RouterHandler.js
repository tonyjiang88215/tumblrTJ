/**
 * Created by tonyjiang on 16/3/9.
 */
import React , {Component} from 'react';
import {Router , Route , browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IndexPage from './pages/IndexPage'

class RouterHandler extends Component{

    constructor(props , context){
        super(props , context);
    }

    render(){

        return (
            <MuiThemeProvider >
                <Router history={browserHistory}>
                    <Route path="/" component={IndexPage} />
                </Router>
            </MuiThemeProvider>
        );

    }
}

export default RouterHandler