/**
 * Created by TonyJiang on 16/7/11.
 */
import React from 'react';
import {observable, observe, transaction} from 'mobx';
import {observer} from 'mobx-react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import tumblrAPI from '../../api/tumblr';
import TipHelper from '../../helpers/tip';
import store from '../../store';

@observer
class AddFollow extends React.Component {

    static propTypes = {
        open: React.PropTypes.bool.isRequired,
        onRequestClose: React.PropTypes.func
    };

    static defaultProps = {
        open: false,
        onRequestClose: () => {
        }
    };

    data = {
        name: '',
        prefix: '',
        info: {}
    };


    state = {};

    constructor(...args) {
        super(...args);

        this.initialize();
    }

    initialize() {

        this.uiState = observable({
           loading: false
        });

        this.onAddFollow = ::this.onAddFollow;
        this.onClose = ::this.onClose;
    }

    get styles(){
        return {
            dialog: {
                width: 400
            },

            loading: {
                display: this.uiState.loading ? '' : 'none',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
            },

            loadingBackground: {
                width: '100%', height: '100%',
                background: '#333',
                opacity: 0.3
            },
            refresh: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -25,
                marginLeft: -25,
            }
        };
    }


    actions() {
        return [
            <FlatButton
                label="取消"
                primary={false}
                onTouchTap={this.onClose}
            />,

            <FlatButton
                label="添加"
                primary={true}
                keyboardFocus={true}
                onTouchTap={this.onAddFollow}
            />
        ]
    }

    render() {

        const actions = this.actions();

        return (
            <Dialog
                title="新增关注"
                actions={actions}
                modal={false}
                open={this.props.open}
                contentStyle={this.styles.dialog}

                onRequestClose={this.onClose}
            >

                <TextField ref="name" floatingLabelText="博客名称" underlineShow={false}
                           onBlur={this.onChange.bind(this, 'name')}/>
                <Divider />
                <TextField ref="prefix" floatingLabelText="博客prefix" underlineShow={false}
                           onBlur={this.onChange.bind(this, 'prefix')}/>
                <Divider />

                <div style={this.styles.loading}>
                    <div style={this.styles.loadingBackground}></div>
                    <RefreshIndicator
                        size={50}
                        loadingColor={"#FF9800"}
                        status="loading"
                        style={this.styles.refresh}
                    />
                </div>


            </Dialog>
        );
    }

    onChange(field, e) {
        this.data[field] = e.target.value;
    }

    onAddFollow() {

        if(this.uiState.loading){
            return;
        }

        this.uiState.loading = true;

        tumblrAPI.blog(this.data.prefix).then(blogInfo => {
           this.data.info = blogInfo;

            store.followStore.addFollow(this.data).then(response => {
                this.uiState.loading = false;
                this.onClose();
                TipHelper.show({message: '关注成功'});
            }).catch(err => {
                console.log(err);
                this.uiState.loading = false;
                TipHelper.show({message: err});
            });

        }).catch(err => {
            this.uiState.loading = false;
            TipHelper.show({message: '关注失败'});
        });
        


    }

    onClose() {

        this.props.onRequestClose();
    }

}

export default AddFollow;