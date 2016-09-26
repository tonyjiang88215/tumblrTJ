/**
 * Created by TonyJiang on 16/7/15.
 */
import {observe, observable, transaction, map} from 'mobx';
import axios from 'axios';

import RecordAPI from "../api/RecordAPI";

import FavoriteRecordEntity from './entity/FavoriteRecordEntity';
import Store from "./Store";

//设置followerID时, 会
export default class RecordStore extends Store {

    _followerID = 0;

    _idsFromCache = undefined;


    constructor() {
        super(FavoriteRecordEntity);

        this.data = observable({

            ids: [],
            records: []

        });

        this.database = observable({
            //缓存follower的ids列表
            followerIDS: map()
        });


        this._initObserver();

    }

    _initObserver() {
        observe(this.data.ids, this._observeDataChange);
    }

    _observeDataChange = (change) => {
        const {type, added, index, addedCount} = change;

        if (type == 'splice' && addedCount > 0) {
            added.map((id, i) => this.data.records.splice(index + i, 0, this._getCache(id)));

        }

    }


    //获取ids数据
    _updateRecordIDS() {

        if(!this.database.followerIDS.has(`${this._followerID}`)){
            this.database.followerIDS.set(`${this._followerID}`, []);
        }

        this._idsFromCache = this.database.followerIDS.get(`${this._followerID}`);

        transaction(() => {
            this.data.ids.length = 0;
            this.data.records.length = 0;
            this._idsFromCache.map(item => this.data.ids.push(item));
        });


        //如果ids没有数据, 说明当前查看的是新的follower
        if (this.data.ids.length == 0) {
            this._getRecord();
        }

    }

    _getRecord() {
        console.log('getFavoritedLIst');
        RecordAPI.getFavoriteList(this._followerID)
            .then(data => {
                console.log('getFavoritedList finished');
                transaction(() => {
                    data.map(item => {
                        //将自己系统的id替换成原始id
                        item.favorite_id = item.id;
                        item.id = item.original_id;
                        this._syncCacheModel(item);
                        this.data.ids.push(item.id);
                        this._idsFromCache.push(item.id);
                    });
                });

            })
    }


    addRecord(record) {

        const params = {
            id: record.id,
            json: record.json
        };

        return axios.post('http://localhost:3000/record/add', params)
            .then(response => {
                const {status, data} = response;
                if (status == 200) {

                    if (data.result == true) {
                        const item = data.data;

                        item.favorite_id = item.id;
                        item.id = item.original_id;
                        this._syncCacheModel(item);
                        this.data.ids.unshift(item.id);
                        this._idsFromCache.unshift(item.id);

                        return Promise.resolve(item);
                    } else {
                        return Promise.reject(data.message);
                    }

                }
            })
            .catch(err => {
                return Promise.reject(err);
            });

    }


    set followerID(id) {
        const update = this._followerID != id;

        this._followerID = id;

        if(update){
            this._updateRecordIDS();
        }
    }

    get list(){
        return this.data.records;
    }



}
