import React, { memo, useEffect, useReducer, useRef, useState } from "react"
import cx from "classnames"
// noinspection ES6UnusedImports
import STYLE from "./ui.css"
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const DEFAULT_STATE = {
    visible: true
}

function reducer(state, action)
{
    return state;
}

const SelectButton = ({elem, index, active, onClick}) => {

    const ref = useRef(null)

    useEffect(() => {
        ref.current.appendChild(elem);
    }, [])

    return (
        <button
            ref={ ref }
            type="button"
            className={ cx("btn btn-sm m-1", active === index ? "btn-light" : "btn-default") }
            onClick={ onClick }
        />
    )
}


const SizeBadge = memo(({size}) => {

    return (
        <span
            className="badge badge-secondary ml-1"
            style={{
                visibility: size === 1 && "hidden"
            }}
        >
            {
                size + "x" + size
            }
        </span>
    )
})

const EditorUI = observer(({ editorState }) =>
{
    const { tiles, visible, activeTileIndex, activeTile } = editorState;

    return (
        <>
            <button
                type="button"
                accessKey="u"
                className={ cx("btn btn-default toggle", visible && "visible") }
                onClick={ () => editorState.toggleVisible()}
            >
                <i className="fas fa-arrows-alt-h"/>

            </button>
            <div
                className={ cx("sidebar", visible && "visible") }
                onFocusCapture={ () => editorState.toggleVisible(true)}

            >
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="form-control-plaintext border-bottom">
                                <strong>Island Rules Builder</strong>
                            </p>
                        </div>
                    </div>
                    <div className="row small">
                        <div className="col">

                            <strong>Selected:</strong>&nbsp;
                            {
                                activeTile.name
                            }
                            <SizeBadge size={ activeTile.size }/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="tile-selector flex">
                            {
                                tiles.map( (tile,idx) => (
                                    <SelectButton
                                        key={ idx }
                                        index={idx}
                                        active={ activeTileIndex }
                                        onClick={() => editorState.selectTile(idx)}
                                        elem={ tile.thumbnail }
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default EditorUI
