import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { itemsReducer } from "../reducers/items.reducer";

const reducers = combineReducers({
    items: itemsReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type RootReducer = ReturnType<typeof reducers>
