Kakao.init('7a3b0b5e30cecdce9e813e1bb9627390');

function kakao() {


    this.shareStory = function(text , url) {
        Kakao.Story.share({
            url: url,
            text: text
        });
    };

    this.sendLink = function(title, imgUrl, message , url) {
        Kakao.Link.sendDefault({
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