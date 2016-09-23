/**
 * Created by TonyJiang on 16/7/15.
 */

import axios from 'axios';
import jsonp from '../libs/jsonp';

class TumblrAPI {

    //拉取新数据
    pull(prefix, start, size){

        const url = `http://${prefix}.tumblr.com/api/read/json?start=${start}&num=${size}`;

        return new Promise((resolve, reject) => {

            jsonp(url, {}, (err, data) => {

                console.log('111',arguments);

                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }



            });

        });


    }

    //获取blog信息
    blog(prefix){
        const url = `http://${prefix}.tumblr.com/api/read/json?start=0&num=0`;

        return new Promise((resolve, reject) => {

            jsonp(url, {}, (err, data) => {

                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }



            });

        });
    }



}

export default new TumblrAPI();