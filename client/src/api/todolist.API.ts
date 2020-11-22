import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/items'
})

export const todolistAPI = {
    async getItems() {
        const res = await instance.get<ResponseItemsType>('/')
        return res.data
    },
    async addItem(title: string, order: number) {
        const res = await instance.post<ResponseType>('/', {title, order})
        return res.data
    },
    async changeTitle(id: string, title: string) {
        const res = await instance.put<ResponseType>('/', {id, title})
        return res.data
    },
    async changeStatus(id: string, status: boolean) {
        const res = await instance.put<ResponseType>('/status', {id, status})
        return res.data
    },
    deleteItem(id: string) {
        return instance.delete<ResponseMsgType>(`/${id}`)
    },
}

type ResponseType = {
    isDone: boolean
    _id: string
    title: string
    date: string
    order: number
}

type ResponseItemsType = Array<ResponseType>

type ResponseMsgType = {
    msg?: string
    success: boolean
}
