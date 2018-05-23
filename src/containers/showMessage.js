import { connect } from 'react-redux'
import { getMessage, tabBar, postMessageMarkAll } from '../actions'
import Message from '../page/Message'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.message.data,
    accesstoken: state.user.key,
    count: state.message.count
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: (key) => {
      // 获取已读未读消息
      dispatch(getMessage(key));
      
      // 显示tab
      dispatch(tabBar(false));
    },
    msgMarkAll:(key) =>{
      // 清除未读标记
      dispatch(postMessageMarkAll(key));
    }
  }
}

const showMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)

export default showMessage