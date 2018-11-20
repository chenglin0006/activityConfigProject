import * as __URL__ from '../../../config/index';
import * as Util from '../../util/index';

export default (args) => {
  //判断当前环境
  const ENV = Util.getEnv();
  console.log('current env:',ENV,'------------------------------')
    //请求参数 trim 统一处理
    if(Array.isArray(args.param)){
        args.param.forEach((ele)=>{
            for(let key in ele){
                if(Object.prototype.toString.call(ele[key])=="[object String]"){
                    ele[key] = ele[key].trim();
                }
            }
        })
    } else {
        for(let key in args.param){
            if(Object.prototype.toString.call(args.param[key])=="[object String]"){
                args.param[key] = args.param[key].trim();
            }
        }
    }
  let params = args.type.toUpperCase() === 'GET' ? null : args.param;
  let url = args.type.toUpperCase() === 'GET' ? Util.createUrl(args) : args.url;
  // let requestUrl = __URL__[ENV]['apiUrl'] + url;
  let requestUrl = __URL__[ENV]['apiUrl']+ __URL__[ENV]['apiUrlFilter'] + url;
  if (args.isAddress) {
    requestUrl = (__URL__[ENV]['addressUrl'] + url);
  } else if (args.isQiniu) {
    requestUrl = (__URL__[ENV]['qiniuUrl'] + url);
  } else if (args.isAuth) {
    requestUrl = __URL__[ENV]['authUrl'] + __URL__[ENV]['authUrlFilter'] + url;
  }

  let headers = {
    'Accept': 'application/json'
  }
  if (!args.isAddress) {
    if(!args.isAuth){
      headers['Cache-Control'] = 'no-cache';
    }
    headers['Content-Type'] = args.contentType || 'application/json';
  }

  return fetch(requestUrl, {
    credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
    method: args.type.toUpperCase(),
    follow: 1,
    timeout: 10000,
    headers: headers,
      body: params ? JSON.stringify({
          "data": params
      }) : null
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    const error = new Error(res.statusText);
    error.res = res;
    throw error;
  }).then((response) => {
    return response.json();
  });
}
