
// ./routes/documents.js

module.exports = function(app, documents, utilities, config) {

    app.get('/documents/:account_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id
            },
            'route': 'get_documents',
            'request_config': config.default_request_params
        };

        var options = documents.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = documents.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/documents/:account_id/project/:project_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id
            },
            'route': 'get_documents_by_project_id',
            'request_config': config.default_request_params
        };

        var options = documents.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = documents.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.get('/documents/:account_id/project/:project_id/document/:document_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'document_id': req.params.document_id
            },
            'route': 'get_document_by_document_id',
            'request_config': config.default_request_params
        };

        var options = documents.options_builder(route_options);

        utilities.requests.get_request(options, function(response) {

            var mapped_response = documents.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.post('/documents/:account_id/project/:project_id', function(req, res) {

        var required_fields = [
            'title', 'content'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "title": req.body.title,
            "content": req.body.content
        };


        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'post_data': post_data
            },
            'route': 'create_document',
            'request_config': config.default_request_params
        };

        var options = documents.options_builder(route_options);

        utilities.requests.post_request(options, post_data, function(response) {

            var mapped_response = documents.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.put('/documents/:account_id/project/:project_id/document/:document_id', function(req, res) {

        var required_fields = [
            'title', 'content'
        ];

        for(field in required_fields) {
            if(req.body[required_fields[field]] === undefined) {
                res.end('error');
                return false;
            }
        }

        var post_data = {
            "title": req.body.title,
            "content": req.body.content
        };


        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'document_id': req.params.document_id,
                'post_data': post_data
            },
            'route': 'update_document',
            'request_config': config.default_request_params
        };

        var options = documents.options_builder(route_options);

        utilities.requests.put_request(options, post_data, function(response) {

            var mapped_response = documents.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

    app.del('/documents/:account_id/project/:project_id/document/:document_id', function(req, res) {

        var route_options = {
            'params': {
                'account_id': req.params.account_id,
                'project_id': req.params.project_id,
                'document_id': req.params.document_id
            },
            'route': 'delete_document',
            'request_config': config.default_request_params
        };

        var options = documents.options_builder(route_options);

        utilities.requests.delete_request(options, function(response) {

            var mapped_response = documents.response_mapper(route_options, response);
            utilities.output(res, mapped_response);

        });

    });

};