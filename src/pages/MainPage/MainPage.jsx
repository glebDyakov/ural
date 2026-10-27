import './MainPage.css'
import debounce from 'lodash.debounce'
import { useSelector, useDispatch } from 'react-redux'
import { generatePath, useNavigate } from 'react-router-dom'
import { SpinnerView } from '~/components/SpinnerView'
import { StatusView } from '~/components/StatusView'
import { routes } from '~/routes'
import { fetchGoods } from '~/store/brands/slice'

const MainPage = () => {
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.brands.isLoading)
    
    const list = useSelector(state => state.brands.list)
    
    const error = useSelector(state => state.brands.error)

    const onChange = event => dispatch(fetchGoods({ number: event.target.value }))

    const handleInput = debounce(onChange, 1000)

    const handleSubmit = event => event.preventDefault()

    const navigate = useNavigate()
    
    const handleManufacturerClick = (number, brand) =>
        navigate(generatePath(routes.detail, { number, brand }))

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Номер производителя"
                name="number"
                onChange={handleInput} />
            {
                isLoading ?
                    <SpinnerView />
                : error ?
                    <StatusView message={error.message} />
                : list ?
                    <ul className="list-group">
                        {
                            list.map(manufacturer =>
                                (
                                    <li
                                        key={manufacturer.brand}
                                        className="list-group-item"
                                        onClick={() => handleManufacturerClick(manufacturer.number, manufacturer.brand)}>
                                        {manufacturer.brand}
                                    </li>
                                )
                            )
                        }
                    </ul>
                :
                    <></>
            }
        </form>
    )
}

export default MainPage
