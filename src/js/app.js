/**
 * Created by tonyjiang on 16/3/9.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router , Route} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import mutants from "chanjet-mutants";
import $ from 'zepto-modules';
window.$ = $;

import RouterHandler from './RouterHandler'

import '../css/main.less'

class Application{
    constructor(){

        injectTapEventPlugin();

    }

    startUp(){
        ReactDOM.render(<RouterHandler /> , document.getElementById('app'));
    }

}

new Application().startUp();