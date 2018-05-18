/**
公共词库
公共函数
*/

class Common {
  constructor() {
  /**
  查找词库中是否有关键词
  **/
  this._isFound = (keyArr, text) => {

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
    this.exactMatch = (text, dict) => {
        for (let word of dict)
            if (text === word) return true;
        return false;
    };

    /**
     * If text has any word of dict
     * @returns boolean
     * @param {String} text
     * @param {String[]} dict
     */
    this.findMatch = (text, dict) => {
        return this.findPos(text, dict)[0] > -1;
    };

    /**
     * @returns [start position(-1 on failure), word]
     * @param {String} text
     * @param {String[]} dict
     */
    this.findPos = (text, dict) => {
        let pos = -1;
        for (let i = 0; i < dict.length; i++) {
            pos = text.indexOf(dict[i]);
            if (pos > -1) return [pos, dict[i]];
        }
        return [pos, ''];
    }

  //是否疑问句
  this.isQuestion = function(text) {
    arr = ['什么', '吗', '哪', '啥', '神马'];
    return this._isFound(arr, text);
  };
  // 是否问最近的
  this.isRecent = function(text) {
    arr = [ '最近','这两天','几天'];
    return this._isFound(arr, text);
  };

  //记录重要时间
  this.isRecording = function(text) {
    //TODO
      return true;
  };

  //预约提醒
  this.isReserving = (text) => {
    //TODO
    return true;

  };
}
}

module.exports = Common;
