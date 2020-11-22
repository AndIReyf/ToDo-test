const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const SET_TITLE = 'SET_TITLE'
const SET_STATUS = 'SET_STATUS'
const DELETE_ITEM = 'DELETE_ITEM'
const LOADING_ITEM = 'LOADING_ITEM'

// Action Creator
export const items = {
    get(payload: Array<ItemType>) {
        return {type: GET_ITEMS, payload} as const
    },
    add(payload: ItemType) {
        return {type: ADD_ITEM, payload} as const
    },
    setTitle(payload: {_id: string, title: string}) {
        return {type: SET_TITLE, payload} as const
    },
    setStatus(_id: string, status: boolean) {
        return {type: SET_STATUS, _id, status} as const
    },
    deleteItem(_id: string) {
        return {type: DELETE_ITEM, _id} as const
    },
    loading(status: boolean) {
        return {type: LOADING_ITEM, status} as const
    }
}

// Types
export type ItemsStateType = {
    items: Array<ItemType>
    loading: boolean
}
export type ItemType = {
    _id: string
    title: string
    date: string
    isDone: boolean
    order: number
}
export type ItemActionType = ReturnType<typeof items.get>
    | ReturnType<typeof items.add>
    | ReturnType<typeof items.setTitle>
    | ReturnType<typeof items.setStatus>
    | ReturnType<typeof items.deleteItem>
    | ReturnType<typeof items.loading>
