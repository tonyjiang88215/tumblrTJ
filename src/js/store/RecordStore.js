/**
 * Created by TonyJiang on 16/7/15.
 */
import {observable, transaction, map} from 'mobx';
import axios from 'axios';

import Record from './entity/Record';
import Immutable from 'immutable';


class RecordStore {

    // @observable _cacheFollows = map();

    updateTimeStamp = 0;

    //5分钟更新一次
    updateTimeUnit = 5 * 60 * 1000;

    constructor() {
        this._cacheRecords = observable(map());
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
        
        return axios.get(`http://localhost:3000/record/list/${id}`)
            .then(response => {
                const {status, data} = response;
                if (status == 200) {

                    console.log('data' , data);

                    if(data.result == true){
                        this._syncCacheModel(data.data);

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

    _syncCacheModel(item) {
        const id = item.id;

        const cacheItem = this._getCache(id, true, (_cacheItem) => {

            const fields = Record.fields.toJS();
            fields.forEach((field) => {
                var key = field.name,
                    value = item[key];
                if (_cacheItem[key] !== value) {
                    _cacheItem[key] = value;
                }
            });
        });

        return cacheItem;
    }

    _getCache(id, createIfNotExists = true, dataSetter) {
        let record = this._cacheRecords.get(`${id}`);

        if (!record && createIfNotExists) {
            record = new Record(id);

            if (typeof(dataSetter) === 'function') {
                dataSetter(record);
            }

            this._cacheRecords.set(`${id}`, record);
        }
        else {
            if (typeof(dataSetter) === 'function') {
                dataSetter(record);
            }
        }

        return record;
    }

}

export default RecordStore;