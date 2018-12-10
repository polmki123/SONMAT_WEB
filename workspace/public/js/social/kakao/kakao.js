var KakaoShare = function () {
    Kakao.init('7a3b0b5e30cecdce9e813e1bb9627390');
}

KakaoShare.prototype = {
    share: function (container, title, imgUrl, message, url, success , callback) {

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
                    title: '손맛에서 확인해보세요',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                }
            ],
            success: success,
            callback: callback
        });
    }
}




