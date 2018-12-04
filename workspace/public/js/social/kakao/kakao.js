Kakao.init('7a3b0b5e30cecdce9e813e1bb9627390');

function kakao() {

    this.getUserProfile = function() {
        Kakao.API.request({
            url: '/v1/user/me',
            success: function(res) {
                alert(JSON.stringify(res));
            },
            fail: function(error) {
                alert(JSON.stringify(error));
            }
        });
    };

    this.shareStory = function(text , url) {
        Kakao.Story.share({
            url: url,
            text: text
        });
    };

    this.sendLink = function(title, imgUrl, message , url) {
        Kakao.Link.sendTalkLink({
            label: title,
            image: {
                src: imgUrl,
                width: '300',
                height: '200'
            },
            webLink: {
                text:message,
                url: url
            },
            fail: function() {
                kakao.shareStory(title , url);
            }
        });
    }
}