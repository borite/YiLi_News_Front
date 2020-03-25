// JavaScript Document


var accessid = '';
var accesskey = '';
var host = '';
var policyBase64 = '';
var signature = '';
var callbackbody = '';
var filename = '';
var key = '';
var expire = 0;
var g_object_name = '';
var now = timestamp = Date.parse(new Date()) / 1000;
var finalUrl="";
function send_request()
{
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    if (xmlhttp!=null)
    {
		
        var serverUrl = "http://customer.imotstudio.net/YLNewsInfo/GetDirectUploadSign";
        xmlhttp.open("POST", serverUrl, false);
		xmlhttp.setRequestHeader('content-type', 'application/json');
        xmlhttp.send(null);
        return  xmlhttp.responseText;
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
};



function get_signature()
{
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.now();
	console.log(now);
	console.log(expire);
    if (expire < now + 3) //如果过期
    {
        var body = send_request()
        var obj = JSON.parse(body);
		console.log(obj);
		if(obj['Code']==200){
			var data=obj['Data'];
			host = data['OSSHost'];
			policyBase64 = data['Policy'];
			accessid = data['AccessID'];
			signature = data['Signature'];
			expire = parseInt(data['Expire']);
			key = data['Dir'];
			return true;
		}else{
			return false;
		}

    }
    return true;
};


//生成随机字符串
function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//获取文件后缀名
function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}



