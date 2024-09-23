import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Chore from './components/Chore.tsx'
import Children from './components/Children.tsx'
import Reward from './components/Reward.tsx'

const routes = createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="chore" element={<Chore />} />
    <Route path="children" element={<Children />} />
    <Route path="reward" element={<Reward />} />
  </>,
)
export default routes
