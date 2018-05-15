var MongoClient  =  require('mongodb').MongoClient;
var url  =  "mongodb://localhost:27017/";
 
MongoClient.connect(url,  function(err,  db) {
        if (err) throw err;
            var dbo  =  db.db("love");
            dbo.createCollection('reserved_events',  function (err,  res) {
                        if (err) throw err;
                                console.log("预约表!");
                                        db.close();
                                            
            });
                var myobj  =  { date: "2018 - 5 - 20",  url: "买花"  };
                dbo.collection("reserved_events").insertOne(myobj,  function(err,  res) {
                            if (err) throw err;
                                    console.log("动作插入成功");
                                            db.close();
                                                
                });

});
