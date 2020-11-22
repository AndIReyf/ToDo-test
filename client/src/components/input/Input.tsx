import React, {ChangeEvent, FocusEvent, KeyboardEvent} from "react";
import '../editable/EditableText.css'

export function MyInput({onKeyPress, onChange, onBlur, value}: PropsType) {
    return (
        <input
            onKeyPress={onKeyPress}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoFocus
            type='text'
            className='editable-input'
        />
    )
}

type PropsType = {
    value: string
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: FocusEvent<HTMLInputElement>) => void
}
