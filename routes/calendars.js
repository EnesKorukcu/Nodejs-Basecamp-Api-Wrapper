
// ./routes/calendars.js

module.exports = function(app, calendars, utilities, config) {

    app.get('/calendars/:account_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': 'get_calendars',
            'request_config': config.default_request_params
        };

        var options = calendars.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = calendars.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/calendars/:account_id/calendar/:calendar_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'calendar_id': req.params.calendar_id
            },
            'route': 'get_calendar_by_id',
            'request_config': config.default_request_params
        };

        var options = calendars.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = calendars.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/calendars/:account_id', function(req, res) {

        var required_fields = [
            'name'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "name": req.body.name
        };

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'post_data': post_data
            },
            'route': 'create_calendar',
            'request_config': config.default_request_params,
            'post_data': post_data
        };

        var options = calendars.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = calendars.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/calendars/:account_id/calendar/:calendar_id', function(req, res) {

        var required_fields = [
            'name'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "name": req.body.name
        };

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'calendar_id': req.params.calendar_id,
                'post_data': post_data
            },
            'route': 'update_calendar',
            'request_config': config.default_request_params,
            'post_data': post_data
        };

        var options = calendars.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = calendars.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/calendars/:account_id/calendar/:calendar_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'calendar_id': req.params.calendar_id
            },
            'route': 'delete_calendar',
            'request_config': config.default_request_params
        };

        var options = calendars.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = calendars.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};