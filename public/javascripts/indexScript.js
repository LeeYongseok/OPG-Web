$(document).ready(function(){


    function screen_setting(){
        var full_width = $(window).width();
        var full_height = $(window).height();

        $("header .logo").css("left", full_width*0.03);
        $("header #mainTitle").css("left", (full_width*0.06)+100);

        if(full_width<=1200){
            $('body').width(1200);
        }
        else{
            $('body').width(full_width);
        }

        var main_width = $("#main").width();
        var main_height = $("#main").height();

        $("#main>.side").width(main_width*0.3);
        var side_width = $("#main>.side").width();
        $("#main>#mid").width(main_width*0.4);
        var mid_width = $("#main>#mid").width();
        $("#main #center").height(200).width(main_width*0.4);
        $("#main #center>img").css("top", "25px");
        $("#main>.side>.menu_tab>.menu>*").css("left",(side_width/2)-60);
        $("#main>#mid>.menu_tab>.menu>*").css("left",(mid_width/2)-60);

        if(full_height<=800){
            $("#main").height(600).css("background-image", "url(" + randombgurl + ")");
            $("#main").css("background-size", main_width.toString()+"px 600px");
            $("#main>#mid>.menu_tab").height(200);
            $("#main>.side>.menu_tab").height(300);
            $("#main #center").css("top",200);
            $("#main>.side>.menu_tab>.menu>*").css("top",90);
            $("#main>#mid>.menu_tab>.menu>*").css("top",40);
            $("#main>#mid>.menu_tab:last").css("top",200);
        }
        else{
            $("#main").height(full_height-200).css("background-image", "url(" + randombgurl + ")");
            main_height = $("#main").height();
            $("#main>.side>.menu_tab").height(main_height/2);
            $("#main>#mid>.menu_tab").height((main_height/2)-100);
            $("#main #center").css("top", (main_height/2)-100);
            $("#main").css("background-size", main_width.toString()+"px "+main_height.toString()+"px");
            $("#main>.side>.menu_tab>.menu>*").css("top",(main_height/4)-60);
            $("#main>#mid>.menu_tab>.menu>*").css("top",((main_height/2)-100)/2-60);
             $("#main>#mid>.menu_tab:last").css("top",200);
//            $("#main>.side>.menu_tab:last>.menu>*").css("top",((main_height/2)-100)/2-60);
        }

         $('#loginBg').width(full_width);
        $('#loginContainer').css('left',(full_width-500)/2);
        if(full_height<=800){
            $('#loginBg').height(800);
            $('#loginContainer').css('top',150);
            $('#exit').css('top',150);
        }
        else{
            $('#loginBg').height(full_height);
            $('#loginContainer').css('top',(full_height-500)/2);
            $('#exit').css('top',(full_height-500)/2);
        }
//        $('#exit').css('right', 0).css('top',0);
        $('#exit').css('left', ((full_width+500)/2));
    }

    var randombgurl = randombg();
    screen_setting();

    $( window ).resize(function() {
                screen_setting();
            });



    var angleStart = -360;

    // jquery rotate animation
    function rotate(li,d) {
        $({d:angleStart}).animate({d:d}, {
            step: function(now) {
                $(li)
                   .css({ transform: 'rotate('+now+'deg)' })
                   .find('a')
                      .css({ transform: 'rotate('+(-now)+'deg)' });
            }, duration: 0
        });
    }


    $('#main .menu_tab').hover(function() {

        if($('#main .menu_tab').hasClass('open')){
            var element = $('#main .open');
            element.removeClass('open');
            var li = element.find('li');
            for(var i=0; i<li.length; i++) {
                rotate(li[i],angleStart);
            }
        }
        $(this).addClass('open');
        var li = $("#main .open").find('li');
        var liLength = li.length;
        var deg = 360/liLength;
        for(var i=0; i<liLength; i++) {
            var d;
            if(liLength == 2){
                d = (i*deg)+87;
            }
            else if(liLength == 4){
                d = (i*deg)+42;
            }
            else{
                d = (i*deg)+30;
            }
            rotate(li[i],d);
        }
    }, function() {
        if($('#main .menu_tab').hasClass('open')){
            var element = $('#main .open');
            element.removeClass('open');
            var li = element.find('li');
            for(var i=0; i<li.length; i++) {
                rotate(li[i],angleStart);
            }
        }
    });

    $('#login').click(function (){
        $('.hidden').addClass('visible');
    });

    $('#close').click(function (){
        $('.hidden').removeClass('visible');
    });

    function randombg(){
      var bgarray = ['images/BGimages/bg1.jpg', 'images/BGimages/bg2.jpg', 'images/BGimages/bg3.jpg', 'images/BGimages/bg4.jpg', 'images/BGimages/bg5.jpg', 'images/BGimages/bg6.jpeg', 'images/BGimages/bg7.jpeg', 'images/BGimages/bg8.jpeg', 'images/BGimages/bg9.jpg', 'images/BGimages/bg10.jpeg', 'images/BGimages/bg11.jpeg', 'images/BGimages/bg12.jpeg', 'images/BGimages/bg13.jpeg', 'images/BGimages/bg14.jpeg', 'images/BGimages/bg15.jpeg', 'images/BGimages/bg16.jpeg', 'images/BGimages/bg17.jpeg'];
      var bgnumber = Math.floor((Math.random() * bgarray.length));
      return bgarray[bgnumber];
    }

});
