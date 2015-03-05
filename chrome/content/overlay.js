function startup() {
	var button = document.getElementById("my-button");
	button.addEventListener("click", showUser);
}

window.addEventListener("load", function(e) { 
	startup(); 
}, false);

function showUser(){
	var lm = Components.classes["@mozilla.org/login-manager;1"].getService( 
		Components.interfaces.nsILoginManager
	);
	var username = "";
	var password = "";
	var hostname = 'chrome://firefoo';
	var formSubmitURL = null;
	var httprealm = 'UserRegistration';
	
	try { 
		//Recherche selon les critères
		var logins = lm.findLogins({}, hostname, formSubmitURL, httprealm);
		//Recherche en fonction du tableau renvoyé
		for (var i = 0; i < logins.length; i++) {
			if (logins[i].username) {
				password = logins[i].password;
				username = logins[i].username;
				break;
			}
		}
	}
	//Si il ne trouve rien
	catch(ex) {
		password = "";
		username = "";
	}
	
	window.alert("Hello " + username + " ! Your password is " + password + ".");
	
		
	for (var i = 0; i < 20; i++) {
		name = pref.getCharPref("mail.identity.id" + i + ".useremail");
		window.alert(name);
		if(name){
			window.alert(name);
		} else {
			break;
		}
	}
}