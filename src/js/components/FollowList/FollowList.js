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

import VirtualList from "chanjet-virtual-list";

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

        this.loadList();

    }

    loadList() {

        this.list = store.followStore.follow;
        this.listIDS = store.followStore.followIDS;

    }

    itemRenderer = (index, key) => {
        const itemKey = this.listIDS[index];
        const item = this.list.get(itemKey);

        return (
            <FollowListItem
                key={key}
                blog={item}
                onClick={this.onItemClick}
            />
        );

    }

    render() {

        console.log('followerList render')

        const dataSize = this.list ? this.list.size : 0;
        const virtualListStyle = {
            flexGrow: 1,
            width: 'auto',
            height: 'auto'
        };

        return (
            <div className="following">
                <div className="following-title">
                    <span>Following</span>
                    <ContentAdd onTouchTap={this.onAddNewFollow}/>
                </div>
                <div className="following-list">
                    {dataSize > 0 &&
                    <VirtualList
                        style={virtualListStyle}
                        className="following-virtual-list"
                        itemRenderer={this.itemRenderer}
                        estimateHeight={41}
                        redundancy={20}
                        size={dataSize}
                    />
                    }
                </div>
                <div className="following-footer"></div>
                <AddFollow
                    open={this.state.addFollowShow}
                    onRequestClose={this.onAddFollowClose}
                />

            </div>
        );

    }

    onItemClick = (item) => {
        this.setState({selected: item.id});
        this.props.onItemClick && this.props.onItemClick(item);
    }

    onAddNewFollow = () => {
        this.setState({addFollowShow: true});
    }

    onAddFollowClose = () => {
        this.setState({addFollowShow: false});
    }

}

export default FollowList