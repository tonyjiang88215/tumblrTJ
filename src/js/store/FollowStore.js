/**
 * Created by TonyJiang on 16/7/13.
 */

import {observe, observable, transaction, map} from 'mobx';
import axios from 'axios';

import FollowEntity from './entity/FollowEntity';
import Store from './Store';

import TipHelper from '../helpers/tip';

class FollowStore extends Store{

    constructor() {
        super(FollowEntity);

        this._cacheIDS = observable([]);

        this.initObserver();
        this._loadFollows();

    }

    initObserver(){
        observe(this.cacheRecords, this.observeDataChange);
    }

    observeDataChange = (change) => {
        const {type, newValue} = change;

        if(type == 'add'){
            this._cacheIDS.push(newValue.id);
        }

    }

    get follow() {
        return this.cacheRecords;
    }

    get followIDS(){
        return this._cacheIDS;
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


}

export default FollowStore;