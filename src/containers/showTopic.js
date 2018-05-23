import { connect } from 'react-redux'
import { getTopics, tabBar, tabIndex } from '../actions'
import Topics from '../page/Topics'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.topics.data,
    shareData: state.topics.shareData,
    askData: state.topics.askData,
    devData: state.topics.devData,
    loginflag: state.user.summary.success,
    avatar_url: state.user.summary.avatar_url,
    tabIndex: state.utils.tabIndex,
    // msg_count: state.message.num
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
    init: () => {
      dispatch(getTopics('all'));
      dispatch(tabBar(false));
    },
    changeTab: (tab) => {
      dispatch(getTopics(tab));
    },
    changeTabIndex: (index) => {
      dispatch(tabIndex(index));
    }
  }
}

const showTopic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topics)

export default showTopic