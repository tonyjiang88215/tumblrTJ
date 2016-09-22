/**
 * Created by tonyjiang on 16/3/10.
 */
import React , {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {grey500} from 'material-ui/styles/colors';
import TipHelper from '../../helpers/tip';
import store from "../../store";


class DashboardItem extends Component{

    static defaultProps = {
        item: {},
        follower: {}
    }

    state = {
        expend :false
    };



    render(){
        let item = this.props.item;

        let _photos = null;

        let imgList;
        let video;
        let regular;
        let typeIcon;

        if(item.type == 'photo'){
            if(item.photos && item.photos.length == 0){
                _photos = [{
                    caption : item['photo-caption'],
                    height : item.height,
                    width: item.width,
                    offset : '',
                    'photo-url-75':item['photo-url-75'],
                    'photo-url-100':item['photo-url-100'],
                    'photo-url-250':item['photo-url-250'],
                    'photo-url-400':item['photo-url-400'],
                    'photo-url-500':item['photo-url-500'],
                    'photo-url-1280':item['photo-url-1280']
                }]
            }else{
                _photos = item.photos;
            }


            imgList = _photos.map(function(photo , index){
                return <img className="img" src={this.state.expend ? photo['photo-url-100'] : ''} style={{display:''}}></img>
            }.bind(this));

            typeIcon = 'photo';

        }else if(item.type == 'video'){
            video = item['video-player'];
            typeIcon = 'ondemand_video';
        }else if(item.type == 'regular'){

            regular = item['regular-body'];
            typeIcon = 'share';

        }else {
            imgList = [];
            typeIcon = '';

        }

        return (
            <div className="item" key={item.id}>
                <div className="item-title" onClick={this.expendHandler}>
                    <div className="material-icons title-icon" color={grey500} >{typeIcon}</div>
                    <div>{item.slug}</div>
                    <div className="material-icons title-icon" color={grey500} onClick={this.favoriteHandler} >favorite</div>
                    <div className="material-icons title-icon expend-icon" color={grey500} >{this.state.expend ? 'arrow_drop_up' : 'arrow_drop_down'}</div>

                </div>
                <div className="item-detail" style={{display:(this.state.expend ? '':'none')}}>
                    <div className="detail-content" dangerouslySetInnerHTML={{__html: item['photo-caption']}}></div>
                    <div className="detail-video" dangerouslySetInnerHTML={{__html: video}}></div>
                    <div className="detail-regular" dangerouslySetInnerHTML={{__html: regular}}></div>
                    <div className="item-img">
                        {imgList}
                    </div>
                </div>

            </div>
        );

    }

    expendHandler = () => {
        this.setState({
            expend : !this.state.expend
        })
    }

    favoriteHandler = (event) => {

        const {follower, item} = this.props;

        store.recordStore.addRecord({
            id: follower.id,
            json: item
        }).then((response) => {
            TipHelper.show({message: '收藏成功'});
        }).catch(err => {
            TipHelper.show({message: err});
        });

        event.stopPropagation();
    }

}

export default DashboardItem;