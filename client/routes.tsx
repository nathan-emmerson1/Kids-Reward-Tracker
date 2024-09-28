import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Chore from './components/Chore.tsx'
import Children from './components/Children.tsx'
import Reward from './components/Reward.tsx'
import ParentDashBoard from './components/ParentDashBoard.tsx'
import ChoreByChildrenId from './components/ChoreByChildrenId.tsx'
import RewardByChildrenId from './components/RewardByChidrenId.tsx'
import Home from './components/Home.tsx'
import Layout from './components/Layout.tsx'

const routes = createRoutesFromElements(
  <>
    <Route element={<Layout />}>
      <Route index element={<App />} />
      <Route path="home" element={<Home />} />
      <Route path="chore" element={<Chore />} />
      <Route path="children" element={<Children />} />
      <Route path="reward" element={<Reward />} />
      <Route path="parent-dashboard" element={<ParentDashBoard />} />
      <Route path="children/:id/chores" element={<ChoreByChildrenId />} />
      <Route path="reward/:id/rewards" element={<RewardByChildrenId />} />
    </Route>
  </>,
)
export default routes
