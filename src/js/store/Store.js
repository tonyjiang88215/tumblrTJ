/**
 * Created by TonyJiang on 16/9/23.
 */

import {observable, transaction, map} from 'mobx';

export default class Store{

    _entityClass = null;
    // @observable _cacheRecords = map();

    constructor(entityClass){
        this._entityClass = entityClass;
        this._cacheRecords = observable(map());
    }


    _syncCacheModel(item) {
        const id = item.id;

        const cacheItem = this._getCache(id, true, (_cacheItem) => {

            const fields = this._entityClass.fields.toJS();
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

    _getCache(id, createIfNotExists = true, dataSetter){
        let item = this._cacheRecords.get(`${id}`);

        if (!item && createIfNotExists) {
            item = new this._entityClass(id);

            if (typeof(dataSetter) === 'function') {
                dataSetter(item);
            }

            this._cacheRecords.set(`${id}`, item);
        }
        else {
            if (typeof(dataSetter) === 'function') {
                dataSetter(item);
            }
        }

        return item;
    }

    hasCache(id){
        return this._cacheRecords.has(`${id}`);
    }

    get cacheRecords(){
        return this._cacheRecords;
    }

}

