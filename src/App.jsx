import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '~/pages/MainPage/MainPage.jsx'
import DetailPage from '~/pages/DetailPage/DetailPage.jsx'
import { routes } from '~/routes'

const App = () => (
    <Router>
        <Routes>
            <Route
                exact
                path={routes.index}
                element={<MainPage />} />
            <Route path={routes.detail} element={<DetailPage />} />
        </Routes>
    </Router>
)

export default App
