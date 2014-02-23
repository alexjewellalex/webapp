
// -- Global Vars -- //
require('cloud/app.js');


// -- Factory Expert -- //

function performActions(actions) {

  actions.forEach(function(action) {
    action.object.send();
  });

}
