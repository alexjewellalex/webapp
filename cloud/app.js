
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var expressLayouts = require('cloud/express-layouts');
var parseExpressCookieSession = require('parse-express-cookie-session');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(expressLayouts);          // Use the layout engine for express
app.use(parseExpressHttpsRedirect());    // Automatically redirect non-secure urls to secure ones
app.use(express.bodyParser());    // Middleware for reading request body

app.use(express.methodOverride());
app.use(express.cookieParser('SECRET_SIGNING_KEY'));
app.use(parseExpressCookieSession({
    fetchUser: true,
    key: 'image.sess',
    cookie: {
      maxAge: 3600000 * 24 * 30
    }
}));


app.locals._ = require('underscore');



// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function(req, res) {
  if (!Parse.User.current()) {
    res.render('hello', { message: 'Welcome to Gogo Alex' });
  }
  else {
    var user = Parse.User.current();
    res.render('settings', {
      firstName: user.get('firstName') || '',
      lastName: user.get('lastName') || '',
      headline: user.get('headline') || '',
      linkedin: user.get('linkedin') || '',
    });
  }
});

// User endpoints
app.use('/', require('cloud/user'));

// Attach the Express app to Cloud Code.
app.listen();
