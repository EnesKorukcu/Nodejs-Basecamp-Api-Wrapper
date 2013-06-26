
// ./routes/accesses.js

module.exports = function(app, accesses, utilities, config) {

    app.get('/accesses/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': 'get_project_accesses',
            'request_config': config.default_request_params
        };

        var options = accesses.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = accesses.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/accesses/:account_id/project/:project_id', function(req, res) {

        var account_id = req.params.account_id;
        var project_id = req.params.project_id;

        if(req.body.user_id != undefined) {
            var user_id = req.body.user_id;
            var post_data = {
                "ids":[user_id]
            };
        }

        if(req.body.user_email != undefined) {
            var user_email = req.body.user_email;
            var post_data = {
                "email_addresses":[user_email]
            };
        }

        var route_options = {
            'params': {
                'account_id': account_id,
                'project_id': project_id,
                'post_data': post_data
            },
            'route': 'grand_project_access_by_id',
            'request_config': config.default_request_params
        };

        var options = accesses.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = accesses.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/accesses/:account_id/project/:project_id/user/:user_id', function(req, res) {

        var account_id  = req.params.account_id;
        var project_id  = req.params.project_id;
        var user_id     = req.params.user_id;

        var route_options = {
            'params': {
                'account_id': account_id,
                'project_id': project_id,
                'user_id': user_id
            },
            'route': 'revoke_project_access_by_id',
            'request_config': config.default_request_params
        };

        var options = accesses.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = accesses.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};