
// ./routes/topics.js

module.exports = function(app, topics, utilities, config) {

    app.get('/topics/:account_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': 'get_all_topics',
            'request_config': config.default_request_params
        };

        var options = topics.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = topics.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/topics/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': 'get_topics_by_project',
            'request_config': config.default_request_params
        };

        var options = topics.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = topics.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};