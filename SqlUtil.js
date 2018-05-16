var sqlite3 = require('sqlite3').verbose();

class SqlUtil {
  constructor() {
    this.db = new sqlite3.Database('dat.db');
  }

  insert(time, alias, event, feeling, done, priority) {
    var db = this.db;
    db.serialize(function() {
      var stmt = db.prepare('insert into calendar(time, alias, event, feeling, done) values(?, ?, ?, ?, ?, ?)');
      stmt.run(time, alias, event, feeling, done, priority);
      stmt.finalize();
    });
  }

  query(beginTime, endTime, priority, callback) {
    var db = this.db;
    db.serialize(function() {
      db.all('SELECT * from calendar where time >= ' + beginTime + ' and time <= ' + endTime, function(err, rows) {
        callback(rows);
      });
    });
  }

  close() {
    this.db.close()
  }
}

module.exports = SqlUtil;
