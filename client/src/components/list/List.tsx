import React from 'react';
import './List.css'
import {Button, FormGroup, Input, ListGroup, ListGroupItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {EditableText} from "../editable/EditableText";
import {useDispatch, useSelector} from "react-redux";
import {ItemType} from "../../actions/items.action";
import {deleteItem, setStatus} from "../../thunk/thunk.items";
import {RootReducer} from "../../store/store";

export const List = React.memo(function List({isDisable}: PropsType) {
    const dispatch = useDispatch()
    const items = useSelector<RootReducer, Array<ItemType>>(state => state.items.items)

    const [currentItem, setCurrentItem] = React.useState(items[0])
    const [itemList, setItemList] = React.useState<ItemType[]>([])

    React.useEffect(() => {
        setItemList(items)
        setCurrentItem(items[0])
    }, [items])

    const overHandler = React.useCallback((e: any) => {
        e.preventDefault()

        if (e.target.classList.contains('editable-title')) {
            e.target.style.backgroundColor = '#cdcdcd'
        }
    }, [])

    const leaveHandler = React.useCallback((e: any) => e.target.style.backgroundColor = '#ffffff', [])
    const startHandler = React.useCallback((item: ItemType) => setCurrentItem(item), [])
    const endHandler = React.useCallback((e: any) => e.target.style.backgroundColor = '#ffffff', [])

    const dropHandler = React.useCallback((e: any, item: ItemType) => {
        e.preventDefault()

        const index = items.indexOf(currentItem)
        items.splice(index, 1)

        const indexDrop = items.indexOf(item)
        items.splice(indexDrop + 1, 0, currentItem)

        setItemList(items.map(i => {
            if (i._id === item._id) {
                return item
            }
            if (i._id === currentItem._id) {
                return currentItem
            }
            return i
        }))
        e.target.style.backgroundColor = '#ffffff'
    }, [currentItem, items])

    const statusHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        dispatch(setStatus(id, e.target.checked))
    }, [dispatch])

    const deleteHandler = React.useCallback((id: string) => dispatch(deleteItem(id)), [dispatch])

    const getTime = React.useCallback((data: string) => {
        const date = data.slice(0, data.indexOf('T'))
        const time = data.slice(data.indexOf('T') + 1, data.indexOf('.') - 3)

        return `${date.replace(/-/gi, '.')} ${time}`
    }, [])

    return (
        <ListGroup className={`listUL ${isDisable ? 'disable' : ''}`}>
            <TransitionGroup className='shopping-list'>
                {
                    itemList.map((item) => (
                        <CSSTransition key={item._id} timeout={500} classNames='fade'>
                            <ListGroupItem key={item._id} className='list-listGroup' draggable
                                           onDragEnd={endHandler}
                                           onDragStart={() => startHandler(item)}
                                           onDragLeave={leaveHandler}
                                           onDrop={(e) => dropHandler(e, item)}
                                           onDragOver={overHandler}
                            >
                                <FormGroup className='list-formGroup' check>
                                    <Input checked={item.isDone}
                                           onChange={(e) => statusHandler(e, item._id)}
                                           type="checkbox"
                                           name="check"
                                           id={item.title}
                                           className='list-checkbox'
                                    />
                                    <EditableText isDone={item.isDone}
                                                  text={item.title}
                                                  id={item._id}
                                    />
                                    <div className='list-date'>{getTime(item.date)}</div>
                                </FormGroup>
                                <Button
                                    className='remove-btn list'
                                    color='danger'
                                    size='small'
                                    onClick={() => deleteHandler(item._id)}
                                >
                                    &times;
                                </Button>
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </ListGroup>
    )
})

type PropsType = {
    isDisable: boolean
}
