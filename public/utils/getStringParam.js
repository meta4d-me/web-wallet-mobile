/**获取URL的string参数**/
const getStringParam = function (parameter, callBack) {
  let l = '', j = callBack.replace(/&/g,'?').split('?');
  for (let p = 0; p < j.length; p++) {
    if (j[p].indexOf(parameter + '=') === 0) {
      let i = j[p].split('=');
      l = i[1];
      break
    }
  }
  return l;
};

export default getStringParam;
