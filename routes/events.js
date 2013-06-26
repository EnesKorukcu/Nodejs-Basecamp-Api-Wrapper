
// ./routes/events.js

module.exports = function(app, events, utilities, config) {

    app.get('/events/:account_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': 'get_global_events',
            'request_config': config.default_request_params
        };

        if(req.query.page != undefined) {
            route_options.params.page = req.query.page;
        }

        if(req.query.since != undefined) {
            route_options.params.since = req.query.since;
        }

        var options = events.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/events/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': 'get_global_events',
            'request_config': config.default_request_params
        };

        if(req.query.page != undefined) {
            route_options.params.page = req.query.page;
        }

        if(req.query.since != undefined) {
            route_options.params.since = req.query.since;
        }

        var options = events.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/events/:account_id/user/:user_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'user_id': req.params.user_id
            },
            'route': 'get_person_events',
            'request_config': config.default_request_params
        };

        if(req.query.page != undefined) {
            route_options.params.page = req.query.page;
        }

        if(req.query.since != undefined) {
            route_options.params.since = req.query.since;
        }

        var options = events.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};