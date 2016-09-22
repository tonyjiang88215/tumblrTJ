/**
 * Created by TonyJiang on 16/7/12.
 */
import {observable} from 'mobx';
import FollowStore from './FollowStore';
import RecordStore from './RecordStore';


const store = {
    uiState: observable({
        //tip只是站位, 具体config,由tipHelper定义
        tip: {},
        loading: {}
    }),
    
    followStore: new FollowStore(),
    recordStore: new RecordStore()
};

console.log(store.recordStore);

export default store;