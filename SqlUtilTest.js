var SqlUtil = require('./SqlUtil');

var sqlUtil = new SqlUtil();
sqlUtil.insert('20180505120000', 'abc', 'def', '', 0, 0);
sqlUtil.query('20180501000000', '20180530000000', 1, function(rows) {
  console.log(rows);
  for (const i in rows) {
    console.log(rows[i]);
    console.log(rows[i].id);
    console.log(rows[i].priority);
    console.log(rows[i].date);
    console.log(rows[i].event);
    console.log(rows[i].feeling);
    console.log(rows[i].done);
  }
});
