var SqlUtil = require('./SqlUtil');

var sqlUtil = new SqlUtil();
sqlUtil.insert('20180505120000', 'abc', 'def', '', 0, 0);
sqlUtil.query('20180501000000', '20180530000000', 1, function(rows) {
  console.log(rows);
  console.log(typeof(rows));
  console.log(typeof(rows[0]));
  for (var row in rows) {
    console.log(row['id']);
    console.log(row['time']);
  }
});
