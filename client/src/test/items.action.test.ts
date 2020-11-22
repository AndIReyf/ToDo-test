import {items, ItemsStateType} from "../actions/items.action";
import { itemsReducer } from "../reducers/items.reducer";

describe('action test', () => {
    let state: ItemsStateType;

    beforeEach(() => {
        state = [
            {_id: '1', title: 'React', date: '12.02.2020', isDone: true},
            {_id: '2', title: 'Redux', date: '12.05.2020', isDone: true},
            {_id: '3', title: 'Next.js', date: '12.12.2020', isDone: false},
            {_id: '4', title: 'JS', date: '12.10.2020', isDone: true}
        ]
    })

    it('should fetch all items', () => {
        const action = items.get()

        const newState = itemsReducer(state, action)

        expect(newState.length).toBe(4)
        expect(newState[2]._id).toBe('3')
        expect(newState[2].isDone).toBe(false)
        expect(newState[3].isDone).toBe(true)
    })

    it('should set new item at the beginning', () => {
        const newItem = {_id: '5', title: 'Redux Toolkit', date: '12.02.2020', isDone: true}
        const action = items.set(newItem)

        const newState = itemsReducer(state, action)

        expect(newState.length).toBe(5)
        expect(newState[0]._id).toBe('5')
    })

    it('should change title', () => {
        const newTitle = {_id: '2', title: 'Redux Toolkit'}
        const action = items.setTitle(newTitle)

        const newState = itemsReducer(state, action)

        expect(newState.length).toBe(4)
        expect(newState[1].title).toBe('Redux Toolkit')
        expect(newState[0].title).toBe('React')
    })

    it('should switch status', () => {
        const itemId = '3'
        const action = items.setStatus(itemId)

        const newState = itemsReducer(state, action)

        expect(newState.length).toBe(4)
        expect(newState[2].isDone).toBe(true)
        expect(newState[3].isDone).toBe(true)
    })

    it('should delete item', () => {
        const itemId = '3'
        const action = items.deleteItem(itemId)

        const newState = itemsReducer(state, action)

        expect(newState.length).toBe(3)
        expect(newState[2]._id).toBe('4')
        expect(newState[1].title).toBe('Redux')
    })
})