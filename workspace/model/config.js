'use strict';

var config = {
    initAssociations: function(db) {

        // user_link_cloud_service
        db.user_cloud_service.belongsTo(db.user, { foreignKey: 'user_id', targetKey: 'id' });

        // font_follow
        db.font_follow.belongsTo(db.user, { foreignKey: 'user_id', targetKey: 'id' });
        db.font_follow.belongsTo(db.font, { foreignKey: 'font_id', targetKey: 'id'});

        // sonmat_request
        db.sonmat_request.belongsTo(db.user, { as: 'From', foreignKey: 'from_user_id', targetKey: 'id' });
        db.sonmat_request.belongsTo(db.user, { as: 'To', foreignKey: 'to_user_id', targetKey: 'id' });
        db.sonmat_request.belongsTo(db.sonmat, { foreignKey: 'sonmat_id', targetKey: 'id' });

        // message
        db.message.belongsTo(db.user, { foreignKey: 'user_id', targetKey: 'id' });

        // font
        db.font.belongsTo(db.user, { foreignKey: 'user_id', targetKey: 'id' });

        // sonmat
        db.sonmat.belongsTo(db.message, { foreignKey: 'message_id', targetKey: 'id' });
        db.sonmat.belongsTo(db.font, { foreignKey: 'font_id', targetKey: 'id' });

        // db.Publisher.hasMany(db.Books, {foreignKey: 'pub_id'});
        // db.Books.belongsTo(db.Publisher, {foreignKey: 'pub_id', targetKey: 'pub_id'});
        // db.RentHistory.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});
        // db.RentHistory.belongsTo(db.Books, {foreignKey: 'book_id', targetKey: 'book_id'});
    },
    initHooks: function(db) {
        /*db.Publisher.hook('beforeCreate', function() {
            //TODO; create작업 전에 해야할 사항들.
        });

        db.Publisher.beforeCreate(function() {
            //TODO; create작업 전에 해야할 사항들.
        });*/
    }
};

module.exports = config;
