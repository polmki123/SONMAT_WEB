'use strict';

var config = {
  initAssociations: function(db) {
    db.Message.belongsTo(db.User, {as:'Sender', foreignKey: 'sender_id', targetKey: 'id'})
    db.Message.belongsTo(db.User, {as:'Receiver', foreignKey: 'receiver_id', targetKey: 'id'})
    db.Font.belongsTo(db.User, {foreignKey: 'maker_id', targetKey: 'id'})
    // db.Publisher.hasMany(db.Books, {foreignKey: 'pub_id'});
    // db.Books.belongsTo(db.Publisher, {foreignKey: 'pub_id', targetKey: 'pub_id'});
    // db.RentHistory.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});
    // db.RentHistory.belongsTo(db.Books, {foreignKey: 'book_id', targetKey: 'book_id'});
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
