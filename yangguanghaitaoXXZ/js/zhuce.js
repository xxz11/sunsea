
//输入邮箱时，有焦点的时候提示6-50位字符组成，失去焦点时，判断输入的值是否符合标准；
var flaguema = null;
$("#uema").focus(function(){
	$(this).parent().find("span").html( "6-50位字符组成 " ).css("color","#CCCCCC")
}).blur(function(){
	var reg = /^\w+@\w+(\.\w+)+$/;
	if( reg.test(this.value)){
		flaguema = true;
		$(this).parent().find("span").html( "邮箱正确 " )
		                             .css("color","blue")
	}else{
		flaguema = false;
		$(this).parent().find("span").html( "请正确填写邮箱 " )
		                             .css("color","red")
	}
})

//输入密码时，有焦点的时候提示6-20位字符，可有英文，数字及标点符号组成组成，失去焦点时，判断输入的值是否符合标准；
var flagupwd = null;
$("#upwd").focus(function(){
	$(this).parent().find("span").html( "6-20位字符 " )
	                             .css("color","#CCCCCC")
}).blur(function(){
	var reg = /^\w{6,20}$/;
	if( reg.test(this.value)){
		flagupwd = true;
		$(this).parent().find("span").html( "密码可用 " )
		                             .css("color","blue")
	}else{
		flagupwd = false;
		$(this).parent().find("span").html( "英文，数字及标点符号组成组成 " )
		                             .css("color","red")
	}
})

//确认密码时，有焦点的时候提示请再次输入密码，失去焦点时，判断输入的值是否符合标准；
var flaguqpwd = null;
$("#uqpwd").focus(function(){
	$(this).parent().find("span").html( "请再次输入密码 " )
	                             .css("color","#CCCCCC")
}).blur(function(){
	if( this.value == $("#upwd").val( )){
		flaguqpwd = true;
		$(this).parent().find("span").html( "密码正确 " )
		                             .css("color","blue")
	}else{
		flaguqpwd = false;
		$(this).parent().find("span").html( "两次密码输入不一致 " )
		                             .css("color","red")
	}
})

//输入姓名时，有焦点的时候提示由中文和英文组成，失去焦点时，判断输入的值是否符合标准；
var flaguname = null;
$("#uname").focus(function(){
	$(this).parent().find("span").html( "由中文和英文组成 " )
	                             .css("color","#CCCCCC")
}).blur(function(){
	var reg = /^([\u4e00-\u9fa5]{2,4})|([a-z]{2,20})$/
	if( reg.test(this.value ) ){
		flaguname = true;
		$(this).parent().find("span").html( "姓名正确 " )
		                             .css("color","blue")
	}else{
		flaguname = false;
		$(this).parent().find("span").html( "由中文和英文组成 " )
		                             .css("color","red")
	}
})

//输入生日时时，男士默认选中，必须选中一个才可以！有焦点的时候提示由中文和英文组成，失去焦点时，判断输入的值是否符合标准；
$("#uday").focus(function(){
	$(this).parent().find("span").html( "生日可选填 " )
	                             .css("color","#CCCCCC")
}).blur(function(){
	$(this).parent().find("span").html( "" );
	                             
})


//获取验证码
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}

function getCode(){
		var arrStr = [];//存6个满足条件的字符
		for( var i = 0 ; i < 6 ; i++ ){
			var code = rand(48,122);
			if( code>=58&&code<=64 || code>=91&&code<=96 ){
				//重抽  i恢复原来的值
				i--;
			}else{
				arrStr[i] = String.fromCharCode(code);
			}
		}
		return arrStr.join("");
	}
	//alert( getCode() );
	//页面打开后 就获取六位验证码 显示到页面的span标签中
	$("#yzm").html(getCode());
	$("#btn").click (function(){
		$("#yzm").html(getCode());
	});
	
//判断输入的验证码是否一致，
var flaguyzm= null;
$("#uyzm").focus(function(){
	$(this).parent().find(".con").html( "输验证码 " )
	                             .css("color","#CCCCCC")
}).blur(function(){
	if( this.value == $("#yzm").html()){
		flaguyzm = true;
		$(this).parent().find(".con").html( "输入正确 " )
		                             .css("color","blue")
	}else{
		flaguyzm = false;
		$(this).parent().find(".con").html( "错误 " )
		                             .css("color","red")
	}
})

//判断是否同意协议，默认同意，如果checked不被选中，则无法完成注册；
var flagucheck= true;
    $("#ucheck").click(function(){
    	if( $("#ucheck").prop("checked" ) ){
		flagucheck = true;
		$("#form_ck").css("display","block")
	}else{
		flagucheck = false;
		$("#form_ck").css("display","none")
	}
    })
$("#button").click(function(){
//	var arr = [];
	arr = getCookie("message");
	if( flaguema && flagupwd && flaguqpwd && flaguname &&flaguyzm &&flagucheck){
		var json = {
			uanme : $("#uema").val(),
			upwd : $("#upwd").val()
		}
		arr.push(json)
		setCookie("message",JSON.stringify(arr));
		//location.href = "../index.html?__hbt=1516931039396";
		location.href = "denglu.html";
	}else{
		return false;
	}
})
