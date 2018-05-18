/**
公共词库
公共函数
*/
var Bot = require('../Bot');
class Common {
  
    constructor(bot) {
        this.bot = bot;
    }
    /**
    查找词库中是否有关键词
    **/
    _isFound(keyArr, text) {

      for (let v of keyArr) {
        if (text.indexOf(v) > -1)
          return true;
      }
      return false;
    }

      /**
       * If text === any word of dict
       * @param {String} text
       * @param {String[]} dict
       */
      exactMatch (text, dict)  {
          for (let word of dict)
              if (text === word) return true;
          return false;
      }

      /**
       * If text has any word of dict
       * @returns boolean
       * @param {String} text
       * @param {String[]} dict
       */
      findMatch (text, dict)  {
          return this.findPos(text, dict)[0] > -1;
      }

      /**
       * @returns [start position(-1 on failure), word]
       * @param {String} text
       * @param {String[]} dict
       */
      findPos (text, dict)  {
          let pos = -1;
          for (let i = 0; i < dict.length; i++) {
              pos = text.indexOf(dict[i]);
              if (pos > -1) return [pos, dict[i]];
          }
          return [pos, ''];
      }

    //是否疑问句
    isQuestion(text) {
      let arr = ['什么', '吗', '哪', '啥', '神马'];
      return this._isFound(arr, text);
    }
    // 是否问最近的
    isRecent(text) {
      let arr = [ '最近','这两天','几天'];
      return this._isFound(arr, text);
    }

    //记录重要时间
    isRecording(text) {
      let arr = ['重要', '紧急', '要紧','有意义','纪念'];
      return this._isFound(arr, text);
    }

    //预约提醒
    isReserving(text) {
      //TODO
      return true;
    }

    //add number of date gap, get Date object
    addDate(interval,number,date){
      switch(new String(interval).toLowerCase()){
      case "y": return new Date(date.setFullYear(date.getFullYear()+number));
      case "m": return new Date(date.setMonth(date.getMonth()+number));
      case "d": return new Date(date.setDate(date.getDate()+number));
      case "w": return new Date(date.setDate(date.getDate()+7*number));
      case "h": return new Date(date.setHours(date.getHours()+number));
      case "n": return new Date(date.setMinutes(date.getMinutes()+number));
      case "s": return new Date(date.setSeconds(date.getSeconds()+number));
      case "l": return new Date(date.setMilliseconds(date.getMilliseconds()+number));
      }
    }
    addDateFromNow(interval, number) {
      return this.addDate(interval, number, new Date());
    }

    //calculate difference between 2 date
    diffDate(interval,date1,date2){
        var long = date2.getTime() - date1.getTime(); //相差毫秒
        switch(interval.toLowerCase()){
          case "y": return parseInt(date2.getFullYear() - date1.getFullYear());
          case "m": return parseInt((date2.getFullYear() - date1.getFullYear())*12 + (date2.getMonth()-date1.getMonth()));
          case "d": return parseInt(long/1000/60/60/24);
          case "w": return parseInt(long/1000/60/60/24/7);
          case "h": return parseInt(long/1000/60/60);
          case "n": return parseInt(long/1000/60);
          case "s": return parseInt(long/1000);
          case "l": return parseInt(long);
        }
    }
 
    
}

//日期格式化
Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}

module.exports = Common;
