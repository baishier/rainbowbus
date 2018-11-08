/**
 * 
 */
var basetextstyle = "#597aff";
var basebackstyle = "#c7c8ff";
var getBasetextleftmargi = function() {
	return 30;
	// return parseInt($("#basetextleftmargin").val());
}
var getdztextleftmargi = function() {
	//console.log((400-($("#daozhan").val().length*30))/2);
	//console.log($("#myCanvas").measureText('dzText').width);
	var lef = (400-($("#daozhan").val().length*30))/2;
	return lef > 30 ? lef : 30;
	// return parseInt($("#basetextleftmargin").val());
}

var setTextColor = function(picker) {
	basetextstyle = "#" + picker.toString();
	$("#zitiyanse").text(picker.toString());
	genImg();
}
var setBackColor = function(picker) {
	basebackstyle = "#" + picker.toString();
	$("#beijingyanse").text(picker.toString());
	genImg();
}

var genImg = function() {
	var mycanvas = $("#myCanvas");
	var yysflag = $("#yysflag").val();
	mycanvas.clearCanvas();
	genback(mycanvas);
	genbc(mycanvas, $("#banci").val());// 班次
	genzw(mycanvas, $("#zaowan").val());// 早晚
	genyys(mycanvas, yysflag);
	genlxmc(mycanvas, $("#luxianmingcheng").val());// 路线名称
	gendz(mycanvas, $("#daozhan").val());// 到站
	genxyz(mycanvas, "下一站：" + $("#xiayizhan").val());// 下一站
	return mycanvas.get(0);
};

var genyys = function(mycanvas, yysflag) {
	if ("icon" == yysflag) {
		genyysicon(mycanvas);// 运营商icon
	} else {
		genyystext(mycanvas, $("#yystext").val());// 运营商文字
	}

}
var genback = function() {
	$("#myCanvas").drawRect({
		fillStyle : basebackstyle,
		x : 200,
		y : 160,
		width : 400,
		height : 100,
		cornerRadius : 10
	});

	$("#myCanvas").drawLine({
		strokeStyle : basebackstyle,
		strokeWidth : 10,
		x1 : 0,
		y1 : 10,
		x2 : 400,
		y2 : 10
	});

	$("#myCanvas").drawLine({
		strokeStyle : basebackstyle,
		strokeWidth : 10,
		x1 : 0,
		y1 : 290,
		x2 : 400,
		y2 : 290
	});
}
// 生成班次信息
var genbc = function(mycanvas, bc) {
	mycanvas.drawText({
		name : "bancitext",
		fillStyle : basetextstyle,
		fontStyle : "bold",
		fontSize : "20pt",
		fontFamily : "Trebuchet MS, sans-serif",
		align : 'left',
		respectAlign : true,
		text : bc,
		x : getBasetextleftmargi(),
		y : 50,
		maxWidth : 5
	});
}
// 生成早晚信息
var genzw = function(mycanvas, zaowan) {
	mycanvas.drawText({
		name : "zwtext",
		fillStyle : basetextstyle,
		fontStyle : "bold",
		fontSize : "15pt",
		fontFamily : "Trebuchet MS, sans-serif",
		align : 'left',
		respectAlign : true,
		text : zaowan,
		x : (120 + getBasetextleftmargi()),
		y : 50,
		maxWidth : 100
	});
}
// 生成运营商信息
var genyystext = function(mycanvas, yystext) {
	mycanvas.drawText({
		fillStyle : basetextstyle,
		fontStyle : "bold",
		fontSize : "15pt",
		fontFamily : "Trebuchet MS, sans-serif",
		align : 'left',
		respectAlign : true,
		text : yystext,
		x : (280 + getBasetextleftmargi()),
		y : 50,
		maxWidth : 100
	});
}
$("#yysflag").live("change", function(event) {
	if (this.value == 'icon') {
		$("#fish").show();
		$("#yystext").hide();
	}
	if (this.value == 'text') {
		$("#fish").hide();
		$("#yystext").show();
	}
	genImg();

});
// 生成运营商icon信息
var fishimg = new Image();// 创建图片
fishimg.crossOrigin = 'anonymous';// 跨域问题处理
// 上传图片
$("#fish").live("change", function(event) {
	var file = event.target.files[0];
	var url = window.URL.createObjectURL(file);
	fishimg.src = url;
	genImg();
});
var genyysicon = function(mycanvas) {
	if ($("#fish").val() != "") {
		mycanvas.drawImage({
			source : fishimg,
			x : 310,
			y : 60,
			width : 88,
			height : 88
		});
	}
}

// 生成路线名称
var genlxmc = function(mycanvas, lxmc) {
	mycanvas.drawText({
		fillStyle : basetextstyle,
		fontStyle : "bold",
		fontSize : "15pt",
		fontFamily : "Trebuchet MS, sans-serif",
		align : 'left',
		respectAlign : true,
		text : lxmc,
		x : getBasetextleftmargi(),
		y : 80
	});
}

// 生成到站
var gendz = function(mycanvas, dz) {
	mycanvas.drawText({
		fillStyle : basetextstyle,
		fontStyle : "bold",
		fontSize : "10pt",
		fontFamily : "Trebuchet MS, sans-serif",
		align : 'left',
		respectAlign : true,
		text : "到：",
		x : 10,
		y : 160
	});
	mycanvas.drawText({
		name : "dzText",
		fillStyle : basetextstyle,
		fontStyle : "bold",
		fontSize : "25pt",
		fontFamily : "Trebuchet MS, sans-serif",
		align : 'left',
		respectAlign : true,
		text : dz,
		x : getdztextleftmargi(),
		y : 160
	});
}

// 生成下一站
var genxyz = function(mycanvas, xyz) {
	mycanvas.drawText({
		fillStyle : basetextstyle,
		fontStyle : "bold",
		fontSize : "15pt",
		fontFamily : "Trebuchet MS, sans-serif",
		align : 'left',
		respectAlign : true,
		text : xyz,
		x : getBasetextleftmargi(),
		y : 260
	});
}

// 下载图片
var downloadimg = function(canvas, name) {
	var a = document.createElement("a");
	a.href = canvas.toDataURL();
	a.download = name;
	a.click();
};

$(document).ready(function() {
	$(":text").bind("input propertychange", function(event) {
		genImg();
	});
	genImg();
});