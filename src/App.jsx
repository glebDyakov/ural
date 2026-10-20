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
            <ul class="list-group">
                <li class="list-group-item">Производитель 1</li>
                <li class="list-group-item">Производитель 2</li>
                <li class="list-group-item">Производитель 3</li>
            </ul>
        </>
    )
}

export default App
