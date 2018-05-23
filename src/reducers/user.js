const user = (state = {summary:{success:false},user:{recent_topics:[],recent_replies:[]},key:''}, action) => {
  switch (action.type) {
    case 'CHECK_USER':
      return {
        ...state,
        summary: action.summary
      }
    case 'USER_DATA':
      return {
        ...state,
        user: action.user
      }
    case 'SAVE_USER_KEY':
      return {
        ...state,
        key: action.key
      }
    default:
      return state
  }
}

export default user