'use strict';

var app = app || {};


(function (module) {
  const adminView = {};

  adminView.initAdminPage = function (ctx, next) {
    $('.nav-menu').slideUp(350);
    $('.admin-view').show();

    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = event.target.passphrase.value;

      // DONE / COMMENT: Is the token cleared out of local storage? Do you agree or disagree with this structure?
      //no because information in localstorage persists even after closing the browser window
      $.get(`${ENV.apiUrl}/api/v1/admin`, {token})
        .then(res => {
          localStorage.token = true;
          page('/');
        })
        .catch(() => page('/'));
    })
  };

  adminView.verify = function(ctx, next) {
    if(!localStorage.token) {
    $('.admin').addClass('admin-only');
    }else{
      $('.admin').show();
    next();
  }
  }
  module.adminView = adminView;
})(app)
