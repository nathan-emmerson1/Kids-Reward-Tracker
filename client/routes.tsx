import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Chore from './components/Chore.tsx'
import Children from './components/Children.tsx'
import Reward from './components/Reward.tsx'
import ParentDashBoard from './components/ParentDashBoard.tsx'
import ChoreByChildrenId from './components/ChoreByChildrenId.tsx'

const routes = createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="chore" element={<Chore />} />
    <Route path="children" element={<Children />} />
    <Route path="reward" element={<Reward />} />
    <Route path="parent-dashboard" element={<ParentDashBoard />} />
    <Route path="children/:id/chores" element={<ChoreByChildrenId />} />
  </>,
)
export default routes
