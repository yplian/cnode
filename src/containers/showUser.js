import { connect } from 'react-redux'
import { getUser, tabBar, postCheckUser } from '../actions'
import User from '../page/User'
import Tools from '../utils'

const mapStateToProps = (state, ownProps) => {
  return {
    summary: state.user.summary,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: (loginname) => {
      dispatch(getUser(loginname))
      dispatch(tabBar(false))
    },
    logout: () => {
      dispatch(postCheckUser(null))
      Tools.removeLocalItem('accesstoken')
    }
  }
}

const showUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default showUser