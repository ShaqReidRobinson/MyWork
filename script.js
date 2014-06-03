$(document).ready(function() {
$("#logInBtn").click(function(){
		$("#chatSection").slideToggle("slow",function() {
		});
	});
});

var doTimeout = true;
var lastid = 0;

window.addEventListener("load", function() {
/*
	var btn = document.getElementById("startBtn");
	btn.addEventListener("click", function() {
		doTimeout = true;
		getChat();
	}, true);
	
	var sbtn = document.getElementById("stopBtn");
	sbtn.addEventListener("click", function() {
		doTimeout = false;
	}, true);
	*/
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
	/*			
	function addTable() {
    var html = "<table><tr><td>123</td><td>456</td></tr></table>";
    document.getElementById("addtable").innerHTML = html;
	*/
