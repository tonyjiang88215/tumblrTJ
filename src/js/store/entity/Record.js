/**
 * Created by TonyJiang on 16/9/22.
 */
import Entity from './Entity';
export default class Record extends Entity {
    id;

    constructor(id) {
        super(id);
    }

    static get fields() {
        return Immutable.fromJS([
            {name: 'id'},
            {name: 'follow_id'},
            {name: 'original_json'},
        ]);
    }

}