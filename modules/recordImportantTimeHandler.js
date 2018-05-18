function f(text){
            var pos;
            if (this.matchRecord(text)) {
                console.log('matchRecord');
            } else if ((pos = this.matchReserve(text)) >= 0) {
                console.log("matchReserve@"+pos);
                var pos2 = text.indexOf('去');
                if (pos2 > 0) {
                    var time = text.substring(pos+2, pos2);
                    console.log('时间：'+ time);
                    var gap = this.getDateGap(time);
                    if (typeof(gap) != undefined) {
                        time = this.addDateFromNow('d', gap);
                        console.log('Actual time: '+time);
                    } else {
                      console.log('Relative Date Unknown, put raw data in');
                    }
                    console.log('动作：'+text.substring(pos2));
                }else {
                    console.log('total: '+text.substring(pos+2));
                }
            } else if (this.matchRemind(text)) {
                console.log('match matchRemind');
            } else if (this.matchRecall(text)) {
                console.log('match matchRecall');
            }else {
              console.log("nothing matched!");
            }
            console.log(text)
            return {
                card: card,
                outputSpeech: text
            }
          }