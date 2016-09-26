/**
 * Created by tonyjiang on 16/3/9.
 */
import React , {Component} from 'react';
import {observer} from 'mobx-react';

import FollowList from '../components/FollowList/FollowList';
import Dashboard from '../components/Dashboard/Dashboard';
import AddFollow from '../components/FollowList/AddFollow';
import Tip from '../components/Tip';

import store from '../store';



let followData = [
    {label : '三解人衣', prefix: 'sanjiery'},
    {label : 'holy-virgin' , prefix: 'holy-virgin'},
    {label : '看着我' , prefix: '51lookatme'},
    {label : '5397摄影师' , prefix: '5397sb'},
    {label : 'bellevie888人体艺术摄影' , prefix: 'bellevie888'},
    {label : 'Fresh Meat GIRLs' , prefix : 'yypinky'},
    {label : '分享家' , prefix : 'fenxj'},
    {label : 'seanvil' , prefix : 'seanvil'},
    {label : 'yiqimaster' , prefix : 'yiqimaster'},
    {label : 'biyangla' , prefix : 'biyangla'},
    {label : 'chenyigang' , prefix : 'chenyigang'},
    {label : 'coco9645' , prefix : 'coco9645'},
    {label : 'mylustfulwife' , prefix : 'mylustfulwife'},
    {label : 'miqiling' , prefix : 'miqiling'},
    {label : '艾栗栗' , prefix : 'ilikeellie'},//艾栗栗,

    //摄影师
    {label : 'randonph' , prefix : 'randonph'},
    {label : 'wanimal' , prefix : 'wanimal1983'},
    {label : 'temuermm', prefix : 'temuermm'},
    //91大神 泡芙
    {label : '91 泡芙' , prefix : 'dvonne-pao'},
    {label : '一只高冷女抗坝' , prefix : 'oosakishiziko'},
    {label : 'soratum' , prefix : 'soratum'},
    {label : 'howhow71' , prefix : 'howhow71'},
    {label : 'sweetlyman' , prefix : 'sweetlyman'},
    {label : 'sexyyc' , prefix : 'sexyyc'},
    {label : 'miqinghudie' , prefix : 'miqinghudie'},
    {label : 'd53471' , prefix : 'd53471'},


];

class IndexPage extends Component{

    state = {
        currentFollower : undefined
    };

    render(){
        
        return (
            <div className="index">
                <div className="left">
                    <FollowList data={followData} onItemClick={this.onChangeFollow.bind(this)}  />
                </div>
                <div className="content">
                    <Dashboard follower={this.state.currentFollower} />
                </div>
                <Tip />

            </div>
        );
    }

    onChangeFollow(data){
        this.setState({
            currentFollower : data
        });
    }

}

export default IndexPage