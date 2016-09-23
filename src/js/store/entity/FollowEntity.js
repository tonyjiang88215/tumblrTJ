/**
 * Created by TonyJiang on 16/9/23.
 */
import Entity from "./Entity";
import Immutable from 'immutable';

export default class FollowEntity extends Entity {
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