
// express init
var express     = require('express');
var app         = express();

// config & utilities
var config      = require('./config.js')();
var utilities   = require('./utilities.js')();
utilities.querystring = require('querystring');

// sections
var accesses            = require('./sections/accesses.js')();
var attachments         = require('./sections/attachments.js')();
var people              = require('./sections/people.js')();
var calendars           = require('./sections/calendars.js')();
var calendar_events     = require('./sections/calendar_events.js')();
var comments            = require('./sections/comments.js')();
var documents           = require('./sections/documents.js')();
var events              = require('./sections/events.js')();
var messages            = require('./sections/messages.js')();
var projects            = require('./sections/projects.js')();
var todolists           = require('./sections/todolists.js')();
var todos               = require('./sections/todos.js')();
var topics              = require('./sections/topics.js')();
var uploads             = require('./sections/uploads.js')();

// routes
accesses.routes            = require('./routes/accesses.js')(app, accesses, utilities, config);
attachments.routes         = require('./routes/attachments.js')(app, attachments, utilities, config);
calendar_events.routes     = require('./routes/calendar_events.js')(app, calendar_events, utilities, config);
calendars.routes           = require('./routes/calendars.js')(app, calendars, utilities, config);
comments.routes            = require('./routes/comments.js')(app, comments, utilities, config);
documents.routes           = require('./routes/documents.js')(app, documents, utilities, config);
events.routes              = require('./routes/events.js')(app, events, utilities, config);
messages.routes            = require('./routes/messages.js')(app, messages, utilities, config);
people.routes              = require('./routes/people.js')(app, people, utilities, config);
projects.routes            = require('./routes/projects.js')(app, projects, utilities, config);
todolists.routes           = require('./routes/todolists.js')(app, todolists, utilities, config);
todos.routes               = require('./routes/todos.js')(app, todos, utilities, config);
topics.routes              = require('./routes/topics.js')(app, topics, utilities, config);
uploads.routes             = require('./routes/uploads.js')(app, uploads, utilities, config);

// body parser for post requests
app.use(express.bodyParser());

// start app
app.listen(3000);
console.log('Listening on port 3000');