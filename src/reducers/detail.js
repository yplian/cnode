const detail = (state = {
  success:false,
  uspInfo:{success:false,action:''},
  replyInfo:{success:false},
  data:{tab:'详情',author:{loginname:'',avatar_url:''},
      replies:[
        {author:{loginname:'',avatar_url:''},ups:[]}
      ]},
}, action) => {
  switch (action.type) {
    case 'DETAIL_DATA':
      return {
        ...state,
        data: action.data.data,
        success: action.data.success
      }
    case 'DETAIL_ISSUC':
      return {
        ...state,
        success: action.IsSucBool
      }
    case 'DETAIL_UPS_INFO':
      return {
        ...state,
        uspInfo: action.upsInfo
      }
    case 'DETAIL_REPLIES_INFO':
      return {
        ...state,
        replyInfo: action.replyInfo
      }
    default:
      return state
  }
}

export default detail