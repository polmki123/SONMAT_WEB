var KakaoShare = function () {
    Kakao.init('7a3b0b5e30cecdce9e813e1bb9627390');
}

KakaoShare.prototype = {
    share: function (container, title, imgUrl, message, url) {
        Kakao.Link.createDefaultButton({
            container: container,
            objectType: 'feed',
            content: {
                title: title,
                description: message,
                imageUrl: imgUrl,
                link: {
                    webUrl: url,
                    mobileWebUrl: url
                }
            },
            buttons: [
                {
                    title: 'Open!',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                }
            ]
        });
    }
}




