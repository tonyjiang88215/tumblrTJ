/**
 * Created by TonyJiang on 16/7/12.
 */
import {observable} from 'mobx';
import FollowStore from './FollowStore';
import RecordStore from './RecordStore';
import FollowerRecordStore from './FollowerRecordStore';


const store = {
    uiState: observable({
        //tip只是站位, 具体config,由tipHelper定义
        tip: {},
        loading: {}
    }),
    
    followStore: new FollowStore(),
    followerRecordStore: new FollowerRecordStore(),
    recordStore: new RecordStore()
};

export default store;