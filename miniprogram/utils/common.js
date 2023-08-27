var common = {
  /** 截取定长字符串 */
  cutString(str,len=16){
    if(str.length>len){
      return str.substring(0, len)+"...";
    }else{
      return str;
    }
  },
  /** 获得正确的价格格式字符串 */
  getPrice(str, plen=2){
    // str 价格字符串
    // plen 小数点后位数
    if(plen<0||plen>2){
      return 'plen error'
    }
    var value = str;
    value = value.replace(/[^\d.]/g, "");// 消除非数字与'.'
    value = value.replace(/^0*(?=[1-9])/g, "");// 消除开头多余的0+数字
    value = value.replace(/^0*(?=\.)/g, "0");// 消除开头多余的00+'.'
    value = value.replace(/(?<=\.\d*)\./g, "");// 消除第一个'.'以后的'.'
    // 消除'.'后多余内容
    if(plen==2){
      value = value.replace(/(?<=\.\d\d)\d*/g, "");
    }else if(plen==1){
      value = value.replace(/(?<=\.\d)\d*/g, "");
    }else if(plen==0){
      value = value.replace(/\.\d*/g, "");
    }
    return value;
  },
  /** 获取当前时间 */
  getNowDate(){
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth()+1;
    mm = ( mm<10 ? '0'+mm : mm );
    var dd = date.getDate();
    dd = ( dd<10 ? '0'+dd : dd );
    return yyyy+'-'+mm+'-'+dd;
  }
}

module.exports = common;