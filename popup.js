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
		bibtex.note = `[Online; retrieved ${moment().format( "Do MMMM YYYY" )}]`;

		/*$.ajax( {
			url: "http://apps.johnvidler.co.uk/webbibtex/api/",
			success: function() {
				alert( "Ok" );
			},
			error: function(err) {
				alert( err );
			},
			complete: 
		} );*/
		bibtex_report_results();
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
	if( bibtex.key === "" 
)		bibtex.key = tab.title.split(" ")[0].toLowerCase()

	let bibtexString = `@misc{${bibtex.key.replace(/\s/g,'_').replace(/[^a-zA-Z0-9]/g,'')},\n`;

	for( let key in bibtex ) {
		if( key === 'url' )
			bibtexString += `\thowpublished = \{\\url\{${bibtex[key]}\}\},\n`;
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

	$( "#bibtex_copy" ).click( function() { copyToClipboard( "#bibtex_output" ); } );
});

function list_split( value ) {
	if( value.includes(",") )
		return value.split(",");
	else if( value.includes(" ") )
		return value.split(" ");
	return [ value ];
}

function copyToClipboard(element) {
	var $temp = $("<textarea>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
}

chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "getSource") {
		let domRoot = $($.parseHTML(request.source));

		let metaTags = domRoot.filter( "meta" );

		console.log( metaTags );

		$.each( metaTags, function( tagId ) {
			let key = `${$(metaTags[tagId]).attr("name") || $(metaTags[tagId]).attr("property")}`.toLowerCase();
			let value = `${$(metaTags[tagId]).attr("content") || $(metaTags[tagId]).attr("value")}`.replace(/\n/g,' ');

			value = latex_escape( value );

			console.log( `${key} => ${value}` );

			let tmp = {
				keywords: []
			}

			if( key === "keywords" || key === "keyword" || key == "tags" ) {
				tmp.keywords = tmp.keywords.concat( list_split(value) );
			}
			else if( key === "description" || key === "abstract" )
				bibtex.abstract = value;
			else if( key === "author" || key === "article:author" || key === "blogger_name" )
				bibtex.author = value;
			else if( key === "og:site_name" )
				bibtex.publisher = value;
			else if( key === "published_at" ) {
				let date = moment( value );
				bibtex.year = date.format( "YYYY" );
				bibtex.month = date.format( "MMMM" );
			}
			//else
				//bibtex[key] = value;


			if( tmp.keywords.length > 0 )
				bibtex.keywords = tmp.keywords.join(" ");

		} );

		bibtex_update_output();
	}
});

function onWindowLoad() {
	var message = document.querySelector('#message');

	chrome.tabs.executeScript(null, {
		file: "getPagesSource.js"
	}, function() {
		// If you try and inject into an extensions page or the webstore/NTP you'll get an error
		if (chrome.runtime.lastError) {
			message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
		}
	});
}

window.onload = onWindowLoad;