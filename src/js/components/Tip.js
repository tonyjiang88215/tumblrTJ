/**
 * Created by TonyJiang on 16/7/12.
 */
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';
import {colors} from 'material-ui/styles';

import store from '../store';

@observer
class Tip extends Component {

    render() {
        const {tip} = store.uiState;

        return (
            <Snackbar
                open={tip.open}
                message={tip.message}
                autoHideDuration={tip.duration}
                onRequestClose={this.onRequestClose}
            />
        );

    }

    onRequestClose(){
        const {tip} = store.uiState;
        tip.open = false;
    }
}

export default Tip;
