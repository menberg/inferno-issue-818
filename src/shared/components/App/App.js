// FRAMEWORK
import Inferno from 'inferno' // eslint-disable-line
import Component from 'inferno-component'
import { connect } from 'cerebral/inferno'
import { state } from 'cerebral/tags'

export default connect(
  {
    currentPage: state`app.currentPage`
  },
  class App extends Component {
    render (props) {
      return (
        <div>
          App
        </div>
      )
    }
  }
)
