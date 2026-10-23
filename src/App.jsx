import './App.css'
import debounce from 'lodash.debounce'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBrands } from './store/brands/slice'

const App = () => {
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.brands.isLoading)
    
    const list = useSelector(state => state.brands.list)
    
    const error = useSelector(state => state.brands.error)

    const onChange = event => dispatch(fetchBrands(event.target.value))

    const handleInput = debounce(onChange, 1000)

    const handleSubmit = event => event.preventDefault()

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Номер производителя"
                name="number"
                onChange={handleInput} />
            {
                isLoading ?
                    <div className="spinner-border" role="status" />
                : error ?
                    <div className="alert alert-danger" role="alert">{error.message}</div>
                : list ?
                    <ul className="list-group">
                        {
                            list.map(manufacturer =>
                                (
                                    <li key={manufacturer.brand} className="list-group-item">
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

export default App
