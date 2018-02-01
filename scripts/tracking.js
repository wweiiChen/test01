  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-80425111-14');


  $(function(){
      $('[megais_ga]').on('click', function(){
          var trackStr = $(this).attr('megais_ga');
          window.trackingEvent(trackStr, "click");
      })
  });

  window.trackingEvent = function(_trackpage,_action){
      gtag('event', _action, {
         'event_category': _trackpage,
         'event_label': 'Google' 
      });
  }
  

//  全站 retargeting  
if (typeof(window.APPIER_RETARGET)  == 'undefined') {
  (function(w, d, s, m) {
      var f = d.getElementsByTagName('script')[0],
          j = d.createElement('script'),
          ns = 'APPIER_RETARGET';
      w._appierSendQueue = w._appierSendQueue || [];
      w['appierRetargetJson'] = { id: s, site: m};
      j.async = true;
      j.src = '//jscdn.appier.net/aa.js?id='+m;
      f.parentNode.insertBefore(j, f);
      !w[ns] && (w[ns] = {});
      (!w[ns].send) && (w[ns].send = function(j){
          w._appierSendQueue.push(j);
      });
  })(window, document, "bmku", "lg-twinwash.com");
}

window.APPIER_RETARGET.send({"t":"pv_track","action_id": "z7HWYZOoOg9Jk74","track_id":"4xvrcmVCf33Yfsb","isCountReload": true,"counter": 0});
window.APPIER_RETARGET.send({"t":"pv_track","action_id": "Fj7hCwqIUZp1JBP","track_id":"4xvrcmVCf33Yfsb","isCountReload": false,"counter": 1});

//  Landing Page
window.APPIER_RETARGET.send({
    "action_id": "TsYWFQ3kjJkCIdx",
    "track_id": "4xvrcmVCf33Yfsb",
    "opts": {unique_key: 'true'}
});
