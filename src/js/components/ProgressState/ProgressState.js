/**
 * Created by luosong on 16/4/6.
 */

import React from 'react';
import LoadingView from '../Loading';
import EmptyView from './EmptyView';
import ErrorView from './ErrorView';
import {observer} from 'mobx-react';

@observer
class ProgressState extends React.Component {
    static defaultProps = {
        state: 'show',
        error: {buttonTitle: '重试', buttonVisible: true},
        empty: {info: '哎呀, 这里空空的什么都没有', buttonTitle: '添点啥吧', buttonVisible: true},
    };

    /**
     * 返回 ProgressState, 规则如下:
     * 1. error 优先,如果有error, 则状态为 error
     * 2. 否则如果 loading, 则状态为 load
     * 3. 否则如果 notEmpty, 则状态为 show
     * 4. 否则为 empty
     * @param loading
     * @param notEmptu
     * @param error
     * @returns {*}
     */
    static gotProgressState = (loading, notEmpty, error) => {
        let progressState;

        if (error) {
            progressState = 'error';
        }
        else if (loading) {
            progressState = 'load';
        }
        else if (notEmpty) {
            progressState = 'show';
        }
        else {
            progressState = 'empty';
        }

        return progressState;
    };

    static propTypes = {
        state: React.PropTypes.oneOf(['wait', 'load', 'show', 'error', 'empty']),
        empty: React.PropTypes.shape({
            info: React.PropTypes.string,
            buttonTitle: React.PropTypes.string,
            onClick: React.PropTypes.func,
            buttonVisible: React.PropTypes.bool
        }),
        error: React.PropTypes.shape({
            info: React.PropTypes.string,
            buttonTitle: React.PropTypes.string,
            onClick: React.PropTypes.func,
            buttonVisible: React.PropTypes.bool
        }),
        children: React.PropTypes.node
    }

    render() {
        const {
            state,
            empty,
            error,
            children
        } = this.props;

        return (
            <div style={{height: '100%'}}>
                {state === 'load' &&
                <LoadingView />
                }
                {state === 'empty' && empty &&
                <EmptyView {...ProgressState.defaultProps.empty} {...empty}  />
                }
                {state === 'error' && error &&
                <ErrorView {...ProgressState.defaultProps.error} {...error} />
                }
                {state === 'show' &&
                children
                }
            </div>
        );
    }
}

export default ProgressState;
