window.onload = function(){
	//设置刻度盘位置
	var lis = document.getElementsByClassName("clock-dial")[0].getElementsByTagName("li");
	//通过原生js获取的是一个类数组对象，不能直接利用数据的方法,需要先转为数组
	Array.prototype.forEach.call(lis,function(item,index){
		item.style.transform = 'rotate('+6*index+'deg)';
		item.style.webkitTransform = 'rotate('+6*index+'deg)';
		item.style.msTransform = 'rotate('+6*index+'deg)';
		item.style.mozTransform = 'rotate('+6*index+'deg)';
		item.style.oTransform = 'rotate('+6*index+'deg)';
	});


	//设置钟表运动
	setInterval(function () { 
        var date = new Date(); //得到最新的时间
        ms = date.getMilliseconds();
        s = date.getSeconds()+ ms/1000; //得到整数秒和余数
        m = date.getMinutes() + s/60;
        h = date.getHours() + m/60;

        //得到旋转度数
        document.getElementsByClassName("second")[0].style.transform = "rotate("+s*6+"deg)";
        document.getElementsByClassName("second")[0].style.webkitTransform = "rotate("+s*6+"deg)";
        document.getElementsByClassName("second")[0].style.msTransform = "rotate("+s*6+"deg)";
        document.getElementsByClassName("second")[0].style.mozTransform = "rotate("+s*6+"deg)";
        document.getElementsByClassName("second")[0].style.oTransform = "rotate("+s*6+"deg)";

        document.getElementsByClassName("minute")[0].style.transform = "rotate("+m*6+"deg)";
        document.getElementsByClassName("minute")[0].style.webkitTransform = "rotate("+m*6+"deg)";
        document.getElementsByClassName("minute")[0].style.msTransform = "rotate("+m*6+"deg)";
        document.getElementsByClassName("minute")[0].style.mozTransform = "rotate("+m*6+"deg)";
        document.getElementsByClassName("minute")[0].style.oTransform = "rotate("+m*6+"deg)";

        document.getElementsByClassName("hour")[0].style.transform = "rotate("+h*30+"deg)";
        document.getElementsByClassName("hour")[0].style.webkitTransform = "rotate("+h*30+"deg)";
        document.getElementsByClassName("hour")[0].style.msTransform = "rotate("+h*30+"deg)";
        document.getElementsByClassName("hour")[0].style.mozTransform = "rotate("+h*30+"deg)";
        document.getElementsByClassName("hour")[0].style.oTransform = "rotate("+h*30+"deg)";
    },10);

}
	