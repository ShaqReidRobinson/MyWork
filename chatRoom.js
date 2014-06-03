$(document).ready(function() {
$("#logInBtn").click(function(){
$("#chatSection").slideToggle("slow",function() {
});
});
});

$(document).on("mobileinit", function(){
$.mobile.defaultPageTransition = "slide";
});

var doTimeout = true;
var lastid = 0;

window.addEventListener("load", function() {
var reg = document.getElementById("register");
reg.addEventListener("submit", function(a){
a.preventDefault();
a.stopPropagation();
registerUser();
}, true);
}, false);


window.addEventListener("load", function() {
var sendfrm = document.getElementById("sendmsg");
sendfrm.addEventListener("submit", function(e) {
e.preventDefault();
e.stopPropagation();
sendMsgs();
}, true);
getChat();
}, false);

function getChat() {
var xhr = null;
	if(window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	} else if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
if(xhr) {
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				var value = xhr.responseXML;
				var msgs = value.getElementsByTagName('message');
				console.log("Processing ", msgs.length, " messages");
				var tbl = document.getElementById("messageDisplay");
					for(var i = 0; i < msgs.length; i++) {
						var id = parseInt(msgs[i].getAttribute("id"));
							if(lastid < id) {
								lastid = id;
							}
tbl.innerHTML += "<tr><td>" + msgs[i].childNodes[1].firstChild.nodeValue + "</td></tr>";
}
if(doTimeout) {
setTimeout(getChat, 1000);
}
}
}
};
xhr.open("GET", "http://itsuite.it.brighton.ac.uk/john10/ci227/a1/channel.php?username=guest&lastid=" + lastid, true);
xhr.send(null);
} else {
console.error("Can't continue");
}
}

function sendMsgs() {
var val = document.getElementById("messageInput").value;
// Check val is ok before doing AJAX
var xhr = null;
	if(window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} else if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
			}
if(xhr) {
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
		alert(xhr.responseText);
		}
	}
};
xhr.open("POST", "http://itsuite.it.brighton.ac.uk/john10/ci227/a1/send.php", true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("from=guest&message=" + val);
} else {
console.error("Can't continue");
}
}

function registerUser() {
console.log("Trying to register user, checking details");
var valFirst = document.forms["register"].elements[0].value;
var valSurname = document.forms["register"].elements[1].value;
var valUsername = document.forms["register"].elements[2].value;
var valPassword = document.forms["register"].elements[3].value;
var valConfirmPassword = document.forms["register"].elements[4].value;
	if(valFirst===""){
	console.error("Please enter a first name");
	return;
	}
	if(valSurname===""){
	console.error("Please enter a surname");
	return;
	}
	if(valUsername===""){
	console.error("Please enter a username");
	return;
	}
	if(valPassword===""){
	console.error("Please enter a password");
	return;
	}
	if(valConfirmPassword===""){
	console.error("Please confirm your password");
	return;
	}
	if(valPassword!==valConfirmPassword){
	console.error("Your passwords do not match");
	return;
	}
	console.log("Sending your details");

// Check val is ok before doing AJAX
var xhr = null;
if(window.ActiveXObject) {
xhr = new ActiveXObject("Microsoft.XMLHTTP");
} else if(window.XMLHttpRequest) {
xhr = new XMLHttpRequest();
}
if(xhr) {
xhr.onreadystatechange = function() {
if(xhr.readyState === 4) {
if(xhr.status === 200) {
alert(xhr.responseText);
}
}
};
xhr.open("POST", "http://itsuite.it.brighton.ac.uk/john10/ci227/a1/register.php", false);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("username=" +valUsername + "&password=" + valPassword +"&firstname=" + valFirst +"&surname=" + valSurname);


}else {
console.error("Can't continue");
}
}
/*
function addTable() {
    var html = "<table><tr><td>123</td><td>456</td></tr></table>";
    document.getElementById("addtable").innerHTML = html;
}
*/
