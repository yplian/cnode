import { connect } from 'react-redux'
import { tabBar, getCollect } from '../actions'
import Collect from '../page/Collect'
// import Tools from '../utils'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.collect.data.data,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: (loginname) => {
      dispatch(getCollect(loginname));
      dispatch(tabBar(true));
    }
  }
}

const showCollect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collect)

export default showCollect