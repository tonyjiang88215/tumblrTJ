/**
 * Created by TonyJiang on 16/7/15.
 */
import React from 'react';
import {ListItem} from 'material-ui/List';

import blogSync from '../../module/BlogSync';
import store from '../../store';


class FollowListItem extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        blog: React.PropTypes.object.isRequired
    };

    static contextTypes = {
        selected: React.PropTypes.number
    };

    state = {
        totalCount: '--',
        finishCount: '--'
    };

    componentDidMount() {

        // this.checkBlogUpdate(this.props.blog);

    }

    render() {

        const {id, name} = this.props.blog;
        const {selected} = this.context;

        const className = 'following-item ' + (id == selected ? 'selected' : '');

        return (
            // <ListItem
            //     className="following-item"
            //     primaryText={name}
            //     onTouchTap={this.onClick.bind(this)}
            // />
            <div className={className} onClick={::this.onClick}>
                <div className="following-item-label">{name}</div>
                <div className="sync-number">
                    {/*<div className="number label label-primary">{this.state.totalCount}</div>*/}
                    {/*<div className="number label label-success">{this.state.finishCount}</div>*/}
                </div>
            </div>
        );
    }

    checkBlogUpdate(blog) {
        blogSync.push(blog).then(data => {

            const {blogInfo, finishCount} = data;

            this.setState({totalCount: blogInfo['posts-total'], finishCount});

            store.followStore.syncFollow(blog.id, blogInfo, finishCount);

        });
    }


    onClick() {

        this.props.onClick && this.props.onClick(this.props.blog);

    }

}


export default FollowListItem;