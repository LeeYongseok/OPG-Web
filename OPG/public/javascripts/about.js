window.onload = function(){
    $(".hover_box1").hover(
        function(){
        $(".hover_box1").addClass("box");
        
      
    },
        function(){
            $(".hover_box1").removeClass("box");
            $(".hover_box1").html("01<hr>세미나");
    }); 
    
    $(".hover_box2").hover(
        function(){
        $(".hover_box2").addClass("box");
        $(".hover_box2").html("작품전시회");
    },
        function(){
            $(".hover_box2").removeClass("box");
            $(".hover_box2").html("02<hr>작품전시회");
    }); 
    
    $(".hover_box3").hover(
        function(){
        $(".hover_box3").addClass("box");
        $(".hover_box3").html("MT");
    },
        function(){
            $(".hover_box3").removeClass("box");
            $(".hover_box3").html("03<hr>MT");
    }); 
    
    $(".hover_box4").hover(
        function(){
        $(".hover_box4").addClass("box");
        $(".hover_box4").html("스터디");
    },
        function(){
            $(".hover_box4").removeClass("box");
            $(".hover_box4").html("04<hr>스터디");
    }); 
    
    $(".hover_box5").hover(
        function(){
        $(".hover_box5").addClass("box");
        $(".hover_box5").html("활동");
    },
        function(){
            $(".hover_box5").removeClass("box");
            $(".hover_box5").html("05<hr>활동");
    }); 
}