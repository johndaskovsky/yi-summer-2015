var allEntries = [];
var entryID = 0;

var dateTimeNow = new Date();
var currentDateString = dateTimeNow.toISOString();
currentDateString = currentDateString.substring(0, currentDateString.length-8);
$('#inputStart').val(currentDateString);
$('#inputEnd').val(currentDateString);

function Entry(start, end, description, tags)
{
	this.start = new Date(start);
	this.end = new Date(end);
	this.description = description;
	this.tags = tags.split(',');
	
	this.duration = Math.floor( Math.abs(this.end - this.start) / 60000 ); //convert to minutes
	this.id = ++entryID;
}

var addEntry = function() {
	var start = $('#inputStart').val();
	var end = $('#inputEnd').val();
	var description = $('#inputDescription').val();
	var tags = $('#inputTags').val();
	
	var newEntry = new Entry(start, end, description, tags);
	allEntries.push(newEntry);
	
	updateEntries();
}

var removeEntry = function(element) {
	var removeID = $(element).closest('tr').data('entry-id');
   
	allEntries = $.grep(allEntries, function(entry) {
		return entry.id !== removeID;
	});
	
	updateEntries();
}

var updateEntries = function() {
	//If entries are present show table. Otherwise show no entry message.
	if(allEntries.length === 0) {
		$('#noEntryMessage').show();
		$('#entryTable').hide();
	}
	else
	{
		$('#noEntryMessage').hide();
		$('#entryTable').show();
	}
	
	//Empty table rows
	$('#entryRows').empty();
	
	//Rebuild the table from the allEntries array
	$.each(allEntries, function() {
		$('#entryRows').append('<tr data-entry-id="' 
			+ this.id + '"><td>' 
			+ this.start.toISOString() + '</td><td>' 
			+ this.end.toISOString() + '</td><td>' 
			+ this.duration + '</td><td>' 
			+ this.description + '</td><td>' 
			+ this.tags + '</td><td>'
			+ '<button style="float:none;" onclick="removeEntry(this)" type="button" class="close" aria-label="Close"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>&nbsp;'
			+ '<button style="float:none;" onclick="removeEntry(this)" type="button" class="close" aria-label="Close"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>');
	});
}
