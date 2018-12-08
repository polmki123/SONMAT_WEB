var models = require('../model');
var date_format = require('./handler/date_format_handler');
var fs = require('fs');

function find_new_by_userid(user_id){
	return new Promise(function(resolve, reject){
		models.font.findAll({
			where: {
				user_id: user_id,
				read_state: 'unread',
				making_status: 'complete',
			},
			order: [['making_date', 'DESC']],
		}).map(font => font.get({ plain: true }))
		.then(function(fonts) {
			resolve(fonts)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function checked_by_userid(user_id){
	return new Promise(function(resolve, reject){
		models.font.update({read_state: 'read'},
		{
			where: {
				user_id: user_id,
				read_state: 'unread',
				making_status: 'complete',
			},
		})
            .then(function(result) {
			resolve(result)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function create_new_font(user_id, body){

    if (body.name == "") body.name = date_format.get_now_format_date();

	return new Promise(function(resolve, reject){
		models.font.create({
			user_id: user_id,
			name: body.name,
			description: body.desc,
            handwrite_image_path: body.file_path
		}).then(function(font) {
			resolve(font)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function notify_complete(font_id){
	return new Promise(function(resolve, reject){
		models.font.update({making_status: 'complete'},
		{
			where: {
				id: font_id,
			},
		})
		.then(function(result) {
			resolve(result)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function get_font_list(user_id) {

    // get fonts by user id
    return get_font_list_by_user(user_id)
    .then(function(font_list) {

        var font_map = new Map();

        font_list.forEach(function(_font) {

            var font = {};
            font.id = _font.id;
            font.name = _font.name;
            font.description = _font.description;
            font.file_path = [];
            font.file_name = [];

            _font.font_file_maps.forEach(function(font_file_map) {

                var font_file_url = font_file_map.file_path;
                font.file_path.push(font_file_url);
                font.file_name.push(font_file_url.substring(font_file_url.lastIndexOf('/')+1, font_file_url.lastIndexOf('\.')));
            });

            font_map[font.id] = font;
            console.log(JSON.stringify(font));
            console.log(JSON.stringify(font_map));
        });

        return font_map;
    });
}

function get_font_list_by_user(user_id) {

    return new Promise(function(resolve, reject){
        models.font.findAll({
            include: [{
                model: models.font_file_map,
                required: false,
                attributes: ['file_path'],
            }],
            where: {
                user_id: user_id,
                making_status: 'complete',
            },
            attributes: ['id', 'name', 'description'],
            order: [['making_date', 'DESC']],
        }).map(font => font.get({ plain: true }))
            .then(function(fonts) {
                resolve(fonts);
            }).catch(function(err) {
            reject(err);
        });
    });
}

function my_font_gallery_user_id(user_id){
	return new Promise(function(resolve, reject){
		models.font.findAll({
			where: {
                user_id: user_id,
                making_status: "complete"
			},
			order: [['making_date', 'DESC']],
		}).map(font => font.get({plain: true}))
		.then(function(fonts) {
            fonts.forEach(function(font){
				font.making_date = date_format.format_date(font.making_date);
			})
			resolve(fonts)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function my_font_gallery_font_id(font_id){
	return new Promise(function(resolve, reject){
		models.font.findOne({
			where: {
				id: font_id,
			},
		})
		.then(function(font) {
            font.making_date = date_format.format_date(font.making_date);
			resolve(font.get({ plain: true }));
		}).catch(function(err) {
			reject(err);
		});
	});
};

function update_font_information(font_id, name, description){
	return new Promise(function(resolve, reject){
		models.font.update({
            name: name,
            description: description,
        }, {
            where:{
                id: font_id,
            }
        }).then(function(_) {
			resolve(true)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function save_font_urls(font_id, font_urls) {

    var promises = [];

    font_urls.forEach(function(font_url) {

        promises.push(
            new Promise(function(resolve, reject){
                models.font_file_map.create({
                    font_id: font_id,
                    file_path: font_url
                }).then(function(font) {
                    resolve(font)
                }).catch(function(err) {
                    reject(err);
                })
            })
        );
    });

    return Promise.all(promises);
}

var func = {}
func.find_new_by_userid = find_new_by_userid;
func.checked_by_userid = checked_by_userid;
func.create_new_font = create_new_font;
func.notify_complete = notify_complete;
func.get_font_list = get_font_list;
func.my_font_gallery_font_id = my_font_gallery_font_id;
func.my_font_gallery_user_id = my_font_gallery_user_id;
func.update_font_information = update_font_information;
func.save_font_urls = save_font_urls;

module.exports = func;
