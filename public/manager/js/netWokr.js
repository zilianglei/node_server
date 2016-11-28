/*说明
 * 1.不需要显示的数据如pluginId由影藏的td的text保存
 * 
 */
/*添加返回按钮*/
/*(function  bigBackBtn() {
	var backBtn = '<div class="bigBackBtn fobidSelect">返回</div>';
	$("body").append(backBtn);
	$(".bigBackBtn").on("click",function () {
		history.back();
		location.href=document.referrer;
	});
	
})();*/



function clearInput() {
	return;
	$("input[type='text']").val("");
	$("input[type='file']").val("");
}

/*1.接口url  thumbnail*/
var allPluginUrl = "/plugin/allPlugin"; //get
var queryPluginUrl = "/plugin/queryPluginVersion"; //post
var addPluginUrl = "/plugin/addPlugin"; //post
var deletePluginUrl = "/plugin/deletePlugin"; //post
var deletePluginVersionUrl = "/plugin/deleteVersion";
var publishVersionUrl = "/plugin/publishVersion";
var addPluginVersionUrl = "/plugin/fileupload";
var allDeviceUrl = "/dev/allDev";
var addDeviceUrl = "/dev/addDataModel";
var addDataModelUrl = "/dev/fileupload";
var addDevicePluginUrl = "/dev/addPlugin";
var deleteDeviceUrl = "/dev/deleteDataModel";
var changDataModel = "/dev/changeDataModel";
var queryFirmwareVersionUrl = "/firmware/queryFirmwareVersion";
var publishFirmwareVersionUrl = "/firmware/publishVersion";
var deleteFirmwareVersionUrl = "/firmware/deleteVersion";
var addFirmwareVersionUrl = "/firmware/fileupload";
var addFirmwareUrl = "/firmware/addFirmware";
/*1.接口url*/
/*2.判断哪个*/
(function getdata() {
	var fileName = $("#fileName").attr("fileNam");
	switch(fileName) {
		case "plugin":
			plugin()
			break;
		case "pluginVersion":
			pluginVersion()
			break;
		case "addPlugin":
			addPlugin()
			break;
		case "addPluginVersion":
			addPluginVersion();
			break;
		case "device":
			device();
			break;
		case "addDevice":
			addDevice();
			break;
		case "deviceDetail":
			deviceDetail();
			break;

		case "addFirmwareVersion":
			addFirmwareVersion();
			break;
		default:
			break;
	}
})();
/*2.判断哪个*/
/*---------------------------------3.添加cell方法----------------------------*/
function addCell(table, cell, arr,keyname) {
	for(var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		var cell1 = $(cell).clone();
		var table = $(table);
		for(var key in dic) {
			if($(cell1).children().length != 0) { //判断cell本身是不是只有一个元素
				$(cell1).find("[name=" + key + "]").text(dic[key]);
			} else {  
                                     if(key==keyname){
					$(cell1).text(dic[key]).val(dic["pluginId"]?dic["pluginId"]:dic[key]);}//if2
			}
		}
		$(cell1).show();
		$(table).append(cell1);
	} //for 

} //addCell2  cell有问题
function addCell2(table, cell, arr, publishVersion) {
	for(var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		var cell1 = $(cell).clone();
		var table = $(table);
		for(var key in dic) {
			$(cell1).find("[name=" + key + "]").text(dic[key]);
			if(dic["version"] == publishVersion) {
				$(cell1).find(".pluginDelete").text("在线").css("background", "orange");
				//$(cell1).find(".pluginDelete").hide();
			}
		}
		$(cell1).show();
		$(table).append(cell1);
	} //for 

} //addCell2
function addCell3(table, cell, arr,keyname) {
	for(var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		var cell1 = $(cell).clone();
		var table = $(table);
		for(var key in dic) {
			val = dic[key];
if(key == keyname && dic[key] == null){
   val = "无发布版本";
}
				$(cell1).find("[name=" + key + "]").text(val);
		}
		$(cell1).show();
		$(table).append(cell1);
	} //for

} //addCell2  cell有问题
/*----------------------------遍历form内容input和textarea-------------------------------*/
function getInputName(formId) {
	var json = {};
	var inputs = $(formId + " input");
	var textareas = $(formId + " textarea");

	for(var i = 0; i < 　inputs.length; i++) {
		var inputa = $(inputs[i]);
		var name = $(inputs[i]).attr("name");
		if(name) {
			json[name] = $(inputs[i]).val();
		}
	} //for
	for(var i = 0; i < 　textareas.length; i++) {
		var textarea = $(textareas[i]);
		var tname = $(textareas[i]).attr("name");
		if(tname) {
			json[tname] = $(textareas[i]).val();
		}
	} //for
	return json;
}
/*--------------------------获取父元素中所有属性名为x的值返回json----------------------------*/
function getDataFromEle(parentEle,clickEle,attrName){
	    var childEle = $(clickEle).parents(parentEle).children();
		var data = {};
		for(var i = 0 ; i < childEle.length; i++){
			var child = childEle[i];
			var key = $(child).attr(attrName);
			var val = $(child).text();
			if(!key){
				continue;
			}
			data[key] = val;
		}
	   return data;
}
/*-------------------------------打印遍历json-----------------------------------------*/
function logJson(myJson){
	for(var key in myJson){
		console.log(myJson[key]);
	}
}
/*-------------------------------查看插件-----------------------------------------*/
/*一.设置插件数据*/
function plugin() {
	
	$.ajax({
		type:"get",
		url:allPluginUrl,
		async:true,
		success:setPluginData,
		error:function(){
			alert("加载失败尝试刷新页面");
		}
	});
function setPluginData(data){
	//alert(data);
        var dataObj = JSON.parse(data);
	var arr = dataObj.values;

	addCell3("#table", "#cell", arr,"publishVersion");
	/*---------------------------------查看版本信息-------------------------------------------*/
	$(".pluginVersion").on("click", function() {
		var pluginId = $(this).parent().siblings("[name='pluginId']").text();

		//使用父元素保存pluginId
		$("#fileName", parent.document).attr("pluginId", pluginId);
		$("#iframe1", parent.document).attr({
			"src": "pluginVersion.html"
		});
	}); //click
	/*---------------------------------添加插件------------------------------------------*/
	$(".addPluginBtn").on("click", function() {

	});
	/*----------------------------------删除插件-----------------------------------------*/
	$(".pluginDelete").on("click", function() {


		var sure = confirm("确定删除吗?");
		var pluginId = $(this).parent().siblings("[name='pluginId']").text();
		if(sure) {
clearInput();
			$.ajax({
				type: "post",
				url: deletePluginUrl,
				async: true,
				data: {
                                  "pluginId":pluginId
                                },
				success: function(data) {
					//alert("succes");
					window.location.reload();
				},
				error: function() {
					alert("删除失败");
				}
			});
		} //if
	}); //onclick

}//successCallback
	/*----------------------------------删除插件-----------------------------------------*/

} //plugin

