'use strict'

const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
var http = require('http');
var path = require('path');

/*var jshs2 = require('jshs2');
var Configuration = require('jshs2/lib/Configuration');
var Connection = require('jshs2/lib/Connection');
var IDLContainer = require('jshs2/lib/common/IDLContainer');
var HS2Util = require('jshs2/lib/common/HS2Util');
var HiveConnection = require('jshs2/lib/HiveConnection')*/;

var port = '4200';
http.createServer(function(req, res) {});
const fs = require('fs');
var client = require('hive-thrift');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('port',port);
app.use(express.static(path.join(__dirname, "views/dist")));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});




	app.get('/reqData', function(req, res){
		var obj;
       /* const options = {
            auth: 'NOSASL',
            host: '14.142.119.130',
            port: '10002',
            timeout: 10000,
            username: 'hduser',
            password: 'ptg@123',
            hiveType: HS2Util.HIVE_TYPE.HIVE,
            hiveVer: '0.13.1',
            thriftVer: '0.9.2',
            cdhVer: '5.3.0',
            maxRows: 5120,
            nullStr: 'NULL',
            i64ToString: true,
        };

        var configure = new Configuration(options);
        var idl = new IDLContainer();

       idl.initialize(configure).then(function()  {
            var _HiveConnection = new HiveConnection(configure,idl);
            _HiveConnection.connect(configure,idl);

        });

*/

        client.connect(function (err, session) {
            if (err) {
                console.log('Connection error : ' + JSON.stringify(err));
            } else {
                console.log('Connection success');
                console.log(JSON.stringify(session));
                /*Retrieve database schemas*/
               /* client.getSchemasNames(session, function (err, resSchema) {
                    if(err) {
                        handleError('getSchemasNames',err,session);
                    } else {
                        logger.info("Schemas => " + JSON.stringify(resSchema));
                        if(!getByValue('TABLE_SCHEM',schemaName,resSchema)) {
                            logger.error('Schema ' + schemaName + ' not existing ... ');
                            util.disconnect(session);
                        }

                        /!*Retrieve tables for schemaName*!/
                        client.getTablesNames(session, schemaName, function (err, resTable) {
                            if(err) {
                                handleError('getTablesNames',err,session);
                            } else {
                                logger.info("Tables => " + JSON.stringify(resTable));
                                if(!getByValue('TABLE_NAME',tableName,resTable)) {
                                    logger.error('Table ' + tableName + ' not existing ... ');
                                    util.disconnect(session);
                                }
                                /!*Execute select * on tableName*!/
                                var selectStatement = 'select * from ' + schemaName + '.' + tableName;
                                client.executeSelect(session, selectStatement, function (error, result) {
                                    if(err) {
                                        handleError('executeSelect',err,session);
                                    } else {
                                        logger.info(selectStatement + " => " + JSON.stringify(result));
                                        /!*Close the session and the connection*!/
                                        util.disconnect(session);
                                    }
                                });
                            }
                        });
                    }
                });*/
            }
        });

		fs.readFile('UserData.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(JSON.parse(data));
      });
	});
	

app.post('/updateData', function(req, res)  {
  console.log('Received request');
  fs.writeFile('UserData.json', JSON.stringify(req.body), function(err)  {
    if (err) throw err;
    res.send({status:200,statusText:"inserted successfully"})
  })
});

app.listen(3300, function(){
  console.log('Listening on port 3000');
})

module.exports = app;