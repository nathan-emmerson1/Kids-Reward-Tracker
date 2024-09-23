import ChoreForm from './ChoreForm'
import ChoreList from './ChoreList'

function Chore() {
  return (
    <div className="chore-container">
      <div className="chore-list">
        <ChoreList />
      </div>
      <div className="chore-form">
        <ChoreForm />
      </div>
    </div>
  )
}

export default Chore
