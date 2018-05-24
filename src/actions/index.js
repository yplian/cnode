import fetch from "isomorphic-fetch";

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const TOPICS_DATA = 'TOPICS_DATA';//存储首页数据

export const DETAIL_DATA = 'DETAIL_DATA';//存储详情页数据
export const GET_DETAIL_ISFETCH = 'GET_DETAIL_ISFETCH';//是否存储详情页数据
export const DETAIL_ISSUC = 'DETAIL_ISSUC';//是否请求成功
export const DETAIL_UPS_INFO = 'DETAIL_UPS_INFO';//点赞后返回值
export const DETAIL_REPLIES_INFO = 'DETAIL_REPLIES_INFO';//评论后返回值


export const MESSAGE_COUNT = 'MESSAGE_COUNT';//未读消息数目
export const MESSAGE_DATA = 'MESSAGE_DATA';//消息数据

export const CREACT_TOPIC = 'CREACT_TOPIC';//创建主题
export const CREACT_TOPIC_ISSUC = 'CREACT_TOPIC_ISSUC';//创建是否成功

export const CHECK_USER = 'CHECK_USER';//验证用户，存储概要
export const USER_DATA = 'USER_DATA';//用户详细数据
export const SAVE_USER_KEY = 'SAVE_USER_KEY';//存储用户accessToken

export const TAB_BAR = 'TAB_BAR';//home页面foot切换显隐
export const SELECT_TAB = 'SELECT_TAB';//home页面foot切换
export const TAB_INDEX = 'TAB_INDEX';//切换主题类型的下标

export const TOPIC_COLLECT ='TOPIC_COLLECT';//主题收藏是否成功
export const TOPIC_DECOLLECT ='TOPIC_DECOLLECT';//取消主题收藏是否成功
export const COLLECT_DATA ='COLLECT_DATA';//用户主题收藏数据


/* 
  请求状态
*/
export const requestData = (isfetch) => {
  return {
    type: REQUEST_DATA,
    isfetch,
  }
}
export const receiveData = (isfetch) => {
  return {
    type: RECEIVE_DATA,
    isfetch,
  }
}
/* 
接收 get 参数
page Number 页数
tab String 主题分类。目前有 ask share job good
limit Number 每一页的主题数量
mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
https://cnodejs.org/api/v1/topics
*/
export const topicsData = (tab,page,data,askData,shareData,) => {
  return {
    type: TOPICS_DATA,
    data,
    askData,
    shareData,
    tab,
    page,
  }
}
export const getTopics = (tab,page=1,limit=20) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {dispatch(topicsData(tab,page,json.data));})
  }
}

// 获取首页详情页面
/* 
接收 get 参数
mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
accesstoken String 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值 
https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312
*/
export const detailData = (data) => {
  return {
    type: DETAIL_DATA,
    data
  }
}
export const getDetailIsfetch = (fetchState) => {
  return {
    type: GET_DETAIL_ISFETCH,
    fetchState
  }
}

export const detailIsSuc = (IsSucBool) => {
  return {
    type: DETAIL_ISSUC,
    IsSucBool
  }
}

export const getDetail = (id,accesstoken=null) => {
  return dispatch => {
    dispatch(getDetailIsfetch(true))
    fetch(`https://cnodejs.org/api/v1/topic/${id}?accesstoken=${accesstoken}`)
    .then(response => response.json())
    .then(json => {
      dispatch(detailData(json));
      if(json.success){
        dispatch(detailIsSuc(json.success));
      }
      dispatch(getDetailIsfetch(false))
      
    })
  }
}

/* 
post /reply/:reply_id/ups 为评论点赞
接受 post 参数
accesstoken String
接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。

返回值示例
{"success": true, "action": "down"}
*/
export const detailUpsInfo = (upsInfo) => {
  return {
    type: DETAIL_UPS_INFO,
    upsInfo,
  }
}

export const postDetailUps = (id,key) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/reply/${id}/ups `,{
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:`accesstoken=${key}`
    })
    .then(response => response.json())
    .then(json => {
      dispatch(detailUpsInfo(json));
      console.log(json);
    })
  }
}

/* 
post /topic/:topic_id/replies 新建评论
接收 post 参数
accesstoken String 用户的 accessToken
content String 评论的主体
reply_id String 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
返回值示例
{success: true, reply_id: '5433d5e4e737cbe96dcef312'}
*/

export const postDetailReply = (topic_id,accesstoken,content,reply_id=null) => {
  let reply = '';
  reply_id===null ? reply='' : reply=`&reply_id=${reply_id}`;
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/topic/${topic_id}/replies`,{
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:`accesstoken=${accesstoken}&content=${content}${reply}`
    })
    .then(response => response.json())
    .then(json => {dispatch(detailRepliesInfo(json));console.log(json);})
  }
}
export const detailRepliesInfo = (replyInfo) => {
  return {
    type: DETAIL_REPLIES_INFO,
    replyInfo,
  }
}

