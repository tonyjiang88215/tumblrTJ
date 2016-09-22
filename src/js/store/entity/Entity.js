/**
 * Created by TonyJiang on 16/7/13.
 */
import {extendObservable} from 'mobx';

class Entity {
    id;
    _store;

    constructor(id) {
        this.id = id;
        this.initObservable(this.getClass().fields);
    }

    static connect(store) {
        this._store = store;
        return this;
    }

    static get store() {
        return this._store;
    }

    static get fields() {}

    getClass() {
        return this.constructor;
    }

    initObservable(fields) {
        const dump = {};

        fields
            .filter(field => {
                return field.get('name').toLowerCase() !== 'id';
            })
            .forEach(field => {
                dump[field.get('name')] = undefined;
            });

        extendObservable(this, dump);
    }
}

export default Entity;
