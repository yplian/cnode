const topics = (state = {data:[],askData:[],shareData:[],devData:[],tab:'all',page:1,creactData_success:false,creactData_error_msg:'',creactData_topic_id:''}, action) => {
  switch (action.type) {
    case 'TOPICS_DATA':
      if(action.tab === 'all'){
        if(action.page <= 1){
          return {
            ...state,
            data:action.data,
            tab:action.tab,
            page:action.page,
          }
        }else{
          let newData = state.data.concat(action.data);
          return {
            ...state,
            data:newData,
            page:action.page,
          }
        }
      }else if(action.tab === 'ask'){
        if(action.page <= 1){
          return {
            ...state,
            askData:action.data,
            tab:action.tab,
            page:action.page,
          }
        }else{
          let newData = state.askData.concat(action.data);
          return {
            ...state,
            askData:newData,
            page:action.page,
          }
        }
      }else if(action.tab === 'share'){
        if(action.page <= 1){
          return {
            ...state,
            shareData:action.data,
            tab:action.tab,
            page:action.page,
          }
        }else{
          let newData = state.shareData.concat(action.data);
          return {
            ...state,
            shareData:newData,
            page:action.page,
          }
        }
      }else if(action.tab === 'dev'){
        if(action.page <= 1){
          return {
            ...state,
            devData:action.data,
            tab:action.tab,
            page:action.page,
          }
        }else{
          let newData = state.devData.concat(action.data);
          return {
            ...state,
            devData:newData,
            page:action.page,
          }
        }
      }else{
        return state
      }
      case 'CREACT_TOPIC': 
        if(action.creactData.success) {
          console.log(action)
          return { 
            ...state,
            creactData_success: action.creactData.success,
            creactData_topic_id:action.creactData.topic_id
          }
        }else{
          return { 
            ...state,
            creactData_error_msg: action.creactData.error_msg,
            creactData_success:action.creactData.success
          }
        }
      case 'CREACT_TOPIC_ISSUC':
        return { 
          ...state,
          creactData_success: action.flag
        }
      default:
        return state
  }
}

export default topics