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
        apiKey: "AIzaSyCkQaGeVx7aqj0Gt2C15i8BdzSup3yNQuM",
        authDomain: "reuniones-46a77.firebaseapp.com",
        databaseURL: "https://reuniones-46a77.firebaseio.com",
        projectId: "reuniones-46a77",
        storageBucket: "reuniones-46a77.appspot.com",
        messagingSenderId: "888234651975"
  	},

  	setSnap: function(snap){
  		app.model = snap;
  		app.refreshData();
  		app.loadClients();
  		app.refreshMeets();
  		app.refreshOrders();

  		var date = new Date();
		var d = date.getDate(),
		    m = date.getMonth(),
		    y = date.getFullYear();
		$('#calendar').fullCalendar({
		  header: {
		    left: 'prev,next today',
		    center: 'title',
		    right: 'month,agendaWeek,agendaDay'
		  },
		  buttonText: {
		    today: 'today',
		    month: 'month',
		    week: 'week',
		    day: 'day'
		  },
          minTime: '8:00:00',
          //maxTime: '18:00:00',
		  allDaySlot: false,
		  editable: false,
		  draggable: false,
		  eventClick: function(calEvent,jsEvent,view){
				//var defaultDuration = moment.duration($('#calendar').fullCalendar('option', 'defaultTimedEventDuration'));
				//var end = calEvent.end || calEvent.start.clone().add(defaultDuration);
				app.editMeet(calEvent);
			},
		});

		app.refreshCalendar();
  	},

  	preLoad: function(){
  		var titulo = document.getElementById('title-meet1').value;
  		var sala = document.getElementById('room-meet1').value;
		var fecha = document.getElementById('datepicker2').value;
		fecha += ' '+document.getElementById('timepicker3').value+' - ';
		fecha += document.getElementById('timepicker4').value;
		firebase.database().ref('temp').update({titulo:titulo,sala:sala,fecha:fecha});
		 $('#myModal19').modal('hide');
  	},

  	editMeet: function(calEvent){
  		document.getElementById('title-meet').value = calEvent.title.split('-')[1].substring(1);
  		for(var key in app.model.meetings){
  			if(app.model.meetings[key]['titulo'] === calEvent.title.split('-')[1].substring(1)){
  				document.getElementById('room-meet').value = app.model.meetings[key]['sala'];
	  			if(app.model.meetings[key]['tech']['video']){
	  				document.getElementById('video').checked = true;
	  			}
	  			else{
	  				document.getElementById('video').checked = false;
	  			}
	  			if(app.model.meetings[key]['tech']['sound']){
	  				document.getElementById('sound').checked = true;
	  			}
	  			else{
	  				document.getElementById('sound').checked = false;
	  			}
	  			if(app.model.meetings[key]['tech']['laser']){
	  				document.getElementById('laser').checked = true;
	  			}
	  			else{
	  				document.getElementById('laser').checked = false;
	  			}
	  			if(app.model.meetings[key]['tech']['vc']){
	  				document.getElementById('vc').checked = true;
	  			}
	  			else{
	  				document.getElementById('vc').checked = false;
	  			}
	  			if(app.model.meetings[key]['tipo'] === 'regular'){
	  				document.getElementById('regmeet').checked = true;
	  			}
	  			else{
	  				document.getElementById('vipmeet').checked = true;
	  			}
	  			if(app.model.meetings[key]['food']['food'] != 'No'){
	  				document.getElementById('detalles').style.display = 'block';
	  				document.getElementById('sifood').checked = true;
	  				document.getElementById('comida').value = app.model.meetings[key]['food']['food'];
	  			}
	  			else{
	  				document.getElementById('detalles').style.display = 'none';
	  				document.getElementById('nofood').checked = true;
	  			}
  				document.getElementById('brochures').value = app.model.meetings[key]['mat']['brochures'];
  				document.getElementById('brochurep').value = app.model.meetings[key]['mat']['brochurep'];
  				document.getElementById('notebook').value = app.model.meetings[key]['mat']['notebook'];
  				document.getElementById('pens').value = app.model.meetings[key]['mat']['pens'];
  				document.getElementById('magazine').value = app.model.meetings[key]['mat']['magazine'];
	  			document.getElementById('otros').value = app.model.meetings[key]['tech']['comment'];
  			}
  		}
  		var fecha = calEvent.start['_d'].toDateString().split(' ');
  		var test = calEvent.start['_d'].toString().split(' ')[4].split(':');
  		console.log(calEvent.end);
  		var fechafin = calEvent.end['_d'].toDateString().split(' ');
  		var testfin = calEvent.end['_d'].toString().split(' ')[4].split(':');
  		var amopm = 'AM';
  		var amopm2 = 'AM';
  		var hora,hora3,hora4;
  		var tim = testfin[0];
  		if (test[0] > 12) {
  			var aux = test[0]-12;
  			hora4 = aux+':'+test[1];
  			if (aux < 10) {
  				aux = '0'+aux;
  			}
  			hora = aux+':'+test[1];
  			amopm = 'PM';
  		}
  		else{
  			hora = test[0]+':'+test[1];
  			hora4 = hora;
  		}
  		if (tim > 12) {
  			var aux = tim-12;
  			if (aux < 10) {
  				aux = '0'+aux;
  			}
  			hora3 = aux+':'+testfin[1];
  			amopm2 = 'PM';
  		}
  		else{
  			hora3 = tim+':'+testfin[1];
  		}
  		switch(fecha[1]){
		  case 'Jan':
		  	m = '01';
		    break;
		  case 'Feb':
		  	m = '02';
		    break;
		  case 'Mar':
		  	m = '03';       
		    break;
		  case 'Apr':
		    m = '04';
		    break;
		  case 'May':
		  	m = '05';
		    break;
		  case 'Jun':
		  	m = '06';
		    break;
		  case 'Jul':
		  	m = '07';       
		    break;
		  case 'Aug':
		  	m = '08';
		    break;
		  case 'Sep':
		  	m = '09';
		    break;
		  case 'Oct':
		  	m = '10';
		    break;
		  case 'Nov':
		  	m = '11';       
		    break;
		  case 'Dec':
		  	m = '12';
		    break;  
		}
  		var d = fecha[2];
  		var upd = m+'-'+d+'-'+fecha[3];
  		$('#datepicker').datepicker('update', upd);
  		$('#timepicker').timepicker('setTime', hora+' '+amopm);
  		$('#timepicker2').timepicker('setTime', hora3+' '+amopm2);
  		upd = upd.replace(/-/g,'/');
  		for(var key in app.model.meetings){
  			if (app.model.meetings[key]['titulo']===calEvent.title.split('-')[1].substring(1)) {
  				if (app.model.meetings[key]['fecha'].split(' ')[0] === upd) {
  					var h1 = app.model.meetings[key]['fecha'].split(' ');
  					var hora1 = h1[1]+' '+h1[2];
  					var hora2 = hora+' '+amopm;
  					if (hora1 === hora2) {
  						app.modelMeet = jQuery.extend(true,{},app.model.meetings[key]);
  						app.refreshMeeting();
  						break;
  					}
  				}
  			}
  		}
  	},

	addUser: function(data){
		var dato = data.id
		var args = dato.split("_");
		$('#invited').attr('value',args[1].split(/(?=[A-Z])/).join(" "));
		$('.ocult').attr('id',args[0].split(/(?=[A-Z])/).join(" "));
		app.addClient();
	},

	addClient: function(){
		var aux = 0;
		var type;
		var user = document.getElementById('invited').value;
		var client = document.getElementsByClassName('ocult')[0].id;
		opts = document.getElementsByClassName('options');
		for(var i=0; i<opts.length; i++){
			if (opts[i].checked) {
				type = opts[i].id;
			}
		}
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
				app.modelMeet['users'].push({'Nombre':user,'Cliente':client,'Caract':car,'Tipo':type});
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
		document.getElementById('vc').checked = false;
		document.getElementById('sifood').checked = false;
		document.getElementById('nofood').checked = false;
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

	viewUser: function(data){
		var users = $('#mydata');
		var client = data.id.split('_')[0].split(/(?=[A-Z])/).join(" ");
		var user = data.id.split('_')[1].split(/(?=[A-Z])/).join(" "); 
		users.html('');
		var codigo = '<table class="table table-bordered" id="guests2">';
				codigo += '<tbody>';
					codigo += '<tr>';
						codigo += '<th>Bebidas</th>';
						codigo += '<th>Comentarios</th>';
					codigo += '</tr>';
				for (var key in app.model.clients) {
					if (client === key) {
						for(var key2 in app.model.clients[key]){
							if (user === key2) {
								document.getElementById('myModalLabel4').innerHTML = 'Histórico de '+user;
								for(var i=0; i<app.model.clients[key][key2]['Bebida'].length; i++){
									codigo += '<tr>';
										codigo += '<td>'+app.model.clients[key][key2]['Bebida'][i]+'</td>'
										codigo += '<td>'+app.model.clients[key][key2]['Coment'][i]+'</td>';
									codigo += '</tr>';
								}
								break;	
							}
	                	}
                	}
				}
				codigo += '</tbody>';
			codigo += '</table>';
		users.append(codigo);
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
		app.modelMeet['users'].splice(index,1);
		app.refreshMeeting();
		app.refreshMeetingModal();
	},

	delMeeting: function(){
		var datos = document.getElementsByClassName('confirmmeet')[0].id;
		firebase.database().ref('meetings').child(datos).remove();
		app.refreshMeets();
	},

	refreshMeeting: function(){;
		var users = $('#info-meet-data');
		users.html('');
		var codigo = '';
		codigo += '<label>Invitados para la reunión:</label>';
		for(var i=0; i<app.modelMeet['users'].length; i++){
			codigo += '<div class="input-group">';
				codigo += '<span class="input-group-addon"><img src="img/social.svg" height="20px"></span>';
				if (app.modelMeet['users'][i]['Caract'] != '') {
					codigo += '<input type="text" class="form-control" value="'+app.modelMeet['users'][i]['Nombre']+' ('+app.modelMeet['users'][i]['Caract']+')" style="width: 80%;" id="" disabled="">';
				}
				else{

					codigo += '<input type="text" class="form-control" value="'+app.modelMeet['users'][i]['Nombre']+'" style="width: 80%;" id="" disabled="">';
				}
				codigo += '<span id="ocult" style="display: none;" class='+app.modelMeet['users'][i]['Cliente']+'></span>';
			codigo += '</div><br>';
		}
		if (app.modelMeet['users'].length > 0) {
			document.getElementById('guardar-button').disabled = false;
			document.getElementById('borrar-button').disabled = false;
		}
		codigo += '<div class="input-group">';
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
		app.modelMeet['tech'] = {video:0,sound:0,laser:0,vc:0,comment:''};
		app.modelMeet['mat'] = {brochures:0,brochurep:0,notebook:0,pens:0,magazine:0};
		app.modelMeet['food'] = {food:'No'};
		if (document.getElementById('video').checked) {
	    	app.modelMeet['tech']['video'] = 1;
	    }
	    if (document.getElementById('sound').checked) {
	    	app.modelMeet['tech']['sound'] = 1;
	    }
	    if (document.getElementById('laser').checked) {
	    	app.modelMeet['tech']['laser'] = 1;
	    }
	    if (document.getElementById('vc').checked) {
	    	app.modelMeet['tech']['vc'] = 1;
	    }
	    if (document.getElementById('vipmeet').checked) {
	    	app.modelMeet['tipo'] = 'vip';
	    }
	    if (document.getElementById('regmeet').checked) {
	    	app.modelMeet['tipo'] = 'regular';
	    }
	    if (document.getElementById('sifood').checked) {
	    	app.modelMeet['food']['food'] = document.getElementById('comida').value;
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
			codigo += '<div>Tipo: ';
			if (app.modelMeet['tipo'] === 'vip') {
				codigo += 'V.I.P.</div>';
			}
			if (app.modelMeet['tipo'] === 'regular') {
				codigo += 'Regular</div>';
			}
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
				if (app.modelMeet['tech']['vc']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Equipos de video conferencia</div>';
				}
				if (app.modelMeet['tech']['comment']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+app.modelMeet['tech']['comment']+'</div>';
				}
			codigo += '<div>Materiales POP:</div>';
				if (app.modelMeet['mat']['brochures']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brochure Soutec: '+app.modelMeet['mat']['brochures']+'</div>';
				}
				if (app.modelMeet['mat']['brochurep']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brochure Proyecto U: '+app.modelMeet['mat']['brochurep']+'</div>';
				}
				if (app.modelMeet['mat']['notebook']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cuadernos Soutec: '+app.modelMeet['mat']['notebook']+'</div>';
				}
				if (app.modelMeet['mat']['pens']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bolígrafos: '+app.modelMeet['mat']['pens']+'</div>';
				}
				if (app.modelMeet['mat']['magazine']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Revistas: '+app.modelMeet['mat']['magazine']+'</div>';
				}
			if (app.modelMeet['food']['food'] != 'No') {
				codigo += '<div>Sí requiere comida.</div>';
				codigo += '<div>Detalles de interés:</div>';
				codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+app.modelMeet['food']['food']+'</div>';
			}
			else{
				codigo += '<div>No requiere comida.</div>';
			}
			codigo += '<div>Invitados:</div>';
			codigo += '<table class="table table-bordered" id="guests">';
				codigo += '<tbody>';
					codigo += '<tr>';
						codigo += '<th>Empresa</th>';
						codigo += '<th>Nombre</th>';
						codigo += '<th>Eliminar</th>';
					codigo += '</tr>';
				for (var i=0; i<app.modelMeet['users'].length; i++) {
					codigo += '<tr>';
						codigo += '<td>'+app.modelMeet['users'][i]['Cliente']+'</td>';
						codigo += '<td>'+app.modelMeet['users'][i]['Nombre']+'</td>';
						codigo += '<td><i class="fa fa-trash" onclick="app.idConfirm(this)" id="'+app.modelMeet['users'][i]['Cliente'].replace(' ','-')+'_'+app.modelMeet['users'][i]['Nombre'].replace(' ','-')+'" style="margin-left:40%;" data-toggle="modal" data-target="#myModal3"></i></td>';
					codigo += '</tr>';
				}
				codigo += '</tbody>';
			codigo += '</table>';
		users.append(codigo);
		if (!app.modelMeet['users'][0]) {
			app.delMeet();
		}
	},

	refreshMeets: function(){
		var users = $('#mymeets');
		var today = new Date();
		users.html('');
		var codigo = '';
		var codigo = '<table class="table table-bordered" id="guests3">';
				codigo += '<tbody>';
					codigo += '<tr>';
						codigo += '<th>Fecha</th>';
						codigo += '<th>Hora</th>';
						codigo += '<th>Título</th>';
						codigo += '<th>Eliminar</th>';
					codigo += '</tr>';
				for (var key in app.model.meetings) {
					codigo += '<tr>';
						var dd = app.model.meetings[key]['fecha'].split(' ');
						var datee = dd[0].split('/');
						var dait = new Date(datee[2],datee[0]-1,datee[1]);
						var today = new Date();
						if (dait.toDateString() === today.toDateString()) {
							codigo += '<td>Hoy</td>';
						}
						else{
							codigo += '<td>'+app.weekday[dait.getDay()]+' '+dait.getDate()+' '+app.monthyear[dait.getMonth()]+'</td>';
						}
						codigo += '<td>'+dd[1]+' '+dd[2]+' - '+dd[4]+' '+dd[5]+'</td>';
						codigo += '<td>'+app.model.meetings[key]['titulo']+'</td>';
						codigo += '<td><i class="fa fa-trash" onclick="app.confirmeet('+"'"+key+"'"+');" style="margin-left:40%;" data-target="#myModal6" data-toggle="modal"></i></td>';
					codigo += '</tr>';
				}
				codigo += '</tbody>';
			codigo += '</table>';
		users.append(codigo);
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
        	app.saveFirebase(client,name,email);
        }
        document.getElementById('name-clients').value = '';
        document.getElementById('name-client').value = '';
        document.getElementById('email-client').value = '';
        var dato = client.replace(' ','')+'_'+name.replace(' ','');
		var args = dato.split("_");
		$('#invited').attr('value',args[1].split(/(?=[A-Z])/).join(" "));
		$('.ocult').attr('id',args[0].split(/(?=[A-Z])/).join(" "));
		app.addClient();
    },

	saveFirebase: function(client,name,email){
		var aux = 0;
		for(var key in app.model.clients){
			if (key === client) {
				firebase.database().ref('clients').child(key).child(name).update({Bebida:[''],Coment:[''],Email:email});
				aux = 1;
				break;
			}
		}
		if (!aux) {
			firebase.database().ref('clients').child(client).child(name).update({Bebida:[''],Coment:[''],Email:email});
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
		var color = 0;
		var codigo = '<div>Título: '+app.modelMeet['titulo']+'</div>';
			codigo += '<div>Tipo: ';
			if (app.modelMeet['tipo'] === 'vip') {
				codigo += 'V.I.P.</div>';
			}
			if (app.modelMeet['tipo'] === 'regular') {
				codigo += 'Regular</div>';
			}
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
				if (app.modelMeet['tech']['vc']) {
					codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Equipos de video conferencia</div>';
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
			if (app.modelMeet['food']['food'] != 'No') {
				codigo += '<div>Sí requiere comida.</div>';
				codigo += '<div>Detalles de interés:</div>';
				codigo += '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+app.modelMeet['food']['food']+'</div>';
			}
			else{
				codigo += '<div>No requiere comida.</div>';
			}
			codigo += '<div>Invitados:</div>';
			codigo += '<table style="color:#383838;">';
				codigo += '<tbody>';
					codigo += '<tr>';
						codigo += '<th style="background:#395062;color:#fff;">Empresa</th>';
						codigo += '<th style="background:#395062;color:#fff;">Nombre</th>';
					codigo += '</tr>';
				for (var i=0; i<app.modelMeet['users'].length; i++) {
					if (color) {
					codigo += '<tr style="background:#eaeaea;">';
						color = 0;	
					}
					else{
					codigo += '<tr>';
						color = 1;
					}
						codigo += '<td>'+app.modelMeet['users'][i]['Cliente']+'</td>';
						codigo += '<td>'+app.modelMeet['users'][i]['Nombre']+'</td>';
					codigo += '</tr>';
				}
				codigo += '</tbody>';
			codigo += '</table>';
		emailjs.send("gmail","meetings",{message_html: codigo});
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

	refreshCalendar: function(){
		$('#calendar').fullCalendar('removeEvents');
		for(var key in app.model.meetings){
			var dateVar = app.model.meetings[key]['fecha'].split(' ');
			var yearVar = dateVar[0].split("/")[2];
			var monthVar = dateVar[0].split("/")[0];
			var dayVar = dateVar[0].split("/")[1];
			var hVar = dateVar[1].split(':')[0];
			if (dateVar[2] === 'PM') {
				hVar = +hVar + 12;
				if (hVar === 24) {
					hVar = 00;
				}
			}
			var mVar = dateVar[1].split(':')[1];
			var hVarE = dateVar[4].split(':')[0];
			if (dateVar[5] === 'PM') {
				hVarE = +hVarE + 12;
				if (hVarE === 24) {
					hVarE = 12;
				}
			}
			else if (hVarE === 12) {
				hVarE = '00';
			}
			var mVarE = dateVar[4].split(':')[1];
			var ttE = app.model.meetings[key]['sala']+' - '+app.model.meetings[key]['titulo'];
			var eventsE = {
				title: ttE,
				start: new Date(yearVar,monthVar-1,dayVar,hVar,mVar),
				end: new Date(yearVar,monthVar-1,dayVar,hVarE,mVarE),
				allDay: false,
				backgroundColor: "#0073b7",
				borderColor :"#0073b7",
			};

			$('#calendar').fullCalendar('renderEvent', eventsE, 'stick');
			eventsE = '';
		}
		$('#calendar').fullCalendar({

		});
	},

    refreshOrders: function(){
    	try{
    		if (app.model['order']['orders'].length > 0) {
	            var users = $('#orders');
	            users.html('');
	            var codigo = '<table class="table table-bordered" id="guests4">';
	            codigo += '<tbody>';
	                codigo += '<tr>';
	                    codigo += '<th>Nombre</th>';
	                    codigo += '<th>Bebida</th>';
	                    codigo += '<th>Comentario</th>';
	                    codigo += '<th>Sala</th>';
	                    codigo += '<th>Pedido</th>';
	                codigo += '</tr>';
	            for (var i=0; i<app.model['order']['orders'].length; i++) {
	                for(var key in app.model['order']['orders'][i]){
	                    if (app.model['order']['orders'][i][key]['entregado'] === 1) {
	                        codigo += '<tr id="'+key.replace(' ','-')+'_'+app.model['order']['orders'][i][key]['Bebida'].replace(' ','-')+'" onclick="app.confirmDelivered(this);" style="text-decoration:line-through;color:#ccc;">';
	                    }
	                    else{
	                        codigo += '<tr id="'+key.replace(' ','-')+'_'+app.model['order']['orders'][i][key]['Bebida'].replace(' ','-')+'" onclick="app.confirmDelivered(this);">';
	                    }
	                        var id = app.model['order']['orders'][i][key]['meetId'];
	                        codigo += '<td>'+key+'</td>';
	                        codigo += '<td>'+app.model['order']['orders'][i][key]['Bebida']+'</td>';
	                        codigo += '<td>'+app.model['order']['orders'][i][key]['Coment']+'</td>';
	                        codigo += '<td>'+app.model['meetings'][id]['sala']+'</td>'
	                    if (app.model['order']['orders'][i][key]['entregado'] === 1) {
	                    	var h = app.model['order']['orders'][i][key]['hora'].split(':')[0];
	                    	var m = app.model['order']['orders'][i][key]['hora'].split(':')[1];
	                    	var he = app.model['order']['orders'][i][key]['horae'].split(':')[0];
	                    	var me = app.model['order']['orders'][i][key]['horae'].split(':')[1];
	                    	var mrest,hrest;
	                    	mrest = me - m;
	                    	if (mrest < 0) {
	                    		mrest = 60 + mrest;
	                    		h = +h + 1;
	                    	}
	                    	hrest = (he - h)*60;
	                    	mrest = mrest + hrest;
	                        codigo += '<td>Entregado en '+mrest+' min</td>';
	                    }
	                    else{
	                    	var fechaAct = new Date();
	                    	var hact = fechaAct.getHours();
	                    	var mact = fechaAct.getMinutes();
	                    	var h = app.model['order']['orders'][i][key]['hora'].split(':')[0];
	                    	var m = app.model['order']['orders'][i][key]['hora'].split(':')[1];
	                    	var mrest,hrest;
	                    	mrest = mact - m;
	                    	if (mrest < 0) {
	                    		mrest = 60 + mrest;
	                    		h =  +h + 1;
	                    	}
	                    	hrest = (hact - h)*60;
	                    	mrest = mrest + hrest;
	                        codigo += '<td>Hace '+mrest+' min</td>';
	                    }
	                    codigo += '</tr>';
	                }
	            }
	                codigo += '</tbody>';
	            codigo += '</table>';
	            users.append(codigo);
	        }
    	}
    	catch(err){}
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

    logout: function(){
    	firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
		});
    },
}

firebase.initializeApp(app.firebaseConfig);
firebase.database().ref().on('value', function(snap){
	if (snap.val() !== null) {
		app.setSnap(snap.val());
	}
});

firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    document.location.href = 'index.html'; //If User is not logged in, redirect to login page
  }
});

$('#datepicker').datepicker({
  autoclose: true
});
$('#datepicker2').datepicker({
  autoclose: true
});
$("#timepicker").timepicker({
  showInputs: false
});
$("#timepicker2").timepicker({
  showInputs: false
});
$("#timepicker3").timepicker({
  showInputs: false
});
$("#timepicker4").timepicker({
  showInputs: false
});

if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	document.getElementById('timepicker2').style.width = '40%';
	document.getElementById('timepicker4').style.width = '38.5%';
	document.getElementById('guardar-button').style.marginLeft = '2px';
}

setInterval(function(){app.refreshOrders();},59999);