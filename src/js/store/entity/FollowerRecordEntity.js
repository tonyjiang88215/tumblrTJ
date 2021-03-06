/**
 * Created by TonyJiang on 16/9/22.
 */
import Entity from './Entity';
import Immutable from 'immutable';

export default class FollowerRecord extends Entity {
    id;

    constructor(id) {
        super(id);
    }

    static get fields() {
        return Immutable.fromJS([
            {name: 'id'},
            {name: 'count', value: 0},
            {name: 'list'},
        ]);
    }

}