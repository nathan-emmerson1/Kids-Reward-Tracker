import ChildrenForm from './ChildrenForm'
import ChildrenList from './ChildrenList'

function Children() {
  return (
    <div className="children-container">
      <div className="children-list">
        <ChildrenList />{' '}
      </div>
      <div className="children-form">
        <ChildrenForm />
      </div>
    </div>
  )
}
export default Children
