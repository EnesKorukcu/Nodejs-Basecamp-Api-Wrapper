
module.exports = function() {

    var obj = {
        'default_request_params': {
            hostname: 'basecamp.com',
            port: 443,
            path: '',
            method:'',
            account_id: '',
            api_prefix: 'api/v1',
            headers: {
                'User-Agent':  "Your_App_Name (Your_Email)",
                'Authorization': 'Basic ' + (new Buffer('User_Email:User_Password')).toString('base64')
            }
        }
    };

    return obj;
};