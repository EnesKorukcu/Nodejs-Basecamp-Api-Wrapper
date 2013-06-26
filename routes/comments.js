
// ./routes/comments.js

module.exports = function(app, comments, utilities, config) {

    app.post('/comments/:account_id/project/:project_id/section/:section/section_object_id/:section_object_id', function(req, res) {

        var required_fields = [
            'content', 'subscribers'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "content": req.body.content,
            "subscribers": req.body.subscribers
        };

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
                'section': req.params.section,
                'section_object_id': req.params.section_object_id,
                'post_data': post_data
            },
            'route': 'create_comment',
            'request_config': config.default_request_params
        };

        var options = comments.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = comments.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/comments/:account_id/project/:project_id/comment/:comment_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'comment_id': req.params.comment_id
            },
            'route': 'delete_comment',
            'request_config': config.default_request_params
        };

        var options = comments.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = comments.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};