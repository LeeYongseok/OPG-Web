function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)){ ele.className += " " + cls;}
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function init() {
    document.getElementById("menu-toggle").addEventListener("click", toggleMenu);
    }

//실제 작동 알고리즘
function toggleMenu() {
    var ele = document.getElementsByTagName('body')[0];
    if (!hasClass(ele, "open")) {
        addClass(ele, "open");
        $('#menu-toggle').css('right','340px');
    } else {
        removeClass(ele, "open");
        $('#menu-toggle').css('right','40px');
    }
}

document.addEventListener('readystatechange', function() {
        if (document.readyState === "complete") {
            init();
        }
});

/*menubar 열리고 닫히는거 알고리즘*/


$(document).ready(function(){
    $('#menu>ul>li>a').click(function(){
      $('#menu ul ul').slideUp();
        
        if(!$(this).next().is(':visible'))
		{
			$(this).next().slideDown();
		}
    });
    $(".noactive").click(function(){return false;});
    
    $('a.up-scroll').click(function(){
        $('html, body').animate( { 'scrollTop': 0 }, 'slow');
    });
});

/*아코디언 알고리즘*/
                  
$(window).scroll(function(){
    var windowScrollTop=$(this).scrollTop();

    if(windowScrollTop>120){
    $('a.up-scroll').css('opacity','1');
    }else{
    $('a.up-scroll').css('opacity','0');
    }
});

/*스크롤바 생성 알고리즘*/

// $(window).resize(function(){
//     var ele = document.getElementsByTagName('body')[0];
//     if(hasClass(ele, "open")){
//      if($(window).width()<380){
//          $('#menu').prepend($('#menu-toggle'));
//          $('#menu-toggle').css({
//           "position":"absolute",
//              "right":"0"
//          });
//      }else{
         
//         $('.head').append($('#menu-toggle'));
//          $('#menu-toggle').css({
//           "position":"absolute",
//              "right":"40px"
//         });
//          removeClass(ele, "open");
//      }
//     }
// }).resize();
