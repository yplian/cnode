import { connect } from 'react-redux'
import { getDetail, detailIsSuc,tabBar,postDetailUps,postDetailReply,postTopicCollect,postTopicDeCollect } from '../actions'
import Detail from '../page/Detail'
import Tools from '../utils'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.detail.data,//页面整体属性
    isShow: state.detail.success,//页面请求是否成功
    // accesstoken: state.user.key,
    // accectId: state.user.summary.id,
    // authorId: state.detail.data.id,
    // upsInfo: state.detail.uspInfo,
    loginname: state.user.summary.loginname,//登录用户的github名
    isFetch: state.detail.isFetch,//isFetch
    collectISuc: state.collect.collectISuc,//收藏是否成功过
    deCollectISuc: state.collect.deCollectISuc,//取消收藏是否成功过
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      let accesstoken = Tools.localItem('accesstoken');
      dispatch(getDetail(ownProps.match.params.id,accesstoken))
      dispatch(tabBar(true))
    },
    refresh: () => {
      dispatch(getDetail(ownProps.match.params.id))
    },
    Unmount: () => {
      dispatch(detailIsSuc(false))
    },
    targetCollect:(bool) =>{
      // 收藏
      let accesstoken = Tools.localItem('accesstoken');
      let id = ownProps.match.params.id;
      bool?dispatch(postTopicDeCollect(accesstoken,id)):dispatch(postTopicCollect(accesstoken,id))
    },
    discuss: (content,reply_id) => {
      // 判断用户是否登录，未登录时跳转登录页面
      let accesstoken = Tools.localItem('accesstoken');
      if(accesstoken){
        dispatch(postDetailReply(ownProps.match.params.id,accesstoken,content,reply_id));
        // 更新视图层
        dispatch(getDetail(ownProps.match.params.id));
      }else{
        ownProps.history.push('/login')
      }
    },
    praise: (reply_id) => {
      let accesstoken = Tools.localItem('accesstoken');
      if(accesstoken){
        dispatch(postDetailUps(reply_id,accesstoken));
      }else{
        ownProps.history.push('/login');
      }
    }
  }
}

const showDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)

export default showDetail