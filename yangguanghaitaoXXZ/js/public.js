//根据id查找页面元素
function $id(id){
	return document.getElementById(id);
}

//获取任意区间值
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}

//随机颜色值获取
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i =1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}
//日期时间格式封装
function dateToString(sign){
	//如果用户不传递任何参数  默认日期间隔符号是  - 
	sign = sign || "-";//如果sign是未定义，就按默认值 "-"
	var d = new Date();
	var y = d.getFullYear();
	var m =toTwo( d.getMonth() + 1 ) ;
	var _date =toTwo( d.getDate() );
	var h =toTwo( d.getHours() );
	var min =toTwo( d.getMinutes() );
	var s =toTwo( d.getSeconds() );
	return y + sign + m + sign + _date + " " + h + ":" + min + ":" + s;
}
//如果得到的是小于10的数 就 拼接0
function toTwo(val){
	return val < 10 ? "0" + val : val;
}

//定义一个时间差函数  
function timeDiff(start,end){
	return Math.abs( start.getTime()-end.getTime() ) / 1000;
}


//获取非行内元素样式值的兼容问题
function getStyle( obj,attr){
	if( window.getComputedStyle){
		return window.getComputedStyle( obj,false)[attr]
	}else{
		return obj.currentStyle[attr];
	}
}

//匀速运动
function startallMove( obj,target,attr){
	clearInterval(timer);
	timer = setInterval(function(){
		var speed = target - obj.offsetLeft > 0 ?5 : -5;
		if( obj.offsetLeft = target){
			clearInterval(timer);
		}else{
			obj.style.left = obj.offsetLeft + speed + "px";
		}
	},30)
}

//碰撞
function pz( obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetWidth + obj1.offsetLeft;
	var B1 = obj1.offsetHeight + obj1.offsetTop;
	var T1 = obj1.offsetTop;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetWidth + obj1.offsetLeft;
	var B2 = obj2.offsetHeight + obj1.offsetTop;
	var T2 = obj2.offsetTop;
	
	if( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2){
		return false;
	}else{
		return true;
	}
}
//缓冲运动
function startlowMove( obj , target , attr){
	clearInterval(obj.timer);
	obj.timer = setInterval( function(){
		var current = 0;
		if( attr == "opacity"){
			current = parseFloat( getStyle(obj,attr) ) *100;
		}else{
			current = parseInt( getStyle( obj,attr ) );
		}
		var speed = (target - current) /10;
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		if( current == target){
			clearInterval( obj.timer );
		}else{
			if( attr == "opacity"){
				obj.style[attr] = (current + speed) /100;
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
	},30)
}


//链式运动
function lianMove( obj,target,attr,callback){
	clearInterval(timer)
	obj.timer = setInterval(function(){
		var current = 0;
		if( attr = "opcity"){
			current = parseFloat(getStyle( obj,attr)) * 100;
		}else{
			current = parseInt(getStyle( obj,attr));
		}		
		var speed = (target - current) /10;
		speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );
		if( target == speed){
			clearInterval( timer)
			if( callback ){
				callback();
			}
		}else{
			if( attr == "opcity"){
				obj.style[attr] = (current + speed ) /100;
			}else{
				obj.style[attr] = current + speed + "px";
			}	
		}
	},30)
}

//完美运动
function perfectMove(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//如果值为真  表示所有动作都已经完成 可以停止定时器了
		for( var attr in json ){
			var current = 0;
			if( attr == "opacity" ){ //透明度
				current = parseFloat( getStyle(obj,attr) ) * 100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) ) ;
			}else{
				current = parseInt( getStyle(obj,attr) ) ; 
			}
			
			var speed = (json[attr]-current)/10;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			if( current!=json[attr] ){//没有达到目标值  将开关变成false
				flag = false;
			} 
			
			if( attr == "opacity" ){ //透明度的操作
				obj.style[attr] = (current + speed) / 100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
	
		//如果flag值为真  表示所有动作都已经完成 可以停止定时器了
		if( flag ){
			clearInterval( obj.timer );
			//上个动作结束后进入下一个动作   
			if( callback ){
				callback();
			}
		}
	},30)
}