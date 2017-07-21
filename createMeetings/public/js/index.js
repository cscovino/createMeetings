var app = {

	model: {
	},

	modelMeet: {
		'titulo':'',
		'sala':'',
		'fecha':'',
		'tech':{},
		'mat':{},
		'users':[]
	},

	weekday: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],

	monthyear: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],

	firebaseConfig: {
	    apiKey: "AIzaSyC50skbZWPdmbhMgSz9ulM8pBJ8r8F8lag",
	    authDomain: "drinksmenu-ab56b.firebaseapp.com",
	    databaseURL: "https://drinksmenu-ab56b.firebaseio.com",
	    projectId: "drinksmenu-ab56b",
	    storageBucket: "drinksmenu-ab56b.appspot.com",
	    messagingSenderId: "495209622347"
  	},

  	setSnap: function(snap){
  		app.model = snap;
  		app.refreshData();
  		app.loadClients();
  	},

	addUser: function(data){
		var dato = data.id
		var args = dato.split("_");
		$('#invited').attr('value',args[1].split(/(?=[A-Z])/).join(" "));
		$('.ocult').attr('id',args[0].split(/(?=[A-Z])/).join(" "));
	},

	addClient: function(){
		var aux = 0;
		var user = document.getElementById('invited').value;
		var client = document.getElementsByClassName('ocult')[0].id;
		if(user){
			for(var i=0; i<app.modelMeet['users'].length; i++) {
				if(app.modelMeet['users'][i]['Nombre'] === user && app.modelMeet['users'][i]['Cliente'] === client){
					alert('Ya se agregó esta persona a la reunión');
					aux = 1;
					break;
				}
			}
			if (!aux) {
				var car = app.model['clients'][client][user]['Caract'];
				app.modelMeet['users'].push({'Nombre':user,'Cliente':client,'Caract':car});
			}
			app.refreshMeeting();
			app.refreshMeetingModal();
		}
	},

	delMeet: function(){
		document.getElementById('title-meet').value = '';
		document.getElementById('room-meet').value = '';
		document.getElementById('datepicker').value = '';
		document.getElementById('video').checked = false;
		document.getElementById('sound').checked = false;
		document.getElementById('laser').checked = false;
		document.getElementById('brochures').value = 0;
		document.getElementById('brochurep').value = 0;
		document.getElementById('notebook').value = 0;
		document.getElementById('pens').value = 0;
		document.getElementById('magazine').value = 0;
		var users = $('#info-meet-data');
		users.html('');
		var codigo = '';
		codigo += '<label>Invitados para la reunión:</label>';
		codigo += '<div class="input-group">';
			codigo += '<span class="input-group-addon"><img src="img/social.svg" height="20px"></span>';
			codigo += '<input type="text" class="form-control" placeholder="Invitado" style="width: 80%;" data-toggle="modal" data-target="#myModal7" id="invited">';
			codigo += '<span class="ocult" style="display: none;"></span>';
		codigo += '</div><br>';
		users.append(codigo);
		document.getElementById('guardar-button').disabled = true;
		document.getElementById('borrar-button').disabled = true;
		app.modelMeet = {'titulo':'','sala':'','fecha':'','tech':{},'mat':{},'users':[]};
		app.refreshMeetingModal();
	},

	delUser: function(){
		var datos = document.getElementsByClassName('confirm')[0].id;
		var key = datos.split('_')[0].replace('-',' ');
		var key2 = datos.split('_')[1].replace('-',' ');
		var index = -1;
		for(var i=0; i<app.modelMeet['users'].length; i++){
			if (app.modelMeet['users'][i]['Nombre'] === key2 && app.modelMeet['users'][i]['Cliente'] === key) {
				index = i;
				break;
			}
		}
		if (index >= 0) {
			app.modelMeet['users'].splice(index,1);
		}
		app.refreshMeeting();
		app.refreshMeetingModal();
	},

	refreshMeeting: function(){;
		var users = $('#info-meet-data');
		users.html('');
		var codigo = '';
		codigo += '<label>Invitados para la reunión:</label>';
		for(var i=0; i<app.modelMeet['users'].length; i++){
			codigo += '<div class="input-group" style="width:62.5%;">';
				codigo += '<span class="input-group-addon"><img src="img/social.svg" height="20px"></span>';
				codigo += '<input type="text" class="form-control" value="'+app.modelMeet['users'][i]['Nombre']+'" style="width: 80%;" id="" disabled="">';
				codigo += '<span id="ocult" style="display: none;" class='+app.modelMeet['users'][i]['Cliente']+'></span>';
			codigo += '</div><br>';
		}
		if (app.modelMeet['users'].length > 0) {
			document.getElementById('guardar-button').disabled = false;
			document.getElementById('borrar-button').disabled = false;
		}
		codigo += '<div class="input-group" style="width:62.5%;">';
			codigo += '<span class="input-group-addon"><img src="img/social.svg" height="20px"></span>';
			codigo += '<input type="text" class="form-control" placeholder="Invitado" style="width: 80%;" data-toggle="modal" data-target="#myModal7" id="invited">';
			codigo += '<span class="ocult" style="display: none;"></span>';
		codigo += '</div><br>';
		users.append(codigo);	
	},

	idConfirm: function(data){
		document.getElementsByClassName('confirm')[0].id = data.id;	
	},

	confirmeet: function(datakey){
		document.getElementsByClassName('confirmmeet')[0].id = datakey;
	},

	refreshMeetingModal: function(){
		app.modelMeet['titulo'] = document.getElementById('title-meet').value;
		app.modelMeet['sala'] = document.getElementById('room-meet').value;
		app.modelMeet['fecha'] = document.getElementById('datepicker').value;
		app.modelMeet['fecha'] += ' '+document.getElementById('timepicker').value+' - ';
		app.modelMeet['fecha'] += document.getElementById('timepicker2').value;
		app.modelMeet['tech'] = {video:0,sound:0,laser:0,comment:''};
		app.modelMeet['mat'] = {brochures:0,brochurep:0,notebook:0,pens:0,magazine:0};
		if (document.getElementById('video').checked) {
	    	app.modelMeet['tech']['video'] = 1;
	    }
	    if (document.getElementById('sound').checked) {
	    	app.modelMeet['tech']['sound'] = 1;
	    }
	    if (document.getElementById('laser').checked) {
	    	app.modelMeet['tech']['laser'] = 1;
	    }
	    app.modelMeet['mat']['brochures'] = document.getElementById('brochures').value;
	    app.modelMeet['mat']['brochurep'] = document.getElementById('brochurep').value;
	    app.modelMeet['mat']['notebook'] = document.getElementById('notebook').value;
	    app.modelMeet['mat']['pens'] = document.getElementById('pens').value;
	    app.modelMeet['mat']['magazine'] = document.getElementById('magazine').value;
	    app.modelMeet['tech']['comment'] = document.getElementById('otros').value;
		var users = $('#user-body');
		users.html('');
		var codigo = '<div id="" class="confirmmeet">¿Deseas programar esta reunión?</div><br>';
			codigo += '<div>Título: '+app.modelMeet['titulo']+'</div>';
			codigo += '<div>Sala: '+app.modelMeet['sala']+'</div>';
			codigo += '<div>Fecha: '+app.modelMeet['fecha']+'</div>';
			codigo += '<div>Tecnología: </div>';
				if (app.modelMeet['tech']['video']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Beam</div>';
				}
				if (app.modelMeet['tech']['sound']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cornetas</div>';
				}
				if (app.modelMeet['tech']['laser']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apuntador</div>';
				}
				if (app.modelMeet['tech']['comment']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+app.modelMeet['tech']['comment']+'</div>';
				}
			codigo += '<div>Materiales POP:</div>';
				if (app.modelMeet['mat']['brochures'] != 0) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brochure Soutec: '+app.modelMeet['mat']['brochures']+'</div>';
				}
				if (app.modelMeet['mat']['brochurep'] != 0) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brochure Proyecto U: '+app.modelMeet['mat']['brochurep']+'</div>';
				}
				if (app.modelMeet['mat']['notebook'] != 0) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cuadernos Soutec: '+app.modelMeet['mat']['notebook']+'</div>';
				}
				if (app.modelMeet['mat']['pens'] != 0) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bolígrafos: '+app.modelMeet['mat']['pens']+'</div>';
				}
				if (app.modelMeet['mat']['magazine'] != 0) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Revistas: '+app.modelMeet['mat']['magazine']+'</div>';
				}
			codigo += '<div>Invitados:</div>';
			codigo += '<table class="table table-bordered" id="guests">';
				codigo += '<tbody>';
					codigo += '<tr>';
						codigo += '<th>Empresa</th>';
						codigo += '<th>Nombre</th>';
					codigo += '</tr>';
				for (var i=0; i<app.modelMeet['users'].length; i++) {
					codigo += '<tr onclick="app.idConfirm(this)" id="'+app.modelMeet['users'][i]['Cliente'].replace(' ','-')+'_'+app.modelMeet['users'][i]['Nombre'].replace(' ','-')+'" data-toggle="modal" data-target="#myModal3">';
						codigo += '<td>'+app.modelMeet['users'][i]['Cliente']+'</td>';
						codigo += '<td>'+app.modelMeet['users'][i]['Nombre']+'</td>';
					codigo += '</tr>';
				}
				codigo += '</tbody>';
			codigo += '</table>';
		users.append(codigo);
		if (!app.modelMeet['users'][0]) {
			app.delMeet();
		}
	},

	refreshData: function(){
		var users = $('#menu-options');
		var clients = $('#menu-clients');
		users.html('');
		clients.html('');
		var codigo = '';
		var codigo2 = '';
		codigo += '<ul class="nav nav-list">';
		codigo2 += '<ul class="nav nav-list">';
		for(var key in app.model.clients){
			codigo += '<li>';
			codigo2 += '<li>';
				codigo += '<label class="tree-toggle nav-header">'+key+'</label>';
				codigo2 += '<label class="tree-toggle nav-header">'+key+'</label>';
				codigo += '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>';
				codigo2 += '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>';
				codigo += '<ul class="nav nav-list tree">';
				codigo2 += '<ul class="nav nav-list tree">';
				for(var key2 in app.model.clients[key]){
					codigo += '<li id="'+key.replace(/ /g,'')+'_'+key2.replace(/ /g,'')+'" data-dismiss="modal" onclick="app.addUser(this);">&nbsp;&nbsp;&nbsp;<i class="fa fa-circle-o"></i>&nbsp;'+key2+'</li>';
					codigo2 += '<li id="'+key.replace(/ /g,'')+'_'+key2.replace(/ /g,'')+'" data-toggle="modal" data-target="#myModal4" onclick="app.viewUser(this);">&nbsp;&nbsp;&nbsp;<i class="fa fa-circle-o"></i>&nbsp;'+key2+'</li>';
				}
				codigo += '</ul>';
				codigo2 += '</ul>';
			codigo += '</li>';
			codigo2 += '</li>';
		}
		codigo += '</ul>';
		codigo2 += '</ul>';
		users.append(codigo2);
		clients.append(codigo);
		$('.tree-toggle').click(function () {
			$(this).parent().children('ul.tree').toggle(200);
		});
		$('.tree-toggle').parent().children('ul.tree').toggle(200);
	},

    saveName: function(){
    	var client = document.getElementById('name-clients').value;
        var name = document.getElementById('name-client').value;
        var email = document.getElementById('email-client').value;
        var caract = document.getElementById('comment').value;
        var aux = 0;
        for(var key in app.model.clients){
            if (key === client) {
                for(var key2 in app.model.clients[client]){
                	if (key2 === name){
                		alert('Esta persona ya está registrada');
                		aux = 1;
                	}
                }
            }
        }
        if (!aux) {
        	app.saveFirebase(client,name,email,caract);
        }
        document.getElementById('name-clients').value = '';
        document.getElementById('name-client').value = '';
        document.getElementById('email-client').value = '';
        document.getElementById('comment').value = '';
    },

	saveFirebase: function(client,name,email,caract){
		var aux = 0;
		for(var key in app.model.clients){
			if (key === client) {
				firebase.database().ref('clients').child(key).child(name).update({Bebida:[''],Coment:[''],Email:email,Caract:caract});
				aux = 1;
				break;
			}
		}
		if (!aux) {
			firebase.database().ref('clients').child(client).child(name).update({Bebida:[''],Coment:[''],Email:email,Caract:caract});
		}
	},

	sendMeet: function(){
  		var h2 = app.modelMeet['fecha'].split(' ');
  		var tit = app.modelMeet['titulo'];
  		var fec = app.modelMeet['fecha'].split(' ')[0];
		for(var key in app.model.meetings){
  			if (app.model.meetings[key]['titulo']===tit) {
  				if (app.model.meetings[key]['fecha'].split(' ')[0]===fec) {
  					var h1 = app.model.meetings[key]['fecha'].split(' ');
  					var hora1 = h1[1]+' '+h1[2];
  					var hora2 = h2[1]+' '+h2[2];
  					if (hora1 === hora2) {
  						firebase.database().ref('meetings').child(key).remove();
  						break;
  					}
  				}
  			}
  		}
		firebase.database().ref('meetings').push(app.modelMeet);
		alert('Reunión guardada');
		app.delMeet();
	},

	refreshClient: function(dat){
        if (!dat.id) {
            document.getElementById('name-clients').placeholder = "No ha seleccionado el cliente";
        }
        else{
            document.getElementById('name-clients').value = dat.id;
        }
	},

	loadClients: function(opt){
		var users = $('#clients');
		users.html('');
		var codigo = '';
		for (var key in app.model.clients) {
			codigo += '<div class="radio" onclick="app.refreshClient(this);" id="'+key+'" data-dismiss="modal">';
				codigo += '<label>';
					codigo += '<input type="radio" value="'+key+'">&nbsp;&nbsp;';
					codigo += key;
				codigo += '</label>';
			codigo += '</div>';
		}
		codigo += '<br>';
		users.append(codigo);
	},

	add: function(opt){
		var value = document.getElementById(opt).value;
		value++;
		document.getElementById(opt).value = value
	},

	minus: function(opt){
		var value = document.getElementById(opt).value;
		value--;
		if (value < 0) {
			value = 0;
		}
		document.getElementById(opt).value = value
	},

	login: function(){
		var mail = document.getElementById('email').value;
		var pass = document.getElementById('password').value;
		firebase.auth().signInWithEmailAndPassword(mail,pass).catch(function(error){
			console.log(error.code);
			console.log(error.message);
		});
	},

}

$('#datepicker').datepicker({
  autoclose: true
});
$("#timepicker").timepicker({
  showInputs: false
});
$("#timepicker2").timepicker({
  showInputs: false
});

firebase.initializeApp(app.firebaseConfig);
firebase.database().ref().on('value', function(snap){
	if (snap.val() !== null) {
		app.setSnap(snap.val());
	}
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

firebase.auth().onAuthStateChanged(function(user){
	if (user) {
		document.location.href = 'dashboard.html';
		console.log(user.email);
	}
	else{
		console.log('User sign out');
	}
});