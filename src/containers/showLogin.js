import { connect } from 'react-redux'
import { postCheckUser, selectTab, saveUserKey, getMessageCount } from '../actions'
import Login from '../page/Login'

const mapStateToProps = (state, ownProps) => {
  return {
    loginflag: state.user.summary.success,
    summary: state.user.summary
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    loginIn: (key) => {
      // 检测用户名是否正确
      dispatch(postCheckUser(key))
      // 获取该用户名的未读信息数
      dispatch(getMessageCount(key))
    },
    Selected: (tab) => {
      // 切换tab
      dispatch(selectTab(tab))
    },
    saveKey: (key) => {
      dispatch(saveUserKey(key))
    }
  }
}

const showLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default showLogin