
// ./routes/people.js

module.exports = function(app, people, utilities, config) {

    app.get('/people/:account_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': 'get_people',
            'request_config': config.default_request_params
        };

        var options = people.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = people.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/people/:account_id/person/:user_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'user_id': req.params.user_id
            },
            'route': 'get_person',
            'request_config': config.default_request_params
        };

        var options = people.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = people.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/people/:account_id/person/:user_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'user_id': req.params.user_id
            },
            'route': 'delete_person',
            'request_config': config.default_request_params
        };

        var options = people.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = people.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};