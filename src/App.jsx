import './App.css'
import debounce from 'lodash.debounce'

const App = () => {
    const onChange = () => {
        // TODO: request/display data 
    }

    const handleInput = debounce(onChange, 1000)

    return (
        <>
            <input name="number" onChange={handleInput} />
            <ul className="list-group">
                <li className="list-group-item">Производитель 1</li>
                <li className="list-group-item">Производитель 2</li>
                <li className="list-group-item">Производитель 3</li>
            </ul>
        </>
    )
}

export default App
