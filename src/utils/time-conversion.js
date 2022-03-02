function getZoneTime(offset) {
  // 取本地时间
  var localtime = new Date();
  // 取本地毫秒数
  var localmesc = localtime.getTime();
  // 取本地时区与格林尼治所在时区的偏差毫秒数
  var localOffset = localtime.getTimezoneOffset() * 60000;
  // 反推得到格林尼治时间
  var utc = localOffset + localmesc;
  // 得到指定时区时间
  let Objectifs = offset*3600000+utc
  var nd = new Date(Objectifs);

  return nd.toLocaleString()
  //return nd.getFullYear()+"-"+nd.getUTCMonth()+"-"+nd.getDay() + " " + nd.toLocaleTimeString() ;
}

export default getZoneTime