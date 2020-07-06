import React from "react"
import cx from "classnames"


const Sidebar = ({ visible, setVisible, children }) => {

    return (
        <>
            <button
                type="button"
                accessKey="u"
                className={cx("btn btn-default toggle", visible && "visible")}
                onClick={() => setVisible(!visible)}
            >
                <i className="fas fa-arrows-alt-h"/>

            </button>
            <div
                className={ cx("sidebar", visible && "visible") }
                onFocusCapture={() => setVisible(true)}

            >
                <div className="container-fluid">
                    {
                        children
                    }
                </div>
            </div>
        </>

    );
};

export default Sidebar;
