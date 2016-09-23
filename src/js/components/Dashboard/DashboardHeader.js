/**
 * Created by TonyJiang on 16/7/18.
 */
import React from 'React';
import api from '../../api/TumblrAPI';
import store from '../../store';
import {observable, observe, transaction, action} from 'mobx';
import {observer} from 'mobx-react';

@observer
class DashboardHeader extends React.Component {

    static propTypes = {
        follower: React.PropTypes.object.isRequired
    };

    render() {
        const {follower} = this.props;
        const {tumblelog} = follower.info;
        const {title, description, name} = tumblelog;

        return (
            <div className="db-header h6">
                <div className="header-title h3">
                    <div className="header-left">
                        <div className="name">{title}({name})</div>
                    </div>
                </div>
                <div className="header-description text-muted" dangerouslySetInnerHTML={{__html:description}}></div>

            </div>
        );


    }




}

export default DashboardHeader;