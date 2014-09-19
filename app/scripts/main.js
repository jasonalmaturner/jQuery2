$(document).ready(function(){

$('#newTaskForm').hide();

var listo = [];

var Task = function(task){
	this.task = task;
	this.id = 'new';
};

var addTask = function(task){
	if(task) {
		task = new Task(task);
		listo.push(task);

		$('#newItemInput').val('');

		$('#newList').append('<a href="#finish" class="" id="item"></li class="list-group-item">' + task.task + '</li></a>');
		save();
	}
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
};

$('#saveNewItem').on('click', function(e){
	e.preventDefault();
	var task = $('#newItemInput').val().trim();
	addTask(task);
});

//Opens form
$('#newListItem').on('click', function(){
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
});
//Closes form
$('#cancel').on('click', function(e){
	e.preventDefault();
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
});

$(document).on('click', '#item', function(e){
	e.preventDefault();
	var task = this;
	advanceTask(task);
	this.id = 'inProgress';
	$('#currentList').append(this.outerHTML);
});

$(document).on('click', '#inProgress', function(e){
	e.preventDefault();
	var task = this;
	task.id = "archived";
	// var changeIcon = task.outerHTML; don't need
	advanceTask(task);
	$('#archivedList').append(task.outerHTML);
});

$(document).on('click', '#archived', function(e){
	e.preventDefault();
	var task = this;
	advanceTask(task);
});

var advanceTask = function(task){
	var modified = task.innerText.trim();
	for(var i = 0; i <listo.length; i++){
		if(listo[i].task === modified){
			if(listo[i].id === 'new'){
				listo[i].id = 'inProgress';
			} else if(listo[i].id === 'inProgress'){
				listo[i].id = 'archived';
			} else{
				listo.splice(i, 1);
			}
			save();
			break;
			}
		}
		task.remove();
	};

var save = function(){
/*	var listoConverted = JSON.stringify(listo);
	localStorage.setItem('listo', listoConverted); This is the way I wrote it. Too wordy. I simplified it like Jakes*/
	localStorage['listo'] = JSON.stringify(listo);
};

if (localStorage.getItem('listo')){
	listo = JSON.parse(localStorage['listo']);
	populateListo();
}

function populateListo(){
	for (var i = 0; i < listo.length; i++){
		if (listo[i].id === 'new'){
			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + listo[i].task + '</li></a>');
		} else if (listo[i].id === 'inProgress'){
			$('#currentList').append('<a href="#finish" class="" id="inProgress"><li class="list-group-item">' + listo[i].task + '</li></a>');
		} else {
			$('#archivedList').append('<a href="#finish" class="" id="archived"><li class="list-group-item">' + listo[i].task + '</li></a>');
		}
	}
};

});