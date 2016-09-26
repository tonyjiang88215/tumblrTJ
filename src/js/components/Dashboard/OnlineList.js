/**
 * Created by TonyJiang on 16/9/18.
 */
import React from "react";
import {observable, observe} from "mobx";
import {observer} from "mobx-react";
import tumblrAPI from '../../api/TumblrAPI';
import store from "../../store";

import DashboardItem from './DashboardItem';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

@observer
export default class OnlineList extends React.Component{

    static defaultProps = {
        follower: React.PropTypes.object.isRequired
    };

    state = observable({
        follower: undefined,
        type: 'photo',
        loading: false,
        num: 20,
        total: 0,
        start: 0
    });

    data = [];
    dataPtr = {};

    constructor(...args){
        super(...args);

    }

    componentWillMount() {
        this.state.follower = this.props.follower;
        this.pullList();
    }

    //更换目标
    componentWillReceiveProps(nextProps) {
        this.data.length = 0;
        this.state.start = 0;
        this.state.follower = nextProps.follower;
        // this.getInitInfo(nextProps.follower.prefix);
        this.pullList();
        //this.pullList();
    }

    render(){
        console.log('online list render');
        const {follower} = this.state;
        let listHTML = this.data.map(function (item, index) {
            return <DashboardItem follower={follower} item={item} key={item.id} online={true} />
        });

        return (
            <div className="online-list">
                <div className="list">
                    {listHTML}
                </div>
                <div className="buttons">
                    {
                        this.state.loading &&
                        <RefreshIndicator
                            style={{position: 'relative', margin:'0 auto'}}
                            size={40}
                            left={10}
                            top={0}
                            status="loading"
                        />
                    }
                    {
                        !this.state.loading &&
                        <RaisedButton style={{margin:'0 auto'}} label="加载更多" primary={true} onClick={this.pullList}/>
                    }

                </div>

            </div>
        );
    }


    pullList = () => {
        if(this.state.loading){
            return;
        }
        this.state.loading = true;

        const {follower} = this.state;

        setTimeout(() => {

            tumblrAPI.pull(follower.prefix, this.state.start, this.state.num)
                .then(data => {
                    console.log('get PullList finished');

                    this.state.loading = false;
                    this.state.start = this.state.start + this.state.num;
                    data.posts.map(item => {
                        this.data.push(item);
                        this.dataPtr[item.id] = item;
                    });
                    this.forceUpdate();

                }).catch(err => {
                this.state.loading = false;

            });

        }, 500);


    }


}