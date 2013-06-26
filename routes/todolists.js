
// ./routes/todolists.js

module.exports = function(app, todolists, utilities, config) {

    app.get('/todolists/:account_id', function(req, res) {

        var route = 'get_active_todolists';
        if(req.query.completed != undefined) {
            if(req.query.completed === 'true') {
                route = 'get_completed_todolists';
            }
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': route,
            'request_config': config.default_request_params
        };

        var options = todolists.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = todolists.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/todolists/:account_id/project/:project_id', function(req, res) {

        var route = 'get_active_todolists_by_project';
        if(req.query.completed != undefined) {
            if(req.query.completed === 'true') {
                route = 'get_completed_todolists_by_project';
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

        var options = todolists.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = todolists.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/todolists/:account_id/user/:user_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'user_id': req.params.user_id
            },
            'route': 'get_todolists_by_person',
            'request_config': config.default_request_params
        };

        var options = todolists.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = todolists.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/todolists/:account_id/todolist/:todolist_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'todolist_id': req.params.todolist_id
            },
            'route': 'get_todolist',
            'request_config': config.default_request_params
        };

        var options = todolists.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = todolists.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/todolists/:account_id/project/:project_id', function(req, res) {

        var required_fields = [
            'name', 'description'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "name": req.body.name,
            "description": req.body.description
        };

        if(req.body.position != undefined) {
            post_data.position = req.body.position;
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'post_data': post_data
            },
            'route': 'create_todolist',
            'request_config': config.default_request_params
        };

        var options = todolists.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = todolists.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/todolists/:account_id/project/:project_id/todolist/:todolist_id', function(req, res) {

        var required_fields = [
            'name', 'description'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "name": req.body.name,
            "description": req.body.description
        };

        if(req.body.position != undefined) {
            post_data.position = req.body.position;
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'todolist_id': req.params.todolist_id,
                'post_data': post_data
            },
            'route': 'update_todolist',
            'request_config': config.default_request_params
        };

        var options = todolists.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = todolists.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/todolists/:account_id/project/:project_id/todolist/:todolist_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'todolist_id': req.params.todolist_id
            },
            'route': 'delete_todolist',
            'request_config': config.default_request_params
        };

        var options = todolists.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = todolists.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};