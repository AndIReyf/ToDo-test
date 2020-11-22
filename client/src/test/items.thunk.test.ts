import {deleteItem, fetchItems, setStatus} from "../thunk/thunk.items";
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

const setTitleRes: ResponseType = {
    _id: '1',
    date: '20.02.2020',
    isDone: true,
    order: 1,
    title: 'Jest'
}


describe('Thunk tests', () => {


    todolistAPIMock.changeTitle.mockReturnValue(Promise.resolve(setTitleRes))
    todolistAPIMock.getItems.mockReturnValue(Promise.resolve(fetchItemsRes))
    todolistAPIMock.deleteItem.mockReturnValue(Promise.resolve(delRes))

    beforeEach(() => {
        dispatchMock.mockClear()
        todolistAPIMock.deleteItem.mockClear()
        todolistAPIMock.getItems.mockClear()
        todolistAPIMock.changeTitle.mockClear()
    })

    it('Delete success', async () => {
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
        const thunk = setStatus('1', false)
        await thunk(dispatchMock)

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, items.loading(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, items.loading(false))
        expect(dispatchMock).toHaveBeenLastCalledWith(false)
    })
})