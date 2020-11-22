import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist.API";
import {items} from "../actions/items.action";

export const fetchItems = () => async (dispatch: Dispatch) => {
    dispatch(items.loading(true))
    try {
        const res = await todolistAPI.getItems()
        dispatch(items.loading(false))
        dispatch(items.get(res))

    } catch (e) {
        dispatch(items.loading(false))
    }
}

export const setStatus = (id:string , status: boolean) => async (dispatch: Dispatch) => {
    dispatch(items.loading(true))
    try {
        const res = await todolistAPI.changeStatus(id, status)
        dispatch(items.loading(false))
        dispatch(items.setStatus(res._id, res.isDone))

    } catch (e) {
        dispatch(items.loading(false))
    }
}

export const deleteItem = (id:string) => async (dispatch: Dispatch) => {
    dispatch(items.loading(true))
    try {
        await todolistAPI.deleteItem(id)
        dispatch(items.loading(false))
        dispatch(items.deleteItem(id))

    } catch (e) {
        dispatch(items.loading(false))
    }
}

export const addItem = (title: string, order: number) => async (dispatch: Dispatch) => {
    dispatch(items.loading(true))
    try {
        const res = await todolistAPI.addItem(title, order)
        dispatch(items.loading(false))
        dispatch(items.add(res))

    } catch (e) {
        dispatch(items.loading(false))
    }
}

export const changeTitle = (id: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(items.loading(true))
    try {
        const res = await todolistAPI.changeTitle(id, title)
        dispatch(items.loading(false))
        dispatch(items.setTitle(res))

    } catch (e) {
        dispatch(items.loading(false))
    }
}