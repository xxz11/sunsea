$(function(){
		var arr = getCookie("message");
	    if( arr.length != 0){
	    	var uname = arr[0].uanme;
	    	$("#change").html("欢迎您");
	    	$("#hide").html(uname);
	    }
})

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
    });
    

//放大镜，鼠标滑过section_pic_big时，section_pic_middle显示，target显示；
//鼠标在section_pic_big区域上移动  改变target的left和top   控制bsection_pic_middle的left和top
$("#section_pic_big").mouseenter(function(){
	$("#section_pic_middle").css("display","block");
	$("#target").css("display","block");
}).mouseleave(function(){
	$("#section_pic_middle").css("display","none");
	$("#target").css("display","none");
}).mousemove(function(e){
	var e = e || event;
	var x = e.pageX - $("#target").outerWidth()/2 - $("#section_pic_big").offset().left;
	var y = e.pageY - $("#target").outerHeight()/2 - $("#section_pic_big").offset().top;
	var maxL = $("#section_pic_big").outerWidth() - $("#target").outerWidth();
	var maxT =  $("#section_pic_big").outerHeight() - $("#target").outerHeight();	
	x = x < 0 ? 0 : ( x > maxL ? maxL : x );
	y = y < 0 ? 0 : ( y > maxT ? maxT : y );
//	console.log(x,y)
	
	var bigImgLeft = x*($("#bigimg").outerWidth()-$("#section_pic_middle").outerWidth())/($("#middleimg").outerWidth()-$("#target").outerWidth());
	var bigImgTop = y*($("#bigimg").outerHeight()-$("#section_pic_middle").outerHeight())/($("#middleimg").outerHeight()-$("#target").outerHeight());
	
	$("#target").css("left",x);
	$("#target").css("top",y);
	$("#bigimg").css("left",-bigImgLeft);
	$("#bigimg").css("top",-bigImgTop);
})

//吸顶效果；
$(document).scroll(function(){
	if( $(document).scrollTop() > 820){
		$("#xiding").css({
				position : "fixed",
				top : 0
			})	
	}else{
			$("#xiding").css({
				position : "relative" ,
			})	
		}
})

//选项卡效果；
$("#xuanxiangka").delegate("li","click",function(){
	var index = $(this).index();
	$("#content_ul>li").eq(index).css("display","block")
	                .siblings().css("display","none")
})

//页面加载，ajax，得到点击的商品id，获取商品内容并加载
$(function(){
     var str = location.href;
     str = str.split("?")[1];
     $.ajax({
     	type:"get",
     	url:"../json/liebiao.json",
     	success : function(json){
     		html = "";
     		price = "";
     		for( var i = 0; i < json.list.length; i++){
     			var pro = json.list[i]
     			if( str == pro.id){
     				html = pro.name;
     				price = pro.price;
     				pic = pro.img;
     				id = pro.id;
     			}
     		}
     		$("#section_con_name").html(html);
     		$("#spanprice").html(price);
     	}
     });
});

//为每一个clickcar添加点击事件，把当前页面的商品信息存入到cookie中；
$(".clickcar").click(function(){
	var json = {
		name : html ,
		price : price,
		src : pic,
		num : id,
		count : 1
	}
	var arr = [];// [{},{},{},....]
	var flag = true;//如果值为true  就想数组中添加产品
		
	//将cookie中的数据取出来  判断当前的商品在cookie中是否存在  如果存在就cound++ 
			var oldCookie = getCookie("shoplist");
			if( oldCookie.length != 0 ){//说明有cookie数据
				arr = oldCookie;//将取出来的cookie数据存入到数组中  
				for( var i = 0 ; i < arr.length ; i++ ){
					//说明当前操作的商品已经存入到购物车了  
					if( json.name == arr[i].name ){
						arr[i].count++;
						flag = false;
						break;
					}
				}
			}
			if( flag ){
				arr.push( json );
			}
			setCookie("shoplist",JSON.stringify(arr));
			
			if( !confirm("点击确定，继续购物，点击取消，去购物车结算") ){
				location.href = "shopcar.html";
			}
})