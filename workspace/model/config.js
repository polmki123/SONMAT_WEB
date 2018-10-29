'use strict';

var config = {
  initAssociations: function(db) {


  },
  initHooks: function(db) {
    db.Publisher.hook('beforeCreate', function() {
      //TODO; create작업 전에 해야할 사항들.
    });

    db.Publisher.beforeCreate(function() {
      //TODO; create작업 전에 해야할 사항들.
    });
  }
};

module.exports = config;
