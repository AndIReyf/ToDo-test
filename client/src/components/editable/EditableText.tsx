import React from "react";
import './EditableText.css'
import {MyInput} from "../input/Input";
import {useDispatch} from "react-redux";
import {changeTitle} from "../../thunk/thunk.items";

export const EditableText = React.memo(function EditableText({text, id, isDone}: PropsType) {
    const dispatch = useDispatch()

    const [mode, setMode] = React.useState(false)
    const [title, setTitle] = React.useState(text)

    const toggleHandler = React.useCallback(() => {
        setMode(prevState => !prevState)
        setTitle(text)
    }, [text])

    const changeHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    const pressHandler = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && title.trim()) {
            dispatch(changeTitle(id, title))
            toggleHandler()
        }
    }, [dispatch, id, title, toggleHandler])

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