// 获取未读的消息数目
export const messageCount = (num) => {
  return {
    type: MESSAGE_COUNT,
    num,
  }
}
export const getMessageCount = (key) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${key}`)
    .then(response => response.json())
    .then(json => {dispatch(messageCount(json));})
  }
}

/* 
get /messages 获取已读和未读消息
接收 get 参数
accesstoken String
mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
*/

export const messageData = (data) => {
  return {
    type: MESSAGE_DATA,
    data,
  }
}
export const getMessage = (accesstoken,mdrender=false) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}&mdrender=${mdrender}`)
    .then(response => response.json())
    .then(json => {dispatch(messageData(json.data));})
  }
}

/* 
post /message/mark_all 标记全部已读
接收 post 参数
accesstoken String
返回值示例
{ success: true,
  marked_msgs: [ { id: '544ce385aeaeb5931556c6f9' } ] }
*/
export const postMessageMarkAll = (accesstoken) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/message/mark_all`,{
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:`accesstoken=${accesstoken}`
    })
    // .then(response => response.json())
    // .then(json => {console.log(json);})
    // .catch(err => console.log(err))
  }
}

/* 
post /topics 新建主题
接收 post 参数
accesstoken String 用户的 accessToken
title String 标题
tab String 目前有 ask share job dev。开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
content String 主体内容
返回值示例
{success: true, topic_id: '5433d5e4e737cbe96dcef312'}
*/
export const creactTopic = (creactData) => {
  return {
    type: CREACT_TOPIC,
    creactData,
  }
}
export const creactTopicIsSuc = (flag) => {
  return {
    type: CREACT_TOPIC_ISSUC,
    flag,
  }
}
export const postCreactTopic = (key,tab,title,content) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/topics`,{
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:`accesstoken=${key}&tab=${tab}&title=${title}&content=${content}`
    })
    .then(response => response.json())
    .then(json => {dispatch(creactTopic(json));})
  }
}

/* 
post /accesstoken 验证 accessToken 的正确性
接收 post 参数
accesstoken String 用户的 accessToken
如果成功匹配上用户，返回成功信息。否则 403。

返回值示例
{success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}
*/
export const checkUser = (summary) => {
  return {
    type: CHECK_USER,
    summary,
  }
}

export const postCheckUser = (key) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/accesstoken`,{
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:`accesstoken=${key}`
    })
    .then(response => response.json())
    .then(json => {dispatch(checkUser(json));})
  }
}

/* 
get /user/:loginname 用户详情
https://cnodejs.org/api/v1/user/alsotang
*/
export const userData = (user) => {
  return {
    type: USER_DATA,
    user,
  }
}
export const getUser = (user) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/user/${user}`)
    .then(response => response.json())
    .then(json => {dispatch(userData(json.data));})
  }
}
export const saveUserKey = (key) => {
  return {
    type: SAVE_USER_KEY,
    key,
  }
}
/* 
post /topic_collect/collect 收藏主题
接收 post 参数
accesstoken String 用户的 accessToken
topic_id String 主题的id
返回值示例
{"success": true}
*/
export const topicCollect = (collectISuc) => {
  return {
    type: TOPIC_COLLECT,
    collectISuc,
  }
}

export const postTopicCollect = (accesstoken,topic_id) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/topic_collect/collect`,{
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:`accesstoken=${accesstoken}&topic_id=${topic_id}`
    })
    .then(response => response.json())
    .then(json => {dispatch(topicCollect(json));})
  }
}

/* 
post /topic_collect/de_collect 取消主题
接收 post 参数
accesstoken String 用户的 accessToken
topic_id String 主题的id
返回值示例
{success: true}
*/
export const topicDeCollect = (deCollectISuc) => {
  return {
    type: TOPIC_DECOLLECT,
    deCollectISuc,
  }
}

export const postTopicDeCollect = (accesstoken,topic_id) => {
  return dispatch => {
    fetch(`https://cnodejs.org/api/v1/topic_collect/de_collect`,{
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:`accesstoken=${accesstoken}&topic_id=${topic_id}`
    })
    .then(response => response.json())
    .then(json => {dispatch(topicDeCollect(json));})
  }
}
/* 
get /topic_collect/:loginname 用户所收藏的主题
*/
export const collectData = (collectData) => {
  return {
    type: COLLECT_DATA,
    collectData,
  }
}
export const getCollect = (loginname) => {
  return dispatch => {
    dispatch(requestData());
    fetch(`https://cnodejs.org/api/v1/topic_collect/${loginname}`)
    .then(response => response.json())
    .then(json => {dispatch(collectData(json));})
    dispatch(receiveData());
  }
}

// 获取tabbar是否隐藏
export const tabBar = (hide) => {
  return {
    type: TAB_BAR,
    hide,
  }
}
// 切换主窗口tab
export const selectTab = (selectedTab) => {
  return {
    type: SELECT_TAB,
    selectedTab,
  }
}
// 切换主题类型 下标值
export const tabIndex = (index) => {
  return {
    type: TAB_INDEX,
    index,
  }
}