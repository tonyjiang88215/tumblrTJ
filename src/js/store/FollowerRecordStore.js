/**
 * Created by TonyJiang on 16/9/22.
 */
import {observable, transaction, map} from 'mobx';
import Immutable from 'immutable';

import store from "./index";
import Store from "./Store";
import FollowerRecord from "./entity/FollowerRecordEntity";

import RecordAPI from "../api/RecordAPI";

export default class FollowerRecordStore extends Store{

    constructor(){
        super(FollowerRecord);
        this._cacheRecords = observable(map());
    }

    getList(id){

        const followerRecord = this._getCache(id);
        console.log('followerRecord' , followerRecord);

        if(!followerRecord.list){
            followerRecord.list = [];
        }

        if(followerRecord.list.length == 0){
            console.log('query favorite list');

            store.recordStore.getRecordList(id);

            RecordAPI.getFavoriteList(id)
                .then(data => {
                    followerRecord.count = data.length;
                    store.recordStore.
                    data.map(record => followerRecord.list.push(record));
                })
                .catch(err => {

                });
        }

        console.log('return followerRecord', followerRecord);
        return followerRecord;


    }

}