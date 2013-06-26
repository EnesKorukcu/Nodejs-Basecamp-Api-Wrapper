
// ./sections/todolists.js

module.exports = function() {

    var obj = {
        'response_mapper': function(route_options, response) {
            var reader_response = {
                'headers': this.settings[route_options.route].response_map[response.status_code].headers,
                'status_code': this.settings[route_options.route].response_map[response.status_code].response_code,
                'message': this.settings[route_options.route].response_map[response.status_code].message,
                'data': response.data
            };
            return reader_response;
        },
        'options_builder': function(route_options) {

            var params          = route_options.params;
            var route           = route_options.route;
            var request_config  = route_options.request_config;

            // get current route conf from settings object
            var route_conf      = this.settings[route].get_route_config(params);

            // write current route conf to request_config object
            for(var setting in route_conf) {
                switch(setting) {
                    case 'headers':
                        for(var header in route_conf.headers) {
                            request_config.headers[header] = route_conf.headers[header];
                        }
                        break;
                    default:
                        request_config[setting] = route_conf[setting];
                        break;
                }
            }

            // create options object from request_config
            var options = {
                'hostname': request_config.hostname,
                'port': request_config.port,
                'path': '/' + request_config.account_id + '/' + request_config.api_prefix + '/' + request_config.path,
                'method': request_config.method,
                'headers': request_config.headers
            };

            return options;

        },
        'settings': {
            'get_active_todolists': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'todolists.json',
                        'method': 'get'
                    };
                    return route_config;
                },
                'response_map': {
                    '200': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'all active todolists for all projects'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'get_completed_todolists': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'todolists/completed.json',
                        'method': 'get'
                    };
                    return route_config;
                },
                'response_map': {
                    '200': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'all completed todolists for all projects'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'get_active_todolists_by_project': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'projects/' + params.project_id + '/todolists.json',
                        'method': 'get'
                    };
                    return route_config;
                },
                'response_map': {
                    '200': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'all active todolists for all projects'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'get_completed_todolists_by_project': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'projects/' + params.project_id + '/todolists/completed.json',
                        'method': 'get'
                    };
                    return route_config;
                },
                'response_map': {
                    '200': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'all completed todolists for all projects'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'get_todolists_by_person': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'people/' + params.user_id + '/assigned_todos.json',
                        'method': 'get'
                    };
                    return route_config;
                },
                'response_map': {
                    '200': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'all todolists by person'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'get_todolist': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'projects/' + params.project_id + '/todolists/' + params.todolist_id + '.json',
                        'method': 'get'
                    };
                    return route_config;
                },
                'response_map': {
                    '200': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'todolist by id'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'create_todolist': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'projects/' + params.project_id + '/todolists.json',
                        'method': 'post',
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    };
                    return route_config;
                },
                'response_map': {
                    '201': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'todolist created'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'update_todolist': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'projects/' + params.project_id + '/todolists/' + params.todolist_id + '.json',
                        'method': 'put',
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    };
                    return route_config;
                },
                'response_map': {
                    '200': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'todolist updated'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            },
            'delete_todolist': {
                'get_route_config': function(params) {
                    var route_config = {
                        'account_id': params.account_id,
                        'path': 'projects/' + params.project_id + '/todolists/' + params.todolist_id + '.json',
                        'method': 'delete'
                    };
                    return route_config;
                },
                'response_map': {
                    '204': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '200',
                        'message': 'todolist deleted'
                    },
                    '301': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'remote service has an error'
                    },
                    '400': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '400',
                        'message': 'bad request'
                    },
                    '403': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '403',
                        'message': 'forbidden'
                    },
                    '404': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '404',
                        'message': 'wrong request url'
                    },
                    '411': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '411',
                        'message': 'missing parameters'
                    },
                    '500': {
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'response_code': '512',
                        'message': 'basecamp api produced an error'
                    }
                }
            }

        }

    };

    return obj;

};