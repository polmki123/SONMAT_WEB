window.fbAsyncInit = function() {
    FB.init({
        appId      : '291147084566919',
        xfbml      : true,
        version    : 'v2.6'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ko_KR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function facebook() {

    this.share = function() {
        FB.ui(
            {
                method: 'share',
                href: location.href
            }, function(response){});
    };
}