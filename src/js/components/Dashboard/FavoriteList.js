/**
 * Created by TonyJiang on 16/9/18.
 */
import React from "react";

import store from '../../store';
import RecordAPI from '../../api/RecordAPI';

import DashboardItem from './DashboardItem';

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

    data = [];

    componentWillMount() {
        this.pullList(this.props.follower);
    }

    //更换目标
    componentWillReceiveProps(nextProps) {
        this.data.length = 0;
        // this.getInitInfo(nextProps.follower.prefix);
        this.pullList(nextProps.follower);
        //this.pullList();
    }

    render(){
        let listHTML = this.data.map(function (item, index) {
            return <DashboardItem item={item} key={item.id}/>
        });

        return (
            <div className="favorite-list">
                <div className="list">
                    {listHTML}
                </div>
            </div>
        );
    }

    pullList(follower) {

        if (!follower.id) {
            return;
        }

        RecordAPI.getFavoriteList(follower.id).then(data => {
            const originalData = data.map(item => item.original_json);

            this.data = this.data.concat(originalData);
            this.forceUpdate();
        });

    }

}