/*一.设置插件数据*/
/*二：查询插件版*/
function pluginVersion() {
	var pluginId = $("#fileName", parent.document).attr("pluginId");
	var thisdata = {
		"pluginId": pluginId
	};


	var queryData = null;//读取所有插件版本

	$.ajax({
		type: "post",
		url: queryPluginUrl,
		async: true,
		data: thisdata,
		success:pluginVersionCallBack,
		error: function() {
			alert("查询失败");
		},
                    timeout:5000

	}); //ajax
/*
	var queryData = {
		"pluginId": '1',
		"ret": 0,
		"publishVersion": 'V1.0.2',
		"values": [{
			"version": 'V1.0.1',
			"changeLog": null,
			"createTime": null,
			"md5": "xxxxxxx"
		}, {
			"version": 'V1.0.2',
			"changeLog": null,
			"createTime": null,
			"md5": "xxxxxxx"
		}]
	};
*/
       function pluginVersionCallBack(data){

        queryData = JSON.parse(data);
	var publishVersion = queryData.publishVersion;

	var queryArr = queryData.values;
       
	addCell2("#table", "#cell", queryArr, publishVersion);
	/*--------------------------------------删除插件版本----------------------------*/
	$(".pluginDelete").on("click", function() {
		if($(this).text() == "在线"){
			alert("在线版本无法操作");
			return;
		}
		var version = $(this).parent().siblings("[name='version']").text();
		var thisdata = {
			"pluginId": pluginId,
			"version": version
		};
		var sure = confirm("确定删除吗?");
		if(sure){
			clearInput();
		$.ajax({
			type: "post",
			url: deletePluginVersionUrl,
			async: true,
			data: thisdata,
			success: function() {
				window.location.reload();
			},
			error: function() {
				alert("删除失败!");
			}

		});
		}//if
	});
	/*三：---------------------------------发布插件版本----------------------------------*/
     //选择固件版本下拉框获取数据
		   addCell("#selectVersion", "#selectCell", queryArr,"version");
	       $(".publishPluginVersion").on("click", function() {
			   if ($("#selectVersion").prop("selectedIndex") == 0){
				   alert("请选择版本!");
				   return;
			   }
		    var version =  $(".selectedVersion").val();
			var thisdata = {
				"pluginId": pluginId,
				"version": version
			};

			clearInput();
			$.ajax({
				type: "post",
				url: publishVersionUrl,
				async: true,
				data: thisdata,
				success: function() {
					alert("发布成功");
					window.location.reload();
				},
				error: function() {
					alert("发布失败请重试!");
				}
			});

	});
}//pluginVersionCallBack
} /*二：查询插件版*/

