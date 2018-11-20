var models = require('../model');
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
		})
		.then(function(fonts) {
			fonts_json = JSON.parse(JSON.stringify(fonts));
			resolve(fonts_json)
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

function create_new_font(user_id){
	return new Promise(function(resolve, reject){
		models.font.create({user_id: user_id})
		.then(function(font) {
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

function get_font_id_name_list_by_user(user_id) {
    return new Promise(function(resolve, reject){
        models.font.findAll({
            where: {
                user_id: user_id,
                making_status: 'complete',
            },
            attributes: ['id', 'name'],
            order: [['making_date', 'DESC']],
        })
        .then(function(fonts) {
            fonts_json = JSON.parse(JSON.stringify(fonts));
            resolve(fonts_json);
        }).catch(function(err) {
            reject(err);
        });
    });
}

function get_font_list(user_id) {

    // TODO DELETE THIS!
    user_id = 2;


    return get_font_id_name_list_by_user(user_id) // get fonts (id, name) by user id
        .then(function(font_id_name_list) {

            var font_list = [];

            // append main font_file, variation font_file
            font_id_name_list.forEach(function(font) {

                var font_file_paths  = get_font_file_paths(font);
                if (font_file_paths === null) return;

                font.main_font_file = get_main_font_file(font, font_file_paths);
                font.variation_font_file = get_variation_font_file(font, font_file_paths);

                font_list.push(font);
            });

            return font_list;
    });
}

function get_font_file_paths(font) {

    var FONT_FILES_ROOT_DIR_PATH = 'repository/font/';
    var FONT_EXT_NAME = '.ttf';

    // /font/{font_id} 폴더
    var font_file_dir_path = FONT_FILES_ROOT_DIR_PATH + font.id;

    var font_file_paths = [];

    if (!fs.existsSync(font_file_dir_path))
        return null;

    // get font_file_paths
    fs.readdirSync(font_file_dir_path).forEach(function(font_file_name) {

        // ttf 이외의 파일 exclude
        if(font_file_name.substring(font_file_name.lastIndexOf('\.')) !== FONT_EXT_NAME)
            return;

        // ttf 파일 경로 저장
        font_file_paths.push(font_file_dir_path + '/' + font_file_name);
    });

    if (font_file_paths.length == 0)
        return null;

    return font_file_paths;
}

function get_main_font_file(font, font_file_paths) {

    var main_font_file = {};

    main_font_file.font_name = font.name;
    main_font_file.file_path = font_file_paths[0];

    return main_font_file;
}

function get_variation_font_file(font, font_file_paths) {

    var font_name_delimiter = '-';
    var variation_font_file = [];

    font_file_paths.forEach(function(font_file_path) {

        var var_font_file = {};

        var font_file_name = font_file_path.substring(font_file_path.lastIndexOf('/')+1, font_file_path.lastIndexOf('\.'));

        var_font_file.font_name = font.name + font_name_delimiter + font_file_name;
        var_font_file.file_path = font_file_path;

        variation_font_file.push(var_font_file);
    });

    return variation_font_file;
}

var func = {}
func.find_new_by_userid = find_new_by_userid;
func.checked_by_userid = checked_by_userid;
func.create_new_font = create_new_font;
func.notify_complete = notify_complete;
func.get_font_list = get_font_list;

module.exports = func;
