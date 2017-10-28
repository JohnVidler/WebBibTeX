# WebBibTeX
A Chrome Extension to autogenerate BibTeX entries for web articles.

I don't charge for a bunch of my software. Like what I'm doing? Buy me a coffee! [![paypal](https://www.paypal.com/en_GB/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XX9FV3M96BXEC)

## Demo

The data pulled from websites is retrieved in an entirely dumb way, but seems to get pretty good results from major outlets and sites using common CMS backends. I'm using this myself, so if I find other weird edge cases I'll put the extra retrieval methods in here too.

![An animation showing the WebBibTeX popup working](https://raw.githubusercontent.com/JohnVidler/WebBibTeX/resource/anim/WebBibTeX.gif)

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

ToDo:
 - Add URL autodetection for all fields, so URLs can be escaped automagically
 - Add settings page for variations
   - Quotes vs. Braces
   - Keyword delimiter
 - Keyword de-duplication
 - "Append to library" option, saving to a local file

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

### A BBC News
```
@misc{tech,
	howpublished = {\url{http://www.bbc.co.uk/news/technology-41694991}},
	title = {Tech Tent: Will AI and Blockchain be game-changers? - BBC News},
	note = {[Online; retrieved 21st October 2017]},
	abstract = {On the tech podcast this week, Rory looks at how Google's Deep Mind program continues to improve.},
	publisher = {BBC News},
	author = {https://www.facebook.com/bbcnews}
}
```
(Yeah, for some reason the BBC declare their 'author' to be their facebook page. Weird...)

### Engadget UK
```
@misc{designing,
	howpublished = {\url{https://www.engadget.com/2017/10/20/designing-the-technology-of-blade-runner-2049/}},
	title = {Designing the technology of ‘Blade Runner 2049’},
	note = {[Online; retrieved 21st October 2017]},
	abstract = {This article contains spoilers for 'Blade Runner 2049'   There's a scene in Blade Runner 2049 that takes place in a morgue. K, an android "replicant" played by...},
	author = {Nick Summers},
	publisher = {Engadget},
	year = {2017},
	month = {October},
	keywords = {av bladerunner bladerunner2049 DenisVilleneuve entertainment film interface longread movie sciencefiction specialeffects territorystudios ui vfx}
}
```

### Aeon.co
```
@misc{sugar,
	howpublished = {\url{https://aeon.co/essays/sugar-is-a-toxic-agent-that-creates-conditions-for-disease?ref=}},
	title = {Sugar is a toxic agent that creates conditions for disease | Aeon Essays},
	note = {[Online; retrieved 21st October 2017]},
	publisher = {Aeon},
	abstract = {A potent toxin that alters hormones and metabolism, sugar sets the stage for epidemic levels of obesity and diabetes},
	author = {https://www.facebook.com/AeonMagazine}
}
```
