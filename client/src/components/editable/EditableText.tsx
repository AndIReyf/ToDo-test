import React from "react";
import './EditableText.css'
import {MyInput} from "../input/Input";
import {useDispatch} from "react-redux";
import {changeTitle} from "../../thunk/thunk.items";

export const EditableText = React.memo(function EditableText({text, id, isDone}: PropsType) {
    const dispatch = useDispatch()

    const [mode, setMode] = React.useState(false)
    const [title, setTitle] = React.useState(text)

    const toggleHandler = () => {
        setMode(prevState => !prevState)
        setTitle(text)
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const pressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && title.trim()) {
            dispatch(changeTitle(id, title))
            toggleHandler()
        }
    }

    return (
        <>
            {
                mode
                    ? <MyInput
                        onBlur={toggleHandler}
                        onChange={changeHandler}
                        onKeyPress={pressHandler}
                        value={title}
                    />
                    : <div className={`editable-title ${isDone ? 'done' : ''}`}
                           onDoubleClick={toggleHandler}>
                        {text}
                    </div>
            }
        </>
    )
})

type PropsType = {
    text: string
    id: string
    isDone: boolean
}
