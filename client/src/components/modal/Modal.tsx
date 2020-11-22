import React, {ChangeEvent, FormEvent} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../thunk/thunk.items";
import {RootReducer} from "../../store/store";
import {ItemType} from "../../actions/items.action";

export const IModal = React.memo(function IModal({title, color}: PropsType) {
    const dispatch = useDispatch()
    const items = useSelector<RootReducer, Array<ItemType>>(state => state.items.items)

    const [modal, setModal] = React.useState(false)
    const [value, setValue] = React.useState('')

    const toggleHandler = React.useCallback(() => setModal(!modal),[modal])

    const changeHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, [])

    const submitHandler = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (value.trim()) {
            dispatch(addItem(value, items.length))
        }

        setValue('')
        toggleHandler()
    }, [dispatch, value, toggleHandler, items.length])

    return (
        <div>
            <Button style={{width: '100%'}} color={color} onClick={toggleHandler}>{title}</Button>
            <Modal isOpen={modal} toggle={toggleHandler}>
                <ModalHeader toggle={toggleHandler}>Todo item</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler}>
                        <FormGroup>
                            <Label for='item'>Title</Label>
                            <Input type='text' name='name' id='item' value={value}
                                   placeholder='Title here'
                                   onChange={changeHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" style={{marginRight: '10px'}}>Add</Button>
                            <Button color="secondary" onClick={toggleHandler}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
})

type PropsType = {
    title: string
    color: string
}
