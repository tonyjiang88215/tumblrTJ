/**
 * Created by TonyJiang on 16/7/15.
 */
import {observable, transaction, map} from 'mobx';
import axios from 'axios';

import RecordAPI from "../api/RecordAPI";

import RecordEntity from './entity/RecordEntity';
import Store from "./Store";

export default class RecordStore extends Store{

    updateTimeStamp = 0;

    //5分钟更新一次
    updateTimeUnit = 5 * 60 * 1000;

    constructor(){
        super(RecordEntity);
    }

    getRecordCount(id){
        return axios.get(`http://localhost:3000/record/count/${id}`)
            .then(response => {
                const {status, data} = response;
                if (status == 200) {

                    if(data.result == true){

                        return Promise.resolve(data.data);
                    }else{
                        return Promise.reject();
                    }

                }else{
                    return Promise.reject();
                }
            }).catch(err => {
                return Promise.reject(err);
            });
    }

    getRecordList(id){

        // return this._getCache(id);
        
        return axios.get(`http://localhost:3000/record/list/${id}`)
            .then(response => {
                const {status, data, message} = response;
                if (status == 200) {

                    console.log('data' , data);

                    if(data.result == true){
                        transaction(() => {
                            data.data.map(item =>  this._syncCacheModel(item));
                        });


                        return Promise.resolve(data.data);
                    }else{
                        return Promise.reject(message);
                    }

                }else{
                    return Promise.reject('error');
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        
    }

    addRecord(record) {

        const params = {
            id: record.id,
            json: record.json
        };

        return axios.post('http://localhost:3000/record/add', params)
            .then( response => {
                const {status, data} = response;
                if (status == 200) {

                    if(data.result == true){
                        this._syncCacheModel(data.data);

                        return Promise.resolve(data.data);
                    }else{
                        return Promise.reject(data.message);
                    }

                }
            })
            .catch( err => {
                return Promise.reject(err);
            });

    }



    //获取当前id的缓存集合
    _getCacheList(follower_id, createIfNotExists = true , dataSetter){
        let list = this._cacheRecords.get(`${follower_id}`);

        //如果当前follower的缓存不存在, 则创建缓存对象
        if(!list && createIfNotExists){
            list = observable(map());

            if (typeof(dataSetter) === 'function') {
                dataSetter(list);
            }

            //调用api查询缓存的列表集合
            RecordAPI.getFavoriteList(follower_id).then(data => {
                //批处理
                transaction(() => {
                    //将每一条加入list中
                    data.map(record => {

                    });
                });

            });

            this._cacheRecords.set(`${follower_id}`, list);


        }else{
            if (typeof(dataSetter) === 'function') {
                dataSetter(list);
            }
        }

        return list;

    }



}
