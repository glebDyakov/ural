import axios from 'axios'

export class GoodsRepository {
    API_KEY = import.meta.env.VITE_API_KEY
    API_BASE_URL = 'https://api.favorit-parts.ru'

    async fetchGoods(params) {
        const response = await axios.get(
            `${this.API_BASE_URL}/hs/hsprice/`,
            {
                params: { key: this.API_KEY,  ...params }
            }
        )
        const responseData = response.data

        if (responseData.error) throw new Error(responseData.error)

        if (response.status !== 200) throw new Error('Something went wrong')

        return responseData
            .goods
            .filter(manufacturer => Object.values(manufacturer).every(value => value))
    }
}
