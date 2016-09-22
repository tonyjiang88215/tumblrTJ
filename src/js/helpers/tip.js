/**
 * Created by TonyJiang on 16/7/12.
 */
import Immutable from 'immutable';
import store from '../store';

const initializeStyle = Immutable.fromJS({
    open    : false,
    message : '',
    duration: 2500
});

const helper = {

    show: (options) => {
        
        let style = initializeStyle.mergeDeep(options)
            .set('open', true);

        store.uiState.tip = style.toJS();

    },

    hide: () => {
        store.uiState.tip = {open: false};
    }
};

export default helper;
