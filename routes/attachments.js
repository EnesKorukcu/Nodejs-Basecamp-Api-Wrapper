
// ./routes/attachments.js

module.exports = function(app, attachments, utilities, config) {

    app.post('/attachments/:account_id', function(req, res) {

        var account_id = req.params.account_id;
        var media_object = req.body.media_object;
        var content_type = req.body.content_type;

        var post_data = utilities.querystring.stringify({
            "data-binary": media_object
        });

        var route_options = {
            'params': {
                'account_id': account_id,
                'content_type': content_type,
                'post_data': post_data
            },
            'route': 'create_attachment',
            'request_config': config.default_request_params
        };

        var options = attachments.options_builder(route_options);

        console.log(options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = attachments.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/attachments/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': 'get_attachments_by_project_id',
            'request_config': config.default_request_params
        };

        var options = attachments.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = attachments.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/attachments/:account_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': 'get_attachments',
            'request_config': config.default_request_params
        };

        var options = attachments.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = attachments.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });
};