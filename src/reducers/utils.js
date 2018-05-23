const utils = (state = {hide:false,selectedTab:'topics',tabIndex:0}, action) => {
  switch (action.type) {
    case 'TAB_BAR':
      return {
        ...state,
        hide: action.hide,
      }
    case 'SELECT_TAB':
      return {
        ...state,
        selectedTab: action.selectedTab,
      }
    case 'TAB_INDEX':
      return {
        ...state,
        tabIndex: action.index,
      }
    default:
      return state
  }
}

export default utils