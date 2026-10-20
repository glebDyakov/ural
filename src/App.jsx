import './App.css'
import debounce from 'lodash.debounce'

const App = () => {
    const onChange = () => {
        // TODO: request/display data 
    }

    const handleInput = debounce(onChange, 1000)

    return (
        <input onChange={handleInput} />
    )
}

export default App
