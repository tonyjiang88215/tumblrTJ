/**
 * Created by tonyjiang on 16/3/9.
 */
import React, {Component} from 'react';

import FlatButton from 'material-ui/FlatButton';

import DashboardHeader from './DashboardHeader';
import OnlineList from "./OnlineList";
import FavoriteList from "./FavoriteList";
import DashboardItem from './DashboardItem';

import store from '../../store';
import api from '../../api/TumblrAPI';

class Dashboard extends Component {

    state = {
        type: 'photo',
        num: 20,
        total: 0,
        start: 0
    };

    data = [];

    constructor(...args) {
        super(...args);

    }

    render() {

        console.log(this.props.follower);

        if(!this.props.follower){
            return <div >welcome</div>;
        }

        return (
            <div className="dashboard">
                <DashboardHeader
                    follower={this.props.follower}
                />
                <div className="db-content">

                    <OnlineList follower={this.props.follower} />

                    <FavoriteList follower={this.props.follower} />

                </div>



            </div>
        );


        let listHTML = this.data.map(function (item, index) {
            return <DashboardItem item={item} key={item.id}/>
        });

        return (
            <div className="dashboard">

                <DashboardHeader
                    follower={this.props.follower}
                />
                <div className="list">
                    {listHTML}
                </div>
                <FlatButton label="加载更多" primary={true} onClick={this.pullList}/>
            </div>
        );
    }
}

export default Dashboard