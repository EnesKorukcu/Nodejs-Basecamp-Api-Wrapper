
// ./routes/uploads.js

module.exports = function(app, uploads, utilities, config) {

    app.post('/uploads/:account_id', function(req, res) {

        var account_id = req.params.account_id;
        var file_name = req.body.file_name;
        var upload_message = req.body.upload_message;
        var subscribers = req.body.subscribers;
        var attachment_token = req.body.attachment_token;
        var project_id = req.body.project_id;

        var post_data = {
            "content": upload_message,
            "attachments": [
                {
                    "token": attachment_token,
                    "name": file_name
                }
            ],
            "subscribers": subscribers
        };

        var route_options = {
            'params': {
                'account_id': account_id,
                'project_id': project_id,
                'post_data': post_data
            },
            'route': 'create_upload',
            'request_config': config.default_request_params
        };

        var options = uploads.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = uploads.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });


    });

    app.get('/uploads/:account_id/project/:project_id/upload/:upload_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'upload_id': req.params.upload_id
            },
            'route': 'get_upload',
            'request_config': config.default_request_params
        };

        var options = uploads.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = uploads.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });


    });

};