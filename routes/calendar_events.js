
// ./routes/calendar_events.js

module.exports = function(app, calendar_events, utilities, config) {

    app.get('/calendar_events/:account_id/project/:project_id', function(req, res) {

        var route = 'get_calendar_events_by_project_id';

        if(req.query.past != undefined) {
            if(req.query.past === 'true') {
                route = 'get_past_calendar_events_by_project_id';
            }
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': route,
            'request_config': config.default_request_params
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/calendar_events/:account_id/calendar/:calendar_id', function(req, res) {

        var route = 'get_calendar_events_by_calendar_id';

        if(req.query.past != undefined) {
            if(req.query.past === 'true') {
                route = 'get_past_calendar_events_by_calendar_id';
            }
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'calendar_id': req.params.calendar_id
            },
            'route': route,
            'request_config': config.default_request_params
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/calendar_events/:account_id/project/:project_id/event/:event_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'event_id': req.params.event_id
            },
            'route': 'get_calendar_event_by_project_id',
            'request_config': config.default_request_params
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/calendar_events/:account_id/calendar/:calendar_id/event/:event_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'event_id': req.params.event_id
            },
            'route': 'get_calendar_event_by_calendar_id',
            'request_config': config.default_request_params
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/calendar_events/:account_id/project/:project_id', function(req, res) {

        var required_fields = [
            'summary', 'description', 'starts_at'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "summary": req.body.summary,
            "description": req.body.description,
            "starts_at": req.body.starts_at
        };

        if(req.body.all_day != undefined) {

            post_data['all_day'] = req.body.all_day;

        }

        if(req.body.ends_at != undefined) {

            post_data['ends_at'] = req.body.ends_at;

        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'post_data': post_data
            },
            'route': 'create_calendar_event_for_project',
            'request_config': config.default_request_params,
            'post_data': post_data
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/calendar_events/:account_id/calendar/:calendar_id', function(req, res) {

        var required_fields = [
            'summary', 'description', 'starts_at'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "summary": req.body.summary,
            "description": req.body.description,
            "starts_at": req.body.starts_at
        };

        if(req.body.all_day != undefined) {

            post_data['all_day'] = req.body.all_day;

        }

        if(req.body.ends_at != undefined) {

            post_data['ends_at'] = req.body.ends_at;

        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'calendar_id': req.params.calendar_id,
                'post_data': post_data
            },
            'route': 'create_calendar_event_for_calendar',
            'request_config': config.default_request_params,
            'post_data': post_data
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/calendar_events/:account_id/project/:project_id', function(req, res) {

        var required_fields = [
            'event_id', 'summary', 'description', 'starts_at'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "event_id": req.body.event_id,
            "summary": req.body.summary,
            "description": req.body.description,
            "starts_at": req.body.starts_at
        };

        if(req.body.all_day != undefined) {

            post_data['all_day'] = req.body.all_day;

        }

        if(req.body.ends_at != undefined) {

            post_data['ends_at'] = req.body.ends_at;

        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'event_id': req.body.event_id,
                'post_data': post_data
            },
            'route': 'update_calendar_event_by_project_id',
            'request_config': config.default_request_params,
            'post_data': post_data
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/calendar_events/:account_id/calendar/:calendar_id', function(req, res) {

        var required_fields = [
            'event_id', 'summary', 'description', 'starts_at'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "event_id": req.body.event_id,
            "summary": req.body.summary,
            "description": req.body.description,
            "starts_at": req.body.starts_at
        };

        if(req.body.all_day != undefined) {

            post_data['all_day'] = req.body.all_day;

        }

        if(req.body.ends_at != undefined) {

            post_data['ends_at'] = req.body.ends_at;

        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'calendar_id': req.params.calendar_id,
                'event_id': req.body.event_id,
                'post_data': post_data
            },
            'route': 'update_calendar_event_by_calendar_id',
            'request_config': config.default_request_params,
            'post_data': post_data
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.delete('/calendar_events/:account_id/project/:project_id/event/:event_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'event_id': req.params.event_id
            },
            'route': 'delete_calendar_event_by_project_id',
            'request_config': config.default_request_params
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.delete('/calendar_events/:account_id/calendar/:calendar_id/event/:event_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'calendar_id': req.params.calendar_id,
                'event_id': req.params.event_id
            },
            'route': 'delete_calendar_event_by_calendar_id',
            'request_config': config.default_request_params
        };

        var options = calendar_events.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = calendar_events.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};