
// ./routes/projects.js

module.exports = function(app, projects, utilities, config) {

    app.get('/projects/:account_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': 'get_projects',
            'request_config': config.default_request_params
        };

        if(req.query.archived != undefined) {

            if(req.query.archived === 'true') {
                route_options.route = 'get_archived_projects';
            }
        }

        var options = projects.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = projects.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/projects/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': 'get_project',
            'request_config': config.default_request_params
        };

        var options = projects.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = projects.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/projects/:account_id', function(req, res) {

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

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'post_data': post_data
            },
            'route': 'create_project',
            'request_config': config.default_request_params
        };

        var options = projects.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = projects.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/projects/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
            },
            'request_config': config.default_request_params
        };

        if(req.query.archived != undefined) {

            switch(req.query.archived) {
                case 'true':
                    route_options.route = 'archive_project';
                    var post_data = {
                        "archived": true
                    };
                    break;
                case 'false':
                    route_options.route = 'unarchive_project';
                    var post_data = {
                        "archived": false
                    };
                    break;
            }
            route_options.post_data = post_data;

        }
        else {

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
            route_options.route = 'update_project';
            route_options.post_data = post_data;

        }

        var options = projects.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = projects.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });


    app.del('/projects/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': 'delete_project',
            'request_config': config.default_request_params
        };

        var options = projects.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = projects.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};