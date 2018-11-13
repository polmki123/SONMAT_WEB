var express = require('express');
var router = express.Router();

/* GET home page. */
// create, gallery
router.get('/gallery', function(req, res, next) {

});

router.get('/create', function(req, res, next) {
	// 이미지 업로드 
	// 폰트 이름 작성
	// 폰트 Description 작성 with loginRequired

	res.render('create');
});

router.get('/complete', function(req, res, next) {
	// 딥러닝 서버에서 Font 제작을 완료했을 때 여기로 요청

	// Font table Update with FontID
	// id
	// maker_id 	: req.body.userid
	// name			: (default)
	// description	: (default)
	// make_date	: now
	// is_public	: False
	// follower_num	: NULL

	// font_actual_path : ??
	// 실제 폰트파일 저장 경로?

	// make alarm to user
	// ???? 이거 어떻게 하지 ?? 같이 고민해보자

	res.sendStatus(200)
});

router.post('/upload', function(req, res, next) {
	// 이미지 파일 저장 및 폰트 제작 요청 with loginRequired
	
	console.log(req.files.image)
	// 이미지 저장 경로 설정 후 redirect

	// Font table Create
	// Font table 에 데이터 저장
	// id
	// maker_id 	: req.user.userid
	// name			: req.body.name
	// description	: req.body.desc
	// make_date	: now
	// is_public	: False
	// follower_num	: NULL

	// 딥러닝 서버로 Message Queue 날리기
	// Info, 이미지 경로, 이미지 파일 이름, FontID

	// 기존에 만들었던 폰트의 "미리보기" 와 현재 제작중인 폰트에 (재작중) 표시
	res.redirect('/');
});

module.exports = router;