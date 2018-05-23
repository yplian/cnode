const message = (state = {count:0,data:{has_read_messages:[],hasnot_read_messages:[]}}, action) => {
  switch (action.type) {
    case 'MESSAGE_COUNT':
      if(typeof(action.num.success)){
        return {
          ...state,
          count: action.num.data,
        }
      }else{
        return state
      }
    case 'MESSAGE_DATA':
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}

export default message