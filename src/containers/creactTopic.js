import { connect } from 'react-redux'
import { postCreactTopic,creactTopicIsSuc } from '../actions'
import Creact from '../page/Creact'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.topics.data,
    accesstoken: state.user.key,
    success: state.topics.creactData_success,
    error_msg: state.topics.creactData_error_msg,
    topic_id: state.topics.creactData_topic_id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitValue: (key,tab,title,content) => {
      dispatch(postCreactTopic(key,tab,title,content))
    },
    Unmount: (flag)=>{
      dispatch(creactTopicIsSuc(flag));
    }
  }
}

const creactTopic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Creact)

export default creactTopic