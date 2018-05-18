/**
公共词库
公共函数
*/

class Common {

this.isQuestion = function(text) {
  arr = ['什么', '吗', '哪', '啥', '神马'];
  for (let v of arr) {
    if (text.indexOf(v) > -1)
      return true;
  }
  return false;

}

this.isRecent = function(text) {
  arr = [ '最近','这两天','几天'];
  for (let v of arr) {
    if (text.indexOf(v) > -1)
      return true;
  }
  return false;
}


}


module.exports = Common;
