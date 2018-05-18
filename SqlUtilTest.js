var SqlUtil = require('./SqlUtil');

var sqlUtil = new SqlUtil();
sqlUtil.insert('20180520120000', '我爱你', '送花', '', 0, 2);
sqlUtil.insert('20180525120000', '在一起', '送花', '', 0, 2);
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
