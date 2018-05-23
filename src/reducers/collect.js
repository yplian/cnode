const collect = (state = {
  isFetch:false,
  collectISuc:false,
  deCollectISuc:false,
  data:{
    success:false,
    data:[{id:'0',tab:"share",author:{loginname:'张三',avatar_url:''},title:'这是一个测试标题。。。。',img:'图片',reply_count:'0',visit_count:'2',}]
  },
}, action) => {
  switch (action.type) {
    case 'COLLECT_DATA':
      return {
        ...state,
        data:action.collectData
      }
    case 'TOPIC_COLLECT':
      return {
        ...state,
        collectISuc:action.collectISuc
      }
    case 'TOPIC_DECOLLECT':
      return {
        ...state,
        deCollectISuc:action.deCollectISuc
      }
    case 'REQUEST_DATA':
      return {
        ...state,
        isFetch: true
      }
    case 'RECEIVE_DATA':
      return {
        ...state,
        isFetch: false
      }
    
    default:
      return state
  }
}

export default collect