
// ./routes/todos.js

module.exports = function(app, todos, utilities, config) {

    app.get('/todos/:account_id/project/:project_id/todo/:todo_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'todo_id': req.params.todo_id
            },
            'route': 'get_todo',
            'request_config': config.default_request_params
        };

        var options = todos.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = todos.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/todos/:account_id/project/:project_id/todolist/:todolist_id', function(req, res) {

        var required_fields = [
            'content', 'due_at', 'assignee'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "content": req.body.content,
            "due_at": req.body.due_at
        };

        try {
            post_data.assignee = JSON.parse(req.body.assignee);
        }
        catch(err) {
            res.end('error');
            return false;
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'todolist_id': req.params.todolist_id,
                'post_data': post_data
            },
            'route': 'create_todo',
            'request_config': config.default_request_params
        };

        var options = todos.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = todos.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/todos/:account_id/project/:project_id/todo/:todo_id', function(req, res) {

        var required_fields = [
            'content', 'due_at', 'assignee'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "content": req.body.content,
            "due_at": req.body.due_at
        };

        try {
            post_data.assignee = JSON.parse(req.body.assignee);
        }
        catch(err) {
            res.end('error');
            return false;
        }

        if(req.body.completed != undefined) {
            switch(req.body.completed) {
                case 'true':
                    post_data.completed = true;
                    break;
                case 'false':
                    post_data.completed = false;
                    break;
            }
        }

        if(req.body.position != undefined) {
            post_data.position = req.body.position;
        }

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'todo_id': req.params.todo_id,
                'post_data': post_data
            },
            'route': 'update_todo',
            'request_config': config.default_request_params
        };

        var options = todos.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = todos.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/todos/:account_id/project/:project_id/todo/:todo_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'todo_id': req.params.todo_id
            },
            'route': 'delete_todo',
            'request_config': config.default_request_params
        };

        var options = todos.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = todos.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};