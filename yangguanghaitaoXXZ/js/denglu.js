//首先把cookie取出来；
$("#button").click(function(){
	var arr = getCookie("message");
	var uname = $("#uname").val();
	var upwd = $("#upwd").val();
	alert(arr)
	for( var i = 0; i < arr.length; i ++){
		if( uname == arr[i].uanme && upwd == arr[i].upwd){
			alert("账号密码正确，即将进入主页面");
			setTimeout(function(){
				location.href = "index.html";
			},2000)
			break;
		}else{
			alert("账号或密码输入有误，请重新确认")
			return false;
		}
	}

})
