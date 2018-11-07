var path = require('path');
var fs = require('fs');

function image_dir_change(file, repo_section, repo_id, filename){
	var prev_path = file.path;
	var type = file.type.split('/')[1];
	var name = filename + '.' + type
	var dir = path.join(__dirname, '..', '..', 'repository', repo_section, repo_id)
	var next_path = path.join(dir, name)
	
	if(file._writeStream.bytesWritten < 1){
		fs.unlinkSync(prev_path);
		return false;
	}else{
		if (fs.existsSync(dir)){
			fs.renameSync(prev_path, next_path);
			return true;
		}else{
			fs.mkdirSync(dir, {recursive: true});
			fs.renameSync(prev_path, next_path);
			return true;
		}
	}
}

func = {}
func.image_dir_change = image_dir_change;
module.exports = func;
