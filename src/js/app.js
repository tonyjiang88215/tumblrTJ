/**
 * Created by tonyjiang on 16/3/9.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router , Route} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';


import $ from 'zepto-modules'
window.$ = $;

import RouterHandler from './RouterHandler'

import '../css/main.less'

class Application{
    constructor(){

        injectTapEventPlugin();

    }

    startUp(){
        console.log('start up');
        ReactDOM.render(<RouterHandler /> , document.getElementById('app'));
    }

}
console.log('112233');

new Application().startUp();