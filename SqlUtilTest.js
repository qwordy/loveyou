var SqlUtil = require('./SqlUtil');

var sqlUtil = new SqlUtil();
sqlUtil.insert('20180505120000', 'abc', 'def', '', 0, 0);
sqlUtil.query('20180501000000', '20180530000000', 1, function(rows) {
  console.log(rows);
  for (const i in rows) {
    console.log(row[i]);
    console.log(row[i].id);
  }
});