/*三：---------------------------------添加插件----------------------------------*/
function addPlugin() {

	$(".inputSubmit").on("click", function() {

		var thisdata = getInputName("#addPluginForm");
		//alert(thisdata.pluginDesc);

		$.ajax({
			type: "post",
			url: addPluginUrl,
			async: true,
			data: thisdata,
			success: function(data) {
				if(data) {
					var sure = confirm("添加成功是否继续添加");
					if(!sure) {
						history.back();
					}
					clearInput();
				}
			},
			error: function() {
				alert("请求失败");
			}
		}); //ajax

	}); //click  
} //addPlugin

/*------------------------------四:添加插件版本-----------------------------------*/

function addPluginVersion() {

	var json = getInputName("#addVersionForm");
	var pluginId = $("#fileName", parent.document).attr("pluginId");
	json["pluginId"] = pluginId;

	//ajaxSonsubmit会自动获取input内容
	$(".inputSubmit").on("click", function() {
		$("#addVersionForm").ajaxSubmit({
			type: 'post',
			url: addPluginVersionUrl,
			//这里需要一个pluginId
			data: {
				"pluginId": pluginId
			},
			success: function(data) {
				var sure = confirm("上传成功,继续上传?");
				if(!sure) {
					history.back();
				}
				clearInput();
			},
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				alert("上传失败");
			}
		}); //ajax

	}); //onclick
} //addPluginVersion
/*-----------------------------设备类型管理------------------------------------------*/

/*-----------------------------查询设备类型-----------------------------------------*/
function device() {
	$.ajax({
		type: "get",
		url: allDeviceUrl,
		async: true,
		success: deviceSuccess,
		error: function() {
	          	alert("加载失败尝试刷新页面");
		}
	}); //ajax
/*
	var data = {
		"ret": 0,
		"values": [{
			"dataModelId": "1",
			"manufacture": 'xxxxx',
			" manufactureDataModelId": 'xxxxx',
			"devDesc": "xxxxxxxx",
			"jsonIsExist": 1,
			"pluginId": '2',
			"firmwareId": '3'
		}, {
			"dataModelId": "2",
			"manufacture": 'xxxxx',
			"manufactureDataModelId": 'xxxxx',
			"devDesc": "xxxxxxxx",
			"jsonIsExist": 1,
			"pluginId": '1',
			"firmwareId": '1'
		}]
	};
*/
   function deviceSuccess(data){
//alert(data);
        var data1 = JSON.parse(data);
	var arr = data1.values;
	addCell("#table", "#cell", arr);
/*---------------------------------------删除设备------------------------------------*/
	$(".pluginDelete").on("click", function(){
		var dataModelId = $(this).parent().siblings("[name='dataModelId']").text();
		
		var dataD = {"dataModelId":dataModelId};
		var sure = confirm("确定删除吗?");
		if(sure) {
			clearInput();
			$.ajax({
				type: "post",
				url: deleteDeviceUrl,
				async: true,
				data:dataD,
				success:function(){
                                
			        alert("删除成功");
                                window.location.reload();
				},
				error:function(){
					alert("删除失败");
				},
                                timeout:3000
				
			});//ajax
		}//if
	});
/*------------------------------------查看详情-------------------------------------------*/	
	$(".pluginVersion").on("click",function(){

	var data = getDataFromEle("#cell",this,"name");
		var dataStr = JSON.stringify(data);//alert(dataStr);
	window.sessionStorage.deviceDataStr = dataStr;
		
		
	});
	
}//success
} //device

