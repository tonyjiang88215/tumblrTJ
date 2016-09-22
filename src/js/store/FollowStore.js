/**
 * Created by TonyJiang on 16/7/13.
 */

import {observable, transaction, map} from 'mobx';
import axios from 'axios';

import Entity from './entity/Entity';
import Immutable from 'immutable';

import TipHelper from '../helpers/tip';


class Follow extends Entity {
    id;

    constructor(id) {
        super(id);
    }

    static get fields() {
        return Immutable.fromJS([
            {name: 'id'},
            {name: 'name'},
            {name: 'prefix'},
            {name: 'info'},
            {name: 'finishCount'},
            {name: 'update_at'}
        ]);
    }

}

class FollowStore {

    // @observable _cacheFollows = map();

    updateTimeStamp = 0;

    //5分钟更新一次
    updateTimeUnit = 5 * 60 * 1000;

    constructor() {
        this._cacheFollows = observable(map());
    }


    get follow() {

        if (Date.now() > this.updateTimeStamp + this.updateTimeUnit) {
            this._loadFollows();
        }

        return this._cacheFollows;
    }

    addFollow(data) {

        const params = {
            name: data.name,
            prefix: data.prefix,
            info: data.info
        };



        return axios.post('http://localhost:3000/follow/add', params)
            .then(response => {
                const {status, data} = response;
                if (status == 200) {

                    if (data.result == true) {
                        this._syncCacheModel(data.data);

                        return Promise.resolve(data.data);
                    } else {
                        return Promise.reject(data.message);
                    }

                }
            })
            .catch(err => {
                return Promise.reject(err);
            });

    }

    syncFollow(id, blogInfo, finishCount) {

        const url = `http://localhost:3000/follow/sync/${id}`;
        const params = {
            info: blogInfo
        };

        return axios.post(url, params)
            .then(response => {

                const {status, data} = response;
                if (status == 200) {

                    if (data.result == true) {
                        this._syncCacheModel({
                            id: id,
                            info: blogInfo,
                            finishCount: finishCount
                        });

                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }

                }

            }).catch(err => {
                TipHelper.show({message: err});
                return Promise.reject();
            });
    }

    _loadFollows() {

        axios.get('http://localhost:3000/follow/list').then((response) => {

            const {status, data} = response;
            if (status == 200) {
                transaction(() => {
                    data.data.forEach((item) => {
                        this._syncCacheModel(item);
                    });
                });

            }


        }).catch((err) => {
            TipHelper.show({message: err});
        });

    }

    _syncCacheModel(item) {
        const id = item.id;

        const cacheItem = this._getCache(id, true, (_cacheItem) => {

            const fields = Follow.fields.toJS();
            fields.forEach((field) => {
                var key = field.name;
                if (item.hasOwnProperty(key) && _cacheItem[key] !== item[key]) {
                    _cacheItem[key] = item[key];
                }
            });
        });

        return cacheItem;
    }

    _getCache(id, createIfNotExists = true, dataSetter) {
        let follow = this._cacheFollows.get(`${id}`);

        if (!follow && createIfNotExists) {
            follow = new Follow(id);

            if (typeof(dataSetter) === 'function') {
                dataSetter(follow);
            }

            this._cacheFollows.set(`${id}`, follow);
        }
        else {
            if (typeof(dataSetter) === 'function') {
                dataSetter(follow);
            }
        }

        return follow;
    }

}

export default FollowStore;