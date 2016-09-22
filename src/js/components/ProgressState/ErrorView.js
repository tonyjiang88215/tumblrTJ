
import React from 'react';

const ErrowView = (props) => {
    const { info, buttonVisible, onClick, buttonTitle } = props;

    return (
        <div className="progressState">
            <ul>
                <li className="icon">&#xe600;</li>
                {info &&
                <li className="text">{info}</li>
                }
                {buttonVisible &&
                <li className="btn540 btnWhite addBtn" onClick={onClick}>{buttonTitle}</li>
                }
            </ul>
        </div>
    );
};

ErrowView.propTypes = {
    info: React.PropTypes.string,
    buttonVisible: React.PropTypes.bool,
    buttonTitle: React.PropTypes.string,
    onClick: React.PropTypes.func,
};

export default ErrowView;
