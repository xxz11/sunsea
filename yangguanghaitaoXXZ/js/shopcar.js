//页面加载   显示购物车数据     
	//获取cookie中的信息
	var arr = getCookie("shoplist");
	var html = "";
	for( var i = 0 ; i < arr.length ; i++ ){
		var shopinfo = arr[i];//[{},{},{}]
		html += `<div class = "section_shop">
						<p class = "fl p1"><input type="checkbox" class = "ck"></p>
						<img class="fl imgs" src="${shopinfo.src}" alt="" />
						<p class = "fl concon">${shopinfo.name}</p>
						<p class = "fl price">${shopinfo.price}</p>
						<div class = "fl count">
							<span class="updateCount" data-number="1">+</span>
							<span class="shop-count">${shopinfo.count}</span>
							<span class="updateCount" data-number="-1">-</span>
						</div>
						<i class="fl delBtn">删除</i>	
					</div>`
	}
	$("#section_con").html(html)


//价格结算；
    function getMoney(){
    	var sumCount = 0;
		var sumMoney = 0;
		
		$(".ck:checked").each(function(){
			var str = $(this).parent().parent().find(".price").html();
			str = str.split("¥")[1];
			sumCount += parseInt( $(this).parent().parent().find(".shop-count").html() );
			sumMoney += parseInt( str );
		})
		$(".section_bot_num").html(sumCount);
		$(".section_bot_price").html(sumMoney);
    }
    
    //	全选操作；
    $(".allck").click(function(){
    	$(".ck").prop("checked",$(this).prop("checked"));
    	getMoney();
    });
    
    $(".ck").click(function(){
		getMoney();
	})    
    
      //删除操作；
    $(".delBtn").click(function(){
	  var pname = $(this).parent().find(".concon").html();
	  for( var i = 0; i < arr.length; i++){
	  	  if( arr[i].name == pname ){
	  	  	arr.splice( i,1 );
	  	  	setCookie("shoplist",JSON.stringify(arr));
				break;
	  	  }
	  }
      $(this).parent().remove();
    })
   

    //count加减操作
//  $(".updateCount").click(function(){
//  	var pname = $(this).parent().data("name");
//  })
