/**
 * Created by TonyJiang on 16/9/22.
 */
import axios from 'axios';

export default class recordAPI{

    getFavoriteList(follower_id){
        return axios.get(`http://localhost:3000/record/list/${follower_id}`)
            .then(response => {
                const {status, data} = response;
                if (status == 200) {

                    if(data.result == true){
                        return Promise.resolve(data.data);
                    }else{
                        return Promise.reject(data.message);
                    }

                }else{
                    return Promise.reject('网络错误');
                }
            }).catch(err => {
                return Promise.reject(err);
            });
    }

}