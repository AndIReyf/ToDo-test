import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist.API";
import {items} from "../actions/items.action";

export const fetchItems = () => async (dispatch: Dispatch) => {
    try {
        const res = await todolistAPI.getItems()

        dispatch(items.get(res))

    } catch (e) {

    }
}

export const setStatus = (id:string , status: boolean) => async (dispatch: Dispatch) => {

    try {
        const res = await todolistAPI.changeStatus(id, status)

        dispatch(items.setStatus({_id: res._id, status: res.isDone}))

    } catch (e) {

    }
}

export const deleteItem = (id:string) => async (dispatch: Dispatch) => {

    try {
        await todolistAPI.deleteItem(id)

        dispatch(items.deleteItem(id))

    } catch (e) {

    }
}

export const addItem = (title: string, order: number) => async (dispatch: Dispatch) => {

    try {
        const res = await todolistAPI.addItem(title, order)

        dispatch(items.add(res))

    } catch (e) {

    }
}

export const changeTitle = (id: string, title: string) => async (dispatch: Dispatch) => {

    try {
        const res = await todolistAPI.changeTitle(id, title)

        dispatch(items.setTitle(res))

    } catch (e) {

    }
}