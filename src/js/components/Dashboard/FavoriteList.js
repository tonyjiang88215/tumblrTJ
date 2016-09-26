/**
 * Created by TonyJiang on 16/9/18.
 */
import React from "react";
import {observer} from 'mobx-react';

import store from '../../store';
import RecordAPI from '../../api/RecordAPI';

import DashboardItem from './DashboardItem';

@observer
export default class FavoriteList extends React.Component{

    static defaultProps = {
        follower: React.PropTypes.object.isRequired
    };

    state = {
        type: 'photo',
        num: 20,
        total: 0,
        start: 0
    };

    componentWillMount() {
        store.favoriteRecordStore.followerID = this.props.follower.id;
    }

    //更换目标
    componentWillReceiveProps(nextProps) {
        store.favoriteRecordStore.followerID = nextProps.follower.id;
    }

    render(){
        console.log('favrote list render');
        let listHTML = store.favoriteRecordStore.list.map(function (item, index) {
            return <DashboardItem item={item.original_json} key={item.id}/>
        });

        return (
            <div className="favorite-list">
                <div className="list">
                    {listHTML}
                </div>
            </div>
        );
    }

    // pullList(follower) {
    //
    //     if (!follower.id) {
    //         return;
    //     }
    //
    //     RecordAPI.getFavoriteList(follower.id).then(data => {
    //         const originalData = data.map(item => item.original_json);
    //
    //         this.data = this.data.concat(originalData);
    //         this.forceUpdate();
    //     });
    //
    // }

}