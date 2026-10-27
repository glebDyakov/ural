import './DetailPage.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SpinnerView } from '~/components/SpinnerView'
import { StatusView } from '~/components/StatusView'
import { fetchGoods } from '~/store/brands/slice'

const formatter =
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

const DetailPage = () => {
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.brands.isLoading)
    
    const list = useSelector(state => state.brands.list)
    
    const error = useSelector(state => state.brands.error)

    const { number, brand } = useParams()
    
    useEffect(() => {
        dispatch(
            fetchGoods({ number, brand, analogues: 'on' })
        )
    }, [])

    if (list) return (
        <div className="table-responsive container py-4">
            <table className="table text-nowrap">
                <thead>
                    <tr>
                        <th scope="col">
                            Название/Производитель
                        </th>
                        <th scope="col">
                            Стоимость
                        </th>
                        <th scope="col">
                            Доступный остаток на складе
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.flatMap(row => row.warehouses).map(offer => (
                            <tr key={offer.id}>
                                    <th scope="row">{[offer.brand, offer.code]}</th>
                                    <td>{formatter.format(offer.price)}</td>
                                    <td>{offer.stock}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
    
    if (error) return (
        <StatusView className="container my-4" message={error.message} />
    )
    
    if (isLoading) return (
        <div className="d-flex vw-100 vh-100 justify-content-center align-items-center">
            <SpinnerView />
        </div>
    )

    return <></>
}

export default DetailPage
