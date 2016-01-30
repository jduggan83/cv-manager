var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var app = express();
var uuid = require('node-uuid');

app.use(express.static('app'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

app.get('/', function (req, res) {
    res.sendFile('app/index.html');
});

app.get('/search', function (req, res) {
    client.search({
        index: 'cv_manager',
        type: 'applicant',
        size: 100,
        body: {
            query: {
                query_string: {
                    query: req.query.skill,
                    default_operator: "and"
                }
            }
        },
        fields: ['name', 'cv.name']
    }).then(function (resp) {
        var result = [];
        for (i = 0; i < resp.hits.hits.length; i++){

            var applicant = {
                name: resp.hits.hits[i].fields['name'][0],
                fileName: resp.hits.hits[i].fields['cv.name'][0],
                id: resp.hits.hits[i]._id
            };

            result.push(applicant);
        }
        res.send(result);
    }, function (err) {
        console.trace(err.message);

    });
});


app.post('/upload', function (req, res) {
    var id =  uuid.v4();

    client.create({
        index: 'cv_manager',
        type: 'applicant',
        id: id,
        body: {
            "cv": {
                "_name" : req.body.fileName,
                "_content": req.body.cv
            }
        }
    }, function (error, response) {
        setTimeout(function(){
            client.get({
                index: 'cv_manager',
                type: 'applicant',
                id:  id,
                fields: ['cv.title']
            }).then(function (resp) {

                var cvTitle = req.body.fileName;
                cvTitle = cvTitle.substr(0, cvTitle.lastIndexOf('.'));

                if(resp.fields !== undefined){
                    cvTitle = resp.fields['cv.title'][0];
                }

                var applicant = {
                    id: id,
                    name: cvTitle
                };

                client.update({
                    index: 'cv_manager',
                    type: 'applicant',
                    id: id,
                    body: {
                        doc: {
                            name: applicant.name
                        }
                    }
                }, function (error, response) {
                    res.send(applicant);
                })
            }, function (err) {
                console.trace(err.message);
            });
        }, 2000);
    });
});

app.get('/download', function (req, res) {
    client.get({
        index: 'cv_manager',
        type: 'applicant',
        id:  req.query.id,
    }).then(function (resp) {
        res.setHeader('Content-disposition', 'attachment; filename='+resp._source.cv._name);
        var buf = new Buffer(resp._source.cv._content, 'base64');
        res.send(buf);
    }, function (err) {
        console.trace(err.message);
    });
});

app.put('/updateApplicant', function (req, res) {
    client.update({
        index: 'cv_manager',
        type: 'applicant',
        id: req.body.id,
        body: {
            doc: {
                name: req.body.applicantName
            }
        }
    }).then(function (resp) {
        res.send(resp);
    }, function (err) {
        console.trace(err.message);
    });
});

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


var server = app.listen(3003, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at port: %s', port);
});
