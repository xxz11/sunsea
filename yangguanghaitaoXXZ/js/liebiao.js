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
    })
    

		//页面加载，加载json对象中的数据；
		$(function(){
			$.ajax({
				type:"get",
				url:"../json/liebiao.json",
				success : function(json){
						getShow(json);
				}
			});
				
		});
		var index = 1;//页码  默认显示第一页  
        function getShow(json){
        	var str = "";
			var html = "";
			var arr = json.list;
	        var pageNum = 20; //每页的数据量
				for( var i = (index-1)*pageNum; i < index*pageNum; i++){
					var pro = arr[i]
					if( i < arr.length){
						html += 
					       `<li  class = "ajax_li">
					            <a href = "">
										<a  href="xiangqingye.html?${pro.id}">
											<img src="${pro.img}">
										</a>	
									</div>
									<div  class = "ajax_name">${pro.name}</div>
									<div  class = "ajax_price">${pro.price}</div>
							</li>`
					}
				}
				$("#ajax").html( html );
				//处理 页面中页码数量
			    //计算总页数 
				pageTotle = Math.ceil( arr.length/pageNum );
				var page = "";
				for( var j = 1 ; j <= pageTotle ; j++ ){
					page += `<li class = "show"><a href="javascript:;" >${j}</a></li>`;
				}
				$("#list_ul").html(page)
				//当前页码index对应的页码的li高亮显示
//				alert($("#list_ul").eq(index-1))
        }
           
   //操作页码显示对应页的数据   委托
				$("#list_ul").delegate("a","click",function(){
//					alert($(this).parent().index())
					index = $(this).parent().index();
					 if( index == 0){
                    	index = 1;
                    }
					$.ajax({
							type: "get",
							url: "../json/liebiao.json",
							success : function(json){
									        getShow(json);
								        }										
								})
					 $("#list_ul").eq(index).addClass("show");
//					 $("#list_ul").eq(index).siblings().removeClass("show");
				})