import {items, ItemsStateType, ItemType} from "../actions/items.action";
import { itemsReducer } from "../reducers/items.reducer";

describe('Action test', () => {
    let state: ItemsStateType;

    beforeEach(() => {
        state = {
            items: [
                {_id: '1', title: 'React', date: '12.02.2020', isDone: true, order: 1},
                {_id: '2', title: 'Redux', date: '12.05.2020', isDone: true, order: 2},
                {_id: '3', title: 'Next.js', date: '12.12.2020', isDone: false, order: 3},
                {_id: '4', title: 'JS', date: '12.10.2020', isDone: true, order: 4}
            ],
            loading: false
        }
    })

    it('should fetch all items', () => {
        const action = items.get(state.items)

        const newState = itemsReducer({items: [], loading: false}, action)

        expect(newState.items.length).toBe(4)
        expect(newState.items[2]._id).toBe('3')
        expect(newState.items[2].isDone).toBe(false)
        expect(newState.items[3].isDone).toBe(true)
    })

    it('should set new item at the beginning', () => {
        const newItem: ItemType = {
            _id: '5',
            title: 'Redux Toolkit',
            date: '12.02.2020',
            isDone: true,
            order: 5
        }
        const action = items.add(newItem)

        const newState = itemsReducer(state, action)

        expect(newState.items.length).toBe(5)
        expect(newState.items[0]._id).toBe('5')
    })

    it('should change title', () => {
        const newTitle = {_id: '2', title: 'Redux Toolkit'}
        const action = items.setTitle(newTitle)

        const newState = itemsReducer(state, action)

        expect(newState.items.length).toBe(4)
        expect(newState.items[1].title).toBe('Redux Toolkit')
        expect(newState.items[0].title).toBe('React')
    })

    it('should switch status', () => {
        const action = items.setStatus('3', true)

        const newState = itemsReducer(state, action)

        expect(newState.items.length).toBe(4)
        expect(newState.items[2].isDone).toBe(true)
        expect(newState.items[3].isDone).toBe(true)
    })

    it('should delete item', () => {
        const itemId = '3'
        const action = items.deleteItem(itemId)

        const newState = itemsReducer(state, action)

        expect(newState.items.length).toBe(3)
        expect(newState.items[2]._id).toBe('4')
        expect(newState.items[1].title).toBe('Redux')
    })

    it('loading should be true', () => {
        const action = items.loading(true)

        const newState = itemsReducer(state, action)

        expect(newState.items.length).toBe(4)
        expect(newState.items[3]._id).toBe('4')
        expect(newState.loading).toBeTruthy()
    })
})