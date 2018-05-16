var sqlite3 = require('sqlite3').verbose();

class SqlUtil {
  constructor() {
    this.db = new sqlite3.Database('dat.db');
  }

  insert(time, alias, event, feeling, done) {
    this.db.serialize(function() {
      var stmt = this.db.prepare('insert into calendar(time, alias, event, feeling, done) values(?, ?, ?, ?, ?)');
      stmt.run(time, alias, event, feeling, done);
      stmt.finalize();
    });
  }

  select() {

  }

  close() {
    this.db.close()
  }
}

module.exports = SqlUtil;
