import {ItemsStateType, ItemActionType} from "../actions/items.action"

const initState: ItemsStateType = {
    items: [],
    loading: false
}

export const itemsReducer = (state: ItemsStateType = initState, action: ItemActionType): ItemsStateType => {
    switch (action.type) {
        case "GET_ITEMS":
            return {
                ...state,
                items: action.payload
            }
        case "ADD_ITEM":
            return {
                ...state,
                items: [
                    {
                        _id: action.payload._id,
                        title: action.payload.title,
                        date: action.payload.date,
                        isDone: action.payload.isDone,
                        order: action.payload.order
                    },
                    ...state.items
                ]
            }
        case "SET_TITLE": {
            return {
                ...state,
                items: state.items.map(i => i._id === action.payload._id
                    ? {...i, title: action.payload.title} : i)
            }
        }
        case "SET_STATUS": {
            return {
                ...state,
                items: state.items.map(i => i._id === action._id
                    ? {...i, isDone: action.status} : i)
            }
        }
        case "DELETE_ITEM": {
            return {
                ...state,
                items: state.items.filter(item => item._id !== action._id)
            }
        }
        case "LOADING_ITEM": {
            return {
                ...state,
                loading: action.status
            }
        }
        default:
            return state
    }
}
