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

function create_new_font(user_id, body){

    if (body.name == "") body.name = getDate_format();

	return new Promise(function(resolve, reject){
		models.font.create({
			user_id: user_id,
			name: body.name,
			description: body.desc,
		}).then(function(font) {
			resolve(font)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function getDate_format(){
    var date_time = new Date();
    var yyyy = date_time.getFullYear().toString();
    var MM = pad(date_time.getMonth() + 1,2);
    var dd = pad(date_time.getDate(), 2);
    var hh = pad(date_time.getHours(), 2);
    var mm = pad(date_time.getMinutes(), 2)
    var ss = pad(date_time.getSeconds(), 2)
    return yyyy+'/'+MM+'/'+dd+' '+hh+':'+mm+':'+ss;
}
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

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

            // 에디터에 등록할 대표 폰트 리스트
            var main_font_list = [];

            // 실제 사용되는 변형 폰트 리스트
            var variation_font_list = [];

            font_id_name_list.forEach(function(font) {

                // get font_file_paths
                var font_file_paths  = get_font_file_paths(font);
                if (font_file_paths === null) return null;

                // get 대표 폰트 (: 현재는 변형 폰트 1번이 대표 폰트)
                var main_font = get_main_font(font, font_file_paths[0]);
                main_font_list.push(main_font);

                // get 변형 폰트
                font_file_paths.forEach(function(font_file_path) {

                    var variation_font = get_variation_font(font, font_file_path);
                    variation_font_list.push(variation_font);
                });
            });

            var result = {};
            result.main_font_list = main_font_list;
            result.variation_font_list = variation_font_list;

            return result;
    });
}

function get_font_file_paths(font) {

    var FONT_FILE_ROOT_DIR_PATH = 'repository/font/';
    var FONT_FILE_PATH_PREFIX = 'font/';
    var FONT_EXT_NAME = '.ttf';

    // /font/{font_id} 폴더
    var font_file_dir_path = FONT_FILE_ROOT_DIR_PATH + font.id;

    var font_file_paths = [];

    if (!fs.existsSync(font_file_dir_path))
        return null;

    // get font_file_paths
    fs.readdirSync(font_file_dir_path).forEach(function(font_file_name) {

        // ttf 이외의 파일 exclude
        if(font_file_name.substring(font_file_name.lastIndexOf('\.')) !== FONT_EXT_NAME)
            return;

        // ttf 파일 경로 저장
        font_file_paths.push(FONT_FILE_PATH_PREFIX + font.id + '/' + font_file_name);
    });

    if (font_file_paths.length == 0)
        return null;

    return font_file_paths;
}

function get_main_font(font, font_file_path) {

    var main_font = {};

    main_font.id = font.id;
    main_font.font_name = font.name;
    main_font.file_path = font_file_path;

    return main_font;
}

function get_variation_font(font, font_file_path) {

    var variation_font = {};

    var font_name_delimiter = '-';
    var font_file_name = font_file_path.substring(font_file_path.lastIndexOf('/')+1, font_file_path.lastIndexOf('\.'));

    variation_font.id = font.id;
    variation_font.font_name = font.name + font_name_delimiter + font_file_name;
    variation_font.file_path = font_file_path;

    return variation_font;
}

var func = {}
func.find_new_by_userid = find_new_by_userid;
func.checked_by_userid = checked_by_userid;
func.create_new_font = create_new_font;
func.notify_complete = notify_complete;
func.get_font_list = get_font_list;

module.exports = func;
