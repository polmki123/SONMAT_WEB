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

function get_font_list() {

    var FONT_FILES_DIR_PATH = 'public/sonmat/font/';
    var FONT_FILE_PREFIX = '../sonmat/font/';

    // 폰트 파일 명 (확장자 없음)
    var font_names = [];
    // 폰트 다운로드 요청 경로
    var font_file_path = [];

    fs.readdirSync(FONT_FILES_DIR_PATH).forEach(function(font_name) {
        font_names.push(font_name.substring(0, font_name.lastIndexOf('\.')));
        font_file_path.push(FONT_FILE_PREFIX + font_name);
    });

    var fonts = {};
    fonts.font_names = font_names;
    fonts.font_file_path = font_file_path;

    return fonts;
}

var func = {}
func.find_new_by_userid = find_new_by_userid;
func.checked_by_userid = checked_by_userid;
func.create_new_font = create_new_font;
func.notify_complete = notify_complete;
func.get_font_list = get_font_list;

module.exports = func;
