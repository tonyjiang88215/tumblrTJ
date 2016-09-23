/**
 * Created by TonyJiang on 16/7/15.
 */
import React from 'react';
import {ListItem} from 'material-ui/List';

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
            <div className={className} onClick={::this.onClick}>
                <div className="following-item-label">{name}</div>
                <div className="sync-number">
                    {/*<div className="number label label-primary">{this.state.totalCount}</div>*/}
                    {/*<div className="number label label-success">{this.state.finishCount}</div>*/}
                </div>
            </div>
        );
    }

    onClick() {

        this.props.onClick && this.props.onClick(this.props.blog);

    }

}


export default FollowListItem;