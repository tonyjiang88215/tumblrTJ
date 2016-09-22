
import React, {Component} from 'react';

class EmptyView extends Component{

    static contextTypes = {
        muiTheme: React.PropTypes.object.isRequired
    };

    static propTypes = {
        info: React.PropTypes.string,
        buttonVisible: React.PropTypes.bool,
        buttonTitle: React.PropTypes.string,
        onClick: React.PropTypes.func
    };

    constructor(props,context){
        super(props,context);
        const baseTheme = this.context.muiTheme.baseTheme;
        this.iconStyle = {
            display: 'block',
            margin: '0 auto',
            width: '100px',
            height: '100px',
            fontSize: '100px',
            color: baseTheme.palette.disabledColor
        };
    }

    render() {
        const { info, buttonVisible, onClick, buttonTitle } = this.props;

        return (
            <div className="progressState">
                <ul>
                    <li style={this.iconStyle} className="chanjet-icon-empty-content"></li>
                    {info &&
                    <li className="text">{info}</li>
                    }
                    {buttonVisible &&
                    <li className="btn540 btnWhite addBtn" onClick={onClick}>{buttonTitle}</li>
                    }
                </ul>
            </div>
        );
    }

}

export default EmptyView;
