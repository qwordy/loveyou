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

  /**
   * If text === any word of dict
   * @param {String} text 
   * @param {String[]} dict 
   */
  exactMatch(text, dict) {
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
  findMatch(text, dict) {
      return this.findPos(text, dict)[0] > -1;
  }

  /**
   * @returns [start position(-1 on failure), word]
   * @param {String} text 
   * @param {String[]} dict 
   */
  findPos(text, dict) {
      let pos = -1;
      for (let i = 0; i < dict.length; i++) {
          pos = text.indexOf(dict[i]);
          if (pos > -1) return [pos, dict[i]];
      }
      return [pos, ''];
  }


}


module.exports = Common;
