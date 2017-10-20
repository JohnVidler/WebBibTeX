# WebBibTeX
A Chrome Extension to autogenerate BibTeX entries for web articles

## Installation
Still very 'beta' - but if you want to try it:

1. Download the repository as a zip
2. Unpack the zip to a folder somewhere (doesn't matter where)
3. Navigate to chrome://extensions and turn on 'Developer Mode'
4. Select 'Load Unpacked Extension' and point it at the folder you unpacked the zip to
5. (Optional) Uncheck 'Developer Mode' - otherwise Chrome will complain each time you open it.
6. Done!

## Usage
Press the new button in the Chrome toolbar to pop up the interface, edit keys and title to taste, then use
the copy button to get your BibTeX.

It might get stuff wrong sometimes, and some webpages are hard to parse, so you'll only get minimal output
but it works for a lot of news and reports sites.

Ironically; it doesn't work on my own site! Ha.

## Improvements
I'll probably be toying with this for a bit, but feel free to post pull requests for new additions.

## Output
This page currently (20/10/2017) produces this output:

```
@misc{johnvidlerwebbibtex,
	howpublished = {\url{https://github.com/JohnVidler/WebBibTeX}},
	title = {JohnVidler/WebBibTeX: A Chrome Extension to autogenerate BibTeX entries for web articles},
	note = {[Online; retrieved 20th October 2017]},
	publisher = {GitHub},
	abstract = {WebBibTeX - A Chrome Extension to autogenerate BibTeX entries for web articles}
}
```