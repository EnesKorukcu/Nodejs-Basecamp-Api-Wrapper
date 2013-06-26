
// ./routes/messages.js

module.exports = function(app, messages, utilities, config) {

    app.get('/messages/:account_id/project/:project_id/message/:message_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'message_id': req.params.message_id
            },
            'route': 'get_message',
            'request_config': config.default_request_params
        };

        var options = messages.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = messages.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/messages/:account_id/project/:project_id', function(req, res) {

        var required_fields = [
            'subject', 'content', 'subscribers'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "subject": req.body.subject,
            "content": req.body.content
        };

        if(req.body.subscribers != undefined) {
            try {
                post_data.subscribers = JSON.parse(req.body.subscribers);
            }
            catch(err) {
                res.end('error');
                return false;
            }
        }

        if(req.body.attachments != undefined) {
            try {
                post_data.attachments = JSON.parse(req.body.attachments);
            }
            catch(err) {
                res.end('error');
                return false;
            }
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'post_data': post_data
            },
            'route': 'create_message',
            'request_config': config.default_request_params
        };

        var options = messages.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = messages.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/messages/:account_id/project/:project_id/message/:message_id', function(req, res) {

        var required_fields = [
            'subject', 'content', 'subscribers'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "subject": req.body.subject,
            "content": req.body.content
        };

        if(req.body.subscribers != undefined) {
            try {
                post_data.subscribers = JSON.parse(req.body.subscribers);
            }
            catch(err) {
                res.end('error');
                return false;
            }
        }

        if(req.body.attachments != undefined) {
            try {
                post_data.attachments = JSON.parse(req.body.attachments);
            }
            catch(err) {
                res.end('error');
                return false;
            }
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'message_id': req.params.message_id,
                'post_data': post_data
            },
            'route': 'update_message',
            'request_config': config.default_request_params
        };

        var options = messages.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = messages.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/messages/:account_id/project/:project_id/message/:message_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'message_id': req.params.message_id
            },
            'route': 'delete_message',
            'request_config': config.default_request_params
        };

        var options = messages.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = messages.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};