import axios from "axios"

export const todolistAPI = {
    async getItems() {
        const res = await axios.get<ResponseItemsType>('/api/items')
        return res.data
    },
    async addItem(title: string, order: number) {
        const res = await axios.post<ResponseType>('/api/items', {title, order})
        return res.data
    },
    async changeTitle(id: string, title: string) {
        const res = await axios.put<ResponseType>('/api/items', {id, title})
        return res.data
    },
    async changeStatus(id: string, status: boolean) {
        const res = await axios.put<ResponseType>('api/items/status', {id, status})
        return res.data
    },
    deleteItem(id: string) {
        return axios.delete(`api/items/${id}`) as Promise<ResponseMsgType>
    },
}

export type ResponseType = {
    isDone: boolean
    _id: string
    title: string
    date: string
    order: number
}

export type ResponseItemsType = Array<ResponseType>

export type ResponseMsgType = {
    msg?: string
    success: boolean
}
