import { observer } from "mobx-react-lite";
import Sidebar from "../editor/Sidebar";
import React, { useState } from "react";
import { action } from "mobx";
import cx from "classnames";


const changeValue = action("BendUI.changeValue", (state, name, value) => {
    state[name] = value;
})
const NumberInput = observer(({ state, name, limit }) => {
    const [error, setError] = useState("")

    const id = "input-" + name;

    const haveError = !!error;

    return (
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor={ id }>
                    {
                        name
                    }
                </label>
                <input
                    id={ id }
                    type="number"
                    className={ cx("form-control", "form-control-sm", haveError && "text-danger") }
                    min={ 0 }
                    max={ limit }
                    step={ limit > 100 ? 5 : 2 }
                    value={ error || state[name] }
                    onChange={ev => {
                        const value = +ev.target.value;
                        if (isNaN(value) || value < 0 || value > limit)
                        {
                            setError(ev.target.value)
                        }
                        else
                        {
                            if (haveError)
                            {
                                setError("");
                            }
                            changeValue(state, name, value);
                        }
                    }}

                />
            </div>
        </div>

    );
})
export const BendUI = observer(({ state }) => {

    return ((
        <Sidebar
            visible={ state.visible }
            setVisible={ v => state.toggle(v) }

        >
            <div className="row">
                <div className="col">
                    <p className="form-control-plaintext border-bottom">
                        <strong>Bend</strong>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form">
                        <NumberInput
                            state={ state }
                            name="stiffness"
                            limit={ 100 }
                        />
                        <NumberInput
                            state={ state }
                            name="strength"
                            limit={ 100 }
                        />
                        <NumberInput
                            state={ state }
                            name="angle"
                            limit={ 360 }
                        />
                    </div>
                </div>
            </div>
        </Sidebar>
    ))
})
