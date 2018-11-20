//查询门店
export let getShop = (argus) => {
  return {
    type: 'GET_SHOP',
    playload: {
      url: '/shop/queryByArea',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetShopStatus = () => {
  return {
    type: 'UPDATE_GET_SHOP_STATUS'
  }
}

