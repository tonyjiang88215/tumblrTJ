/**
 * Created by TonyJiang on 16/7/15.
 */
import React from 'react';
import {ListItem} from 'material-ui/List';

class FollowListItem extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        item: React.PropTypes.object.isRequired
    };

    static contextTypes = {
        selected: React.PropTypes.number
    };

    state = {
        totalCount: '--',
        finishCount: '--'
    };

    componentDidMount() {

        // this.checkBlogUpdate(this.props.item);

    }

    render() {
        const {id, name} = this.props.item;
        const {selected} = this.context;

        const className = 'following-item ' + (id == selected ? 'selected' : '');

        return (
            <div className={className} onClick={::this.onClick}>
                <div className="following-item-label">{name}</div>
                <div className="sync-number">
                    <div className="material-icons delete-icon" onClick={this.onDelete} >delete</div>
                </div>
            </div>
        );
    }

    onClick(){

        this.props.onClick && this.props.onClick(this.props.item);

    }

    onDelete(){

        this.props.onDelete && this.props.onDelete(this.props.item);

    }

}


export default FollowListItem;