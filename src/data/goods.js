import axios from 'axios'

export class GoodsRepository {
    API_BASE_URL = 'https://api.favorit-parts.ru'
    API_KEY = '00000000-0000-0000-0000-000000000001'

    async fetchBrands(number) {
        const response =
            await axios.get(`${this.API_BASE_URL}/hs/hsprice/`, {
                params: {
                    key: this.API_KEY,
                    number
                }
            })
        const responseData = response.data
        if (responseData.error) {
            throw new Error(responseData.error)
        }

        if (response.status !== 200) {
            throw new Error('Something went wrong')
        }

        return responseData
            .goods
            .filter(manufacturer => Object.values(manufacturer).every(value => value))
    }
}