/*--------------------------------------添加设备------------------------------------*/
function addDevice() {
	
/*--------------------------------------获取所有插件供选择-----------------------------*/
	$.ajax({
		type: "get",
		url: allPluginUrl,
		async: true,
		success: function(data) {
                        //alert(data);
                        var data1 = JSON.parse(data);
			var arr = data1.values;
			addCell("#tablePlugin", "#cellPlugin", arr,"pluginName");
		},
		error: function() {
			//			alert("加载失败尝试刷新页面");
		}
	}); //ajax

/*
	var data = {
		"ret": 0,
		"values": [{
			"pluginId": "6",
			"pluginName": '1',
			"pluginDesc": '加载的插件描述'
		}, {
			"pluginId": "9",
			"pluginName": '2',
			"pluginDesc": 'xxxxx'
		}, {
			"pluginId": "7",
			"pluginName": '3',
			"pluginDesc": 'xxxxx'
		}]
	};

	var arr = data.values;
	addCell("#tablePlugin", "#cellPlugin", arr);  
*/
/*-------------------------------提交按钮点击----------------------------------*/
$(".inputSubmit").on("click",function(){
	
/*----------------------------提交设备信息获取id-------------------------------*/
var thisData = getInputName("#addDevice");

$.ajax({
	type:"post",
	url:addDeviceUrl,
	data:thisData,
	async:true,
	success:function(data){
//alert("1成功");
		/*----------------上传dataModel文件----------------*/
                var data1 = JSON.parse(data);
		var dataModelId = data1.dataModelId;
	    $("#addDataModel").ajaxSubmit({
			type: 'post',
			url: addDataModelUrl,
			data: {
				"dataModelId":dataModelId
			},
			success: function(data) {
//alert("2成功");
		   /*--------------选择插件----------------*/
		      var pluginId  = $("#tablePlugin").val();

		      var dataP = {"pluginId":pluginId,"dataModelId":dataModelId};
		      $.ajax({
		      	type:"post",
		      	url:addDevicePluginUrl,
		      	data:dataP,
		      	async:true,
		      	success:function(data){
		      		//alert("添加插件成功");
					/*--------------添加固件------------*/
					$.ajax({
						type: "post",
						url: addFirmwareUrl,
						data: {
							"dataModelId":dataModelId
						},
						async: true,
						success: function (data) {
							//alert("添加成功");
							var sure = confirm("添加成功继续上传");
if(sure){
   clearInput();
}else{
   history.back();
}

						},
						error: function () {
							alert("添加固件失败");
						},
						timeout: 3000
					});



					/*--------------添加固件------------*/
		      	},
		      	error:function(){
		      		alert("3添加插件失败");
		      	},
                        timeout:2000
		      });
		  
		  /*---------------选择插件---------------*/
			},
			error: function() {
				alert("2上传失败");
			}
		}); //ajaxsubmit
		/*--------------------------------*/
	    
	},//success
	error:function(){
		alert("1上传失败");
	}
});//deviceAjax
	
	
});//click



}
/*---------------------------------设备详情/固件----------------------------------------*/
function deviceDetail(){
	//获取上页传值
    var data = window.sessionStorage.deviceDataStr;
//alert(data);
    var deviceData = JSON.parse(data);
    var firmwareId = deviceData['firmwareId'];
	var dataModelId = deviceData['dataModelId'];
	//alert(dataModelId);
	//alert(firmwareId);
	/*--------------------------------------获取所有插件供选择----------------------------------------------*/
	$.ajax({
		type: "get",
		url: allPluginUrl,
		async: true,
		success: function(data) {
			//alert(data);
			var data1 = JSON.parse(data);
			var arr = data1.values;
			addCell("#tablePlugin", "#cellPlugin", arr,"pluginName");

              /*判断是否已经选择插件*/
				var pluginId = deviceData["pluginId"];
				if(pluginId != "null"){
					$("#cellPlugin").text("已经上传插件");
				}else {
					$("#cellPlugin").text("未上传插件");
				}

			/*判断是否已经选择插件*/

		},
		error: function() {
			alert("加载失败尝试刷新页面");
		}
	}); //ajax

	/*---------------------------------------显示修改设备信息的插件----------------------------------------------*/
    /*-------------------------------获取设备详细信息显示在input中--------------------------------------*/
    for(var key in deviceData){
		//是否上传dataModel
		if(key == "jsonIsExist"){
			var jsonIsExist = deviceData["jsonIsExist"];
			if(jsonIsExist == "1"){
				$(".jsonIsExist").text("已经上传");
				$(".jsonIsExist").css("color","orange");
			}
			continue;
		}//大if

    	$(".inputContainer").find("[name="+key+"]").val(deviceData[key]).text(deviceData[key]);
    }


    /*-------------------------------------------修改设备类型点击--------------------------------------------*/
    $("#changeDevBtn").on("click",function () {
		var thisdata =  getInputName("#addDevice");

		thisdata.dataModelId =dataModelId;

		$.ajax({
			type:"post",
			url:changDataModel,
			async:true,
			data:thisdata,
			success:function (data) {
				alert("修改设备类型成功");
			},
			error:function(){
				alert("修改设备类型失败");
			},
			timeout:3000
		});


//修改plugin
		var pluginId = $("#tablePlugin").val();
		changeData = {"pluginId":pluginId,"dataModelId":dataModelId};
		$.ajax({
			type:"post",
			url:addDevicePluginUrl,
			async:true,
			data:changeData,
			success:function (data) {
				alert("修改插件成功");
			},
			error:function(){
				alert("修改插件失败");
			},
			timeout:3000
		});
		//修改plugin结束
	});
	/*-------------------------------------------上传dataModeljson文件--------------------------------------------*/

	$("#uploadDataModelBtn").on("click",function () {
		//alert("a");
		$("#addDataModel").ajaxSubmit({
			type: 'post',
			url: addDataModelUrl,
			data: {
				"dataModelId": dataModelId
			},
			success: function (data) {
				alert("success");
			},
			error: function () {
				alert("fail");
			}
		});







	});//click
	/*-------------------------------------------查询固件版本-----------------------------------------------------*/


	var data = {"firmwareId":firmwareId};
	$.ajax({
		type:"post",
		url:queryFirmwareVersionUrl,
		async:true,
		data:data,
		success:queryFirmwareVersionSuccess,
		error:function(){
			alert("查询固件版本失败");
		},
		timeout:3000
	});
/*
	var data = {
		"firmwareId": "1",
		"ret": 0,
		"publishVersion": 'V1.0.2',
		"values": [{
			"version": 'V1.0.1',
			"changeLog": null,
			"createTime": null,
			"md5": 'xxxxxxx'
		}, {
			"version": 'V1.0.2',
			"changeLog": null,
			"createTime": null,
			"md5": 'xxxxxxx'
		}]
	};
*/
function  queryFirmwareVersionSuccess(data) {
	//alert(data);
	//alert("查询固件版本成功");
    var data1 = JSON.parse(data);
	var arr = data1.values;
	var publishVersion = data1.publishVersion;
	var firmwareId = data1.firmwareId;

	addCell2("#tableFirmware","#cellFirmware",arr,publishVersion);

	/*--------------------------------------删除固件版本----------------------------*/
	$(".pluginDelete").on("click", function() {
		if ($(this).text() == "在线"){
			alert("在线版本不可操作!");

			return;
		}
		var version = $(this).parent().siblings("[name='version']").text();
		//alert(version);
		var thisdata = {
			"firmwareId": firmwareId,
			"version": version
		};
		var sure = confirm("确定删除");
		if(sure){
			clearInput();
		$.ajax({
			type: "post",
			url: deleteFirmwareVersionUrl,
			async: true,
			data: thisdata,
			success: function() {
				alert("删除固件版本成功");
				window.location.reload();
			},
			error: function() {
				alert("删除失败!");
			}

		});//ajax
	  }//if
	});
	/*三：---------------------------------发布固件版本----------------------------------*/
	//加载固件列表
	addCell("#addfirmwareSelect","#addfirmwareCell",arr,"version");

	$(".addfirmwareBtn").on("click", function() {
		var version = $("#addfirmwareSelect").val();
		//alert(version);

		if($("#addfirmwareSelect").prop("selectedIndex") == 0) {
			alert("请选择需要发布的固件版本");
			return;
		}
		var sure = confirm("确定发布?");
		if(sure) {
			clearInput();
			var thisdata = {
				"firmwareId": firmwareId,
				"version": version
			};
			$.ajax({
				type: "post",
				url: publishFirmwareVersionUrl,
				async: true,
				data: thisdata,
				success: function() {
					alert("发布成功!");
					window.location.reload();
				},
				error: function() {
					alert("发布失败请重试!");
				}
			});
		} //if
	});
}//firmwaresuccess

}//deviceDetail


/*------------------------------四:添加固件版本-----------------------------------*/


function addFirmwareVersion() {

    var deviceDataStr  = window.sessionStorage.deviceDataStr;
	var dataJson = JSON.parse(deviceDataStr);
	var firmwareId = dataJson["firmwareId"];

	$(".inputSubmit").on("click", function() {
		$("#addVersionForm").ajaxSubmit({
			type: 'post',
			url: addFirmwareVersionUrl,
			data:{
				"firmwareId":firmwareId
			},
			success: function(data) {
				var sure = confirm("上传成功继续上传?");
				if(!sure){
					history.back();
				}
				clearInput();
			},
			error:function(){
				alert("失败");
			}
		}); //ajax
	}); //onclick
} //addPluginVersion
