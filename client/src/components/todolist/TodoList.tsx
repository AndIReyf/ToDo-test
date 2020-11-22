import React from 'react';
import './TodoList.css';
import {Card} from 'reactstrap';
import {List} from '../list/List';
import {IModal} from '../modal/Modal';
import {ISpinner} from "../spinner/Spinner";
import {useSelector} from "react-redux";
import {RootReducer} from "../../store/store";

export const TodoList = React.memo(function TodoList() {
    const loading = useSelector<RootReducer, boolean>(state => state.items.loading)

    return (
        <Card className='todoList' body inverse>
            <IModal title='Add item' color='primary'/>
            <List isDisable={loading}/>
            {loading && <ISpinner/>}
        </Card>
    )
})