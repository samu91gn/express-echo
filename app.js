var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000,
    ip   = process.env.IP   || '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var server = app.listen(port, ip, function () {
  console.log('Echo API is listening on port ' + port );
});

server.timeout = 180000; //very low value, to induce timeouts.


var reqData = function(req) {
  const params = ['method', 'hostname', 'path', 'query', 'headers', 'body']
  return params.reduce(
    (accumulator, currentValue) => { accumulator[currentValue] = req[currentValue]; return accumulator},
    {}
  );
};



//app.use((req, res, next) => setTimeout(next, 99));

app.all('*', function(req, res){
   res.set('Content-Type', 'application/json');
   var response = reqData(req);
   delayedResp(res,response);
   console.log("done all")   
});

async function delayedResp(res,response){
   setInterval(returnLater, 150000, res, response)
}

function returnLater(res, response){
   res.status(444).send(JSON.stringify(response,null,2));
}
module.exports = app;
