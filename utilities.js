
var https = require('https');

module.exports = function() {

    var obc = {
        'requests': {
            'get_request': function(options, callback) {

                var req = https.request(options, function(res) {

                    var data = '';

                    var response_object = {
                        'status_code': res.statusCode,
                        'headers': res.headers
                    };

                    res.on('data', function(d) {
                        data = data + d;
                    });

                    res.on('end', function() {
                        switch(response_object.headers['content-type']) {
                            case 'application/json; charset=utf-8':
                                try {
                                    data = JSON.parse(data);
                                }
                                catch(err) {

                                }
                                break;
                        }
                        response_object.data = data;
                        callback(response_object);
                    });

                });
                req.end();

                req.on('error', function(e) {
                    console.error(e);
                });
            },
            'post_request': function(options, post_data, callback) {

                // Set up the request
                var post_req = https.request(options, function(response) {

                    var data = '';

                    var response_object = {
                        'status_code': response.statusCode,
                        'headers': response.headers
                    };

                    response.setEncoding('utf8');

                    response.on('data', function (chunk) {
                        data = data + chunk;
                    });
                    response.on('end', function() {
                        switch(response_object.headers['content-type']) {
                            case 'application/json; charset=utf-8':
                                try {
                                    data = JSON.parse(data);
                                }
                                catch(err) {

                                }
                                break;
                        }
                        response_object.data = data;
                        callback(response_object);
                    });

                }).on('error', function(e) {
                        console.log("Got error: " + e.message);
                        response_object = {
                            'status_code': 500,
                            'headers': '',
                            'data': ''
                        };
                        callback(response_object);
                    });

                // post the data
                post_req.write(JSON.stringify(post_data));
                post_req.end();


            },
            'delete_request': function(options, callback) {

                var req = https.request(options, function(resp){

                    var response_object = {
                        'status_code': resp.statusCode,
                        'headers': resp.headers
                    };

                    var data = '';

                    resp.on('data', function(chunk){
                        //do something with chunk
                        data = data + chunk;
                    });
                    resp.on('end', function() {
                        switch(response_object.headers['content-type']) {
                            case 'application/json; charset=utf-8':
                                try {
                                    data = JSON.parse(data);
                                }
                                catch(err) {

                                }
                                break;
                        }
                        response_object.data = data;
                        callback(response_object);
                    });
                }).on("error", function(e){
                        console.log("Got error: " + e.message);
                    });

                req.end();

                /*

                var req = https.request(options, function(res) {

                    var data = '';

                    var response_object = {
                        'status_code': res.statusCode,
                        'headers': res.headers
                    };

                    res.on('data', function(d) {
                        data = data + d;
                    });

                    res.on('end', function() {

                        switch(response_object.headers['content-type']) {
                            case 'application/json; charset=utf-8':
                                try {
                                    data = JSON.parse(data);
                                }
                                catch(err) {

                                }
                                break;
                        }
                        response_object.data = data;
                        callback(response_object);
                    });

                });

                req.end();

                req.on('error', function(e) {
                    console.error(e);
                });

                */

            },
            'put_request': function(options, post_data ,callback) {
                // Set up the request
                var post_req = https.request(options, function(response) {

                    var data = '';

                    var response_object = {
                        'status_code': response.statusCode,
                        'headers': response.headers
                    };

                    response.setEncoding('utf8');

                    response.on('data', function (chunk) {
                        data = data + chunk;
                    });
                    response.on('end', function() {
                        switch(response_object.headers['content-type']) {
                            case 'application/json; charset=utf-8':
                                try {
                                    data = JSON.parse(data);
                                }
                                catch(err) {

                                }
                                break;
                        }
                        response_object.data = data;
                        callback(response_object);
                    });
                });

                // post the data
                post_req.write(JSON.stringify(post_data));
                post_req.end();
            }
        },
        'output': function(res, mapped_response) {
            var response = {
                'message': mapped_response.message,
                'data': mapped_response.data
            };
            for(header in mapped_response.headers) {
                res.setHeader(header, mapped_response.headers[header]);
            }
            res.statusCode = mapped_response.status_code;
            res.end(JSON.stringify(response));

        },
        'requester_check': function (remote_address) {
            var safe_ips = [
                "127.0.0.1"
            ];
            for(ip in safe_ips) {
                if(remote_address === safe_ips[ip]) {
                    return true;
                }
            }
            return false;
        }
    };

    return obc;

};