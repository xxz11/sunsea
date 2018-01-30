$(function(){
		var arr = getCookie("message");
	    if( arr.length != 0){
	    	var uname = arr[0].uanme;
	    	$("#change").html("欢迎您");
	    	$("#hide").html(uname);
	    }
})

//吸顶效果
$(document).scroll(function(){
	if( $(document).scrollTop() > 0){
		$("#headerwrap").css({
				position : "fixed",
				top : 0
			})	
	}else{
			$("#headerwrap").css({
				position : "relative" 
			})	
		}
})




//$(function(){
	//当鼠标滑过.weixin时，字体颜色改变，显现二维码图片；
$(".weixin").mouseenter(function(){
	$(this).css("background","white");
	$("#erweima").css("display","block");
	$(this).find("a").css("color","orange");
}).mouseleave(function(){
	$(this).css("background","#f5f5f5");
	$("#erweima").css("display","none");
	$(this).find("a").css("color","black")
})

$(function(){
	getCookie("message")
})

//当鼠标滑过li标签时，banner_content显示；banner_left
$(".banner_show").mouseenter(function(){
	$(this).css("background","orange")
	       .siblings()
	       .css("background","white");
	$("#banner_content").css("display","block")       
}).mouseleave(function(){
	$(this).css("background","white")
	$("#banner_content").css("display","none")   
})

//动态轮播图播放
	var timer= setInterval(autoPlay,3000);
	var index =0;
	var ulist = $(".banner_center").children();
	function autoPlay(){
		index++;
		if( index == 5){
			index = 0
		}
		$("#bannerwrap").css("background","url(../imgs/"+(index+1)+".png) no-repeat");
		$("#bannerwrap").css("background-position","center")
	    ulist.eq(index).find("a").addClass("current");
	    ulist.eq(index).siblings().find("a").removeClass("current");
	    
	    //滑过不同的banner_center.li，相对应的图片显示；
	}
    var olist =$("#banner_center").children();
		$("#banner_center").delegate("li","click",function(){
		    index = $(this).index()-1;
		    autoPlay();
		})
	

//滑过图片，图片向左移动；sec_center_left02
    $(".phomove").delegate("img","mouseenter",function(){
//  	alert()
    	$(this).css("transform","translateX(-10px)")
    }).delegate("img","mouseleave",function(){
    	$(this).css("transform","translateX(0px)")
    })


//滑过li列表，显示border；section_top_top

   $(".section_top_top").delegate("a","mouseenter",function(){
   	   
   	   $(this).addClass("active");
   	   $(this).parent().siblings().children().removeClass("active");
   })


//鼠标滑过用户中心，span显示；

    $(".man1").mouseenter(function(){
    	$(this).css("background","orange");
    	$(this).find("span").css("background","orange")
    	$(this).find("span").stop().animate({"left":"-80"},500)
    }).mouseleave(function(){
    	$(this).css("background","black");
    	$(this).find("span").css("background","black")
    	$(this).find("span").stop().animate({"left":"50"},500)
    })
    
    $(".man2").mouseenter(function(){
    	$(this).css("background","orange");
    	$(this).find("span").css("background","orange")
    	$(this).find("span").stop().animate({"left":"-80"},500)
    }).mouseleave(function(){
    	$(this).css("background","black");
    	$(this).find("span").css("background","black")
    	$(this).find("span").stop().animate({"left":"50"},500)
    })
    
    $(".man3").mouseenter(function(){
    	$(this).css("background","orange");
    	$(this).find("span").css("background","orange")
    	$(this).find("span").stop().animate({"left":"-80"},500)
    }).mouseleave(function(){
    	$(this).css("background","black");
    	$(this).find("span").css("background","black")
    	$(this).find("span").stop().animate({"left":"50"},500)
    })
    
    $(".man4").mouseenter(function(){
    	$(this).css("background","orange");
    	$(this).find("span").css("background","orange")
    	$(this).find("span").stop().animate({"left":"-80"},500)
    }).click(function(){
    	$("html,body").stop().animate({"scrollTop":0},1500)
    }).mouseleave(function(){
    	$(this).css("background","black");
    	$(this).find("span").css("background","black")
    	$(this).find("span").stop().animate({"left":"50"},500)
    })
    


//滑过不同的列表，显示不同的内容
 $("#banner_left").delegate("li","mouseenter",function(){
 	var index = $(this).index();
 	var list = $("#banner_content_ul").children();
 	list.eq(index).css("display","block")
 	                          .siblings().css("display","none")
 }).mouseleave(function(){
 	$("#banner_content_ul>li").css("display","none")
 })


//商品下架倒计时
//定义一个时间差函数  
	function timeDiff(start,end){
		return Math.abs( start.getTime()-end.getTime() ) / 1000;
	}
    var start = new Date();//当前时间
	var end = new Date("2018-12-30 19:00:00");//结束时间
	var t = timeDiff( start ,end );
	var str = ""
	//时间显示
	function showTime(){
		//剩余天数
		var d = parseInt(t/86400)
		//剩余的小时
		var h = parseInt((t - d*86400)/3600);
		//剩余的分钟 = 剩余的秒数  / 60: 
		var m = parseInt( (t - d * 86400 - h * 3600)/60 );
		//剩余的秒数
		var s = parseInt(t - d * 86400 - h*3600 - m * 60);
		str = "距结束:"+ d +"天"+ h +"时"+ m + "分" + s + "秒";
		$(".showtime").html(str);
	}
	showTime();
	var timer = setInterval(function(){
		t--;
		if( t < 0 ){
			$id("p1").innerHTML = "商品已过期";
			clearInterval(timer);
		}else{
			showTime();
		}
	},1000)