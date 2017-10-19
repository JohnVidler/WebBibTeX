const OUTPUT_UPDATE_DELAY = 300;

let bibtex = {}

function bibtex_search() {
	chrome.tabs.getSelected(null, function(tab) {
		$( "#bibtex_loading" ).show();
		$( "#bibtex_details" ).hide();

		$( "#bibtex_url" ).val( tab.url );
		$( "#bibtex_title" ).val( tab.title );

		bibtex.url   = tab.url;
		bibtex.key   = tab.title.split(" ")[0].toLowerCase();
		bibtex.title = tab.title;

		setTimeout( bibtex_report_results, 2000 );
	});
}

function bibtex_report_results() {
	$( "#bibtex_loading" ).hide();
	$( "#bibtex_details" ).show();

	bibtex_update_output();
}

var pendingUpdate = null;
function bibtex_update_output() {
	if( pendingUpdate !== null )
		clearTimeout( pendingUpdate );
	pendingUpdate = setTimeout( bibtex_render_output, OUTPUT_UPDATE_DELAY );
}

function bibtex_render_output() {
	if( bibtex.key === "" )
		bibtex.key = tab.title.split(" ")[0].toLowerCase()

	let bibtexString = `@misc{ ${bibtex.key.replace(/\s/g,'_').replace(/[^a-zA-Z0-9]/g,'')},\n`;

	for( let key in bibtex ) {
		if( key === 'url' )
			bibtexString += `\t${key} = \{\\url\{${bibtex[key]}\}\},\n`;
		else if( key !== 'key' )
			bibtexString += `\t${key} = \"${bibtex[key]}\",\n`;
	}
	bibtexString = bibtexString.substring(0, bibtexString.length-2);
	bibtexString += '\n}';

	let lines = (bibtexString.match(/\n/g) || []).length;

	$( "#bibtex_output" ).html( bibtexString );
	pendingUpdate = null;
}

document.addEventListener('DOMContentLoaded', function () {
	bibtex_search();

	$( "#bibtex_key" ).keyup( function() {
		bibtex.key = $( "#bibtex_key" ).val();
		bibtex_update_output();
	} );

	$( "#bibtex_title" ).keyup( function() {
		bibtex.title = $( "#bibtex_title" ).val();
		bibtex_update_output();
	} );
});