/**
 * Created by tonyjiang on 16/3/9.
 */
import React, {Component} from 'react';
import {observe, observable, transaction} from 'mobx';
import {observer} from 'mobx-react';
import _ from 'lodash';


import {List, ListItem} from 'material-ui/List';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import TipHelper from '../../helpers/tip';

import store from '../../store';

import AddFollow from './AddFollow';
import FollowListItem from './FollowListItem';

@observer
class FollowList extends Component {

    static defaultProps = {
        data: []
    };
    
    static childContextTypes = {
        selected: React.PropTypes.number
    };

    state = {
        addFollowShow: false
    };

    getChildContext(){
        return {
          selected: this.state.selected  
        };
    }

    dataObservers = [];

    constructor(...args) {
        super(...args);

        this.initialize();

    }

    initialize() {

        this.onItemClick = ::this.onItemClick;
        this.onAddNewFollow = ::this.onAddNewFollow;
        this.onAddFollowClose = ::this.onAddFollowClose;
        this.observeDataChange = ::this.observeDataChange;

        this.loadList();

    }

    loadList() {

        this.list = observable(store.followStore.follow);
        this.dataObservers.push(observe(store.followStore.follow, this.observeDataChange));

    }

    observeDataChange(change) {
        const {type, newValue} = change;

        this.forceUpdate();
    }

    render() {

        const list = [];
        this.list.forEach((item, index) => {

            list.push(
                <FollowListItem
                    key={index}
                    blog={item}
                    onClick={this.onItemClick}
                />
            );
        });

        return (
            <div className="following">
                <div className="following-title">
                    <span>Following</span>
                    <ContentAdd onTouchTap={this.onAddNewFollow}/>
                </div>
                <div className="following-list">
                    {list}
                </div>
                <div className="following-footer"></div>
                <AddFollow
                    open={this.state.addFollowShow}
                    onRequestClose={this.onAddFollowClose}
                />

            </div>
        );

    }

    onItemClick(item) {
        this.setState({selected: item.id});
        this.props.onItemClick && this.props.onItemClick(item);
    }

    onAddNewFollow() {
        this.setState({addFollowShow: true});
    }

    onAddFollowClose() {
        this.setState({addFollowShow: false});
    }

}

export default FollowList