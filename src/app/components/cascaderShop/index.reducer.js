export default function(state={}, action) {
	switch(action.type) {
    case 'GET_SHOP':
      return {
        ...state,
        getShopStatus: true,
        getShopCode: action.playload.code,
        getShopMessage: action.playload.message,
        getShopData: action.playload.data
      }
      break;
    case 'GET_SHOP_FAIL':
      return {
        ...state,
        getShopStatus: true,
        getShopCode: action.playload.code,
        getShopMessage: action.playload.message
      }
      break;
    case 'UPDATE_GET_SHOP_STATUS':
      return {
        ...state,
        getShopStatus: false
      }
      break;
		default:
			return state;
	}
}