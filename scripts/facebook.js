// JavaScript Document
var FBapi = {};
FBapi.host_name = "http://demo.megais.com/Alex_weiwei/senka/mobile/";
FBapi.app_id = "116751312357884";
FBapi.scope = "";

(function ($, FBapi) {
    var _shareLock = false,
        _initBol = true;
    FBapi.userObj = {};
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/zh_TW/sdk.js', function () {
        FB.init({
            appId: FBapi.app_id,
			xfbml: true,
            version: 'v2.10'
        });
		FB.AppEvents.logPageView();

        FB.getLoginStatus(function (response) {
            initUserObj(response);
        });

    });

    //============private============
    function initUserObj(response, pInitBol) {
        pInitBol = pInitBol || false;
        console.log("pInitBol=", pInitBol);
        console.log(response);
        if (response.status == "connected") {
            FBapi.userObj.fb_id = response.authResponse.userID;
            FBapi.userObj.fb_accessToken = response.authResponse.accessToken;
            fbUserData();
        } else {
            if (_initBol) {
                fbInitCallBack();
            } else {
                fbLoginCallBack();
            }
            console.log("not login");
        }
    }

    function fbUserData() {
        FB.api('/me', function (response) {
            //FBapi.userObj = $.extend(FBapi.userObj,response)
            FBapi.userObj.fb_name = response.name;
            if (response.email != undefined) {
                FBapi.userObj.fb_email = response.email;
            }
            if (_initBol) {
                fbInitCallBack(true);
            } else {
                fbLoginCallBack(true);
            }
            console.log("==========fbUserData=========");
            console.log(response);
        });
    }
    function redirectlogin(pRedirectUrl) {
        loginUrl = getLoginUrl(pRedirectUrl);
        top.window.location.href = loginUrl;
    }
    function getLoginUrl(pRedirect) {
        pRedirect = pRedirect || FBapi.host_name;
        var url = "http://www.facebook.com/dialog/oauth/?" +
            "scope=" + FBapi.scope + "&" +
            "client_id=" + FBapi.app_id + "&" +
            "redirect_uri=" + pRedirect + "&" +
            "response_type=token&" +
            "display=popup";
        return url;
    }

    function fbInitCallBack(pBol) {
        pBol = pBol || false;
        if (isFun(window.fbInitCallBack)) {
            window.fbInitCallBack(pBol);
        }
    }

    function fbLoginCallBack(pBol) {
        pBol = pBol || false;
        if (isFun(window.fbLoginCallBack)) {
            window.fbLoginCallBack(pBol);
        }
    }

    function fbUIShareCallBack(pBol) {
        pBol = pBol || false;
        if (isFun(window.fbUIShareCallBack)) {
            window.fbUIShareCallBack(pBol);
        }
    }

    function fbSendCallBack(pBol) {
        pBol = pBol || false;
        if (isFun(window.fbSendCallBack)) {
            window.fbSendCallBack(pBol);
        }
    }

    function friendCheck() {
        if (!FBapi.userObj.addFriends || !FBapi.userObj.nonFriends) return false;
        FBapi.userObj.friends = [];
        setFbFriend(FBapi.userObj.friends, FBapi.userObj.addFriends);
        setFbFriend(FBapi.userObj.friends, FBapi.userObj.nonFriends);
        FBapi.userObj.friends = FBapi.userObj.friends.sort(sorter);
        getFbFriendCallBack();
    }

    function getFbFriendCallBack() {
        if (isFun(window.getFbFriendCallBack)) {
            window.getFbFriendCallBack(true);
        }
    }

    function setFbFriend(pFriends, pArr) {
        for (var friendNum = 0; friendNum < pArr.length; friendNum++) {
            var friendObj = {}
            var nonFriendObj = pArr[friendNum];
            friendObj.id = nonFriendObj.id;
            friendObj.name = nonFriendObj.name;
            friendObj.picture = nonFriendObj.picture.data.url;
            pFriends.push(friendObj);
        }
    }

    function checkLoginPermission() {
        if (FBapi.userObj.fb_id) {
            return true;
        }
        return false;
    }

    function isFun(pObj) {
        return (pObj && typeof pObj === "function")
    }

    function sorter(a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }

    //============public============
    //登入
    FBapi.fbLogin = function (pRedirectUrl) {
        pRedirectUrl = pRedirectUrl || false;
        _initBol = false;
        if (checkLoginPermission()) {
            fbLoginCallBack(true);
        } else {
            if (!Fun.detectmobile.isMobile) {
                FB.login(function (response) {
                    initUserObj(response);
                }, { scope: FBapi.scope });
            } else {
                redirectlogin(pRedirectUrl);
            }

        }
    }

    //ui分享
    FBapi.fbUIShare = function (pObj) {
        pObj = pObj || {};
        var sendObj = {
            method: "share",//
            /*
            link        :"",//連結
            picture     :"",//圖片
            name        :"",//大標題
            caption     :"",//小標題
            description :""//內文
            */
        }
        sendObj = $.extend(sendObj, pObj);
        if (!_shareLock) {
            _shareLock = true;
        } else {
            return false;
        }

        FB.ui(sendObj, function (response) {
            _shareLock = false;
            console.log(response);
            if (response && response.post_id) {
                fbUIShareCallBack(true);
            } else {
                fbUIShareCallBack(false);
            }
            console.log(response);
        })
    }

    FBapi.getProfilePicture = function (pID) {
        var url = "https://graph.facebook.com/_id_/picture?height=100&width=100";
        url = url.replace("_id_", pID);
        return url;
    }
})(jQuery, FBapi)