import React from 'react';
import {Card} from 'reactstrap';
import {List} from '../list/List';
import {IModal} from '../modal/Modal';

export const Todo = () => {
    return (
        <Card body inverse style={{backgroundColor: '#333', borderColor: '#333'}}>
            <IModal title='Add item' color='primary'/>
            <List/>
        </Card>
    )
}