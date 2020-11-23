import {addItem, changeTitle, deleteItem, fetchItems, setStatus} from "../thunk/thunk.items";
import {ResponseItemsType, ResponseMsgType, ResponseType, todolistAPI} from "../api/todolist.API";
import {items} from "../actions/items.action";

jest.mock("../api/todolist.API")

const dispatchMock = jest.fn()
const todolistAPIMock = todolistAPI as jest.Mocked<typeof todolistAPI>

const delRes: ResponseMsgType = {
    msg: 'Success',
    success: true
}

const fetchItemsRes: ResponseItemsType = [
    {
        _id: '1',
        date: '20.02.2020',
        isDone: true,
        order: 1,
        title: 'Jest'
    }
]

const res: ResponseType = {
    _id: '1',
    date: '20.02.2020',
    isDone: true,
    order: 1,
    title: 'Jest'
}

describe('Thunk tests', () => {
    todolistAPIMock.changeTitle.mockReturnValue(Promise.resolve(res))
    todolistAPIMock.getItems.mockReturnValue(Promise.resolve(fetchItemsRes))
    todolistAPIMock.deleteItem.mockReturnValue(Promise.resolve(delRes))
    todolistAPIMock.addItem.mockReturnValue(Promise.resolve(res))
    todolistAPIMock.changeTitle.mockReturnValue(Promise.resolve(res))

    beforeEach(() => {
        dispatchMock.mockClear()
        todolistAPIMock.deleteItem.mockClear()
        todolistAPIMock.getItems.mockClear()
        todolistAPIMock.changeTitle.mockClear()
        todolistAPIMock.addItem.mockClear()
        todolistAPIMock.changeTitle.mockClear()
    })

    it('Delete item success', async () => {
        const thunk = deleteItem('1')
        await thunk(dispatchMock)

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, items.loading(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, items.loading(false))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, items.deleteItem('1'))
    })

    it('Fetch items success', async () => {
        const thunk = fetchItems()
        await thunk(dispatchMock)

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, items.loading(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, items.loading(false))
    })

    it('Set status success', async () => {
        const thunk = setStatus('1', true)
        await thunk(dispatchMock)

        expect(dispatchMock).toBeCalledTimes(3)
    })

    it('Add item success', async () => {
        const thunk = addItem('React', 5)
        await thunk(dispatchMock)

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, items.loading(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, items.loading(false))
    })

    it('Change title item success', async () => {
        const thunk = changeTitle('1', 'React')
        await thunk(dispatchMock)

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, items.loading(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, items.loading(false))
    })
})