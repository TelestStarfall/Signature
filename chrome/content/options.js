//Invocation des préférences
var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

//Invocation de LoginManager
var lm = Components.classes["@mozilla.org/login-manager;1"].getService( 
	Components.interfaces.nsILoginManager
);
//constructeur
var nsLoginInfo = new Components.Constructor(
	"@mozilla.org/login-manager/loginInfo;1",
	Components.interfaces.nsILoginInfo,
	"init"
);
//variables serveur
var hostname = 'chrome://firefoo';
var formSubmitURL = null;
var httprealm = 'UserRegistration';
var username = "";
var password = "";

//Au chargement
function onLoad(){
	let passwd = document.getElementById("passwd");
	let login = document.getElementById("login");
	
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
	
	passwd.value = password;
	login.value = username;
}

//A la validation du formulaire 
function onDialogAccept(){

	var login = document.getElementById("login").value;
 	var passwd = document.getElementById("passwd").value;

	if(login == username){
		var oldextLoginInfo = new nsLoginInfo(
			hostname,
			null,
			httprealm,
			login,
			password,
			"",
			""
		);
		
		var newextLoginInfo = new nsLoginInfo(
			hostname,
			null,
			httprealm,
			login,
			passwd,
			"",
			""
		);
		lm.modifyLogin(oldextLoginInfo, newextLoginInfo);
	} else {
		var extLoginInfo = new nsLoginInfo(
			hostname,
			null,
			httprealm,
			login,
			passwd,
			"",
			""
		);
		lm.addLogin(extLoginInfo);
	}
}

//En cliquant sur le bouton cancel
function onDialogCancel(){
	//Rien ne se passe, la fenêtre se ferme
}