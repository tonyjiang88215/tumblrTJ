/**
 * Created by TonyJiang on 16/7/15.
 */

import tumblrAPI from '../api/tumblr';
import store from '../store';

class BlogSync{

    _maxThreadCount = 4;

    _currentThreadCount = 0;

    constructor(){

        this.initialize();

    }

    initialize(){

        this._queue = [];

    }

    canDo(){
        return this._currentThreadCount < this._maxThreadCount && this._queue.length > 0;
    }

    next(){

        this._currentThreadCount++;

        const {follower, resolve, reject} = this._queue.shift();

        Promise.all([
            tumblrAPI.blog(follower.prefix),
            store.recordStore.getRecordCount(follower.id)

        ]).then(([blogInfo, finishCount]) => {

            this._currentThreadCount--;
            if(this.canDo()){
                this.next();
            }

            this._currentThreadCount--;
            resolve({blogInfo, finishCount});


        }).catch(err => {
            return Promise.reject(err);
        });




    }

    push(follower){

        return new Promise((resolve, reject) => {
            this._queue.push({follower, resolve, reject});

            if(this.canDo()){
                this.next();
            }

        });



    }

}

export default new BlogSync();