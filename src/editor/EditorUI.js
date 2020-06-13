import React, { memo, useEffect, useRef } from "react"
import cx from "classnames"
// noinspection ES6UnusedImports
import STYLE from "./ui.css"
import { observer } from "mobx-react-lite";

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


const SizeBadge = memo(({sizeX, sizeY }) => {

    return (
        <span
            className="badge badge-secondary ml-1"
            style={{
                visibility: sizeX === 1 && sizeY === 1 && "hidden"
            }}
        >
            {
                sizeX + "x" + sizeY
            }
        </span>
    )
})

const EditorUI = observer(({ editorState, download, clearAll }) =>
{
    const { tiles, visible, activeTileIndex, activeTile, dirty } = editorState;

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
                            <SizeBadge sizeX={ activeTile.sizeX } sizeY={ activeTile.sizeZ }/>
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
                    <div className="row">
                        <div className="col">
                            <i
                                className={ cx("fas mr-1", dirty ? "fa-spinner rotating" : "fa-check", dirty ? "text-muted" : "text-success" ) }
                                title={ dirty ? "Write pending" : "Synched to localStorage" }
                            />
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary mr-1"
                                onClick={ download }
                                >
                                Download JSON
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger mr-1"
                                onClick={ () =>{
                                    if (confirm("Do you really want to delete all tiles?"))
                                    {
                                        clearAll();
                                    }
                                } }
                                >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default EditorUI
