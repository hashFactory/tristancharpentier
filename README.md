# tristancharpentier.com

My main github repo for my personal website. You can find it right [here](https://tristancharpentier.com).

### TODO:

* Preprocessor (preprocessor.py)
  - [x] compiles templates into final pages
  - [X] basic argument parsing
  - [X] add options for specifying source and destination directory
  - [X] add export functionality to create the ready webpage
    - [X] need to add directories to `site.map` to specify what to move to output folder
    - [ ] optimize images during export
  - [ ] more robust directives for page specifiction (specific js, css, etc...)
  - [ ] beautify output html for indentation & more
  - [ ] add `selected` class to correct `<li>` of nav
  - [ ] pull heavy media from lw839 file server
  - [ ] create content generators for music and playlists
  - [X] create publish command that's given an scp command and exports website to destination
  - [ ] clean up preprocessor (split into files, classes, etc...)
  - [ ] eventually have a proper settings class
  - [ ] add error handling
  - [ ] color output
  - [ ] only make `export` rmdir if compilation was successful
  - [ ] add `print` command that outputs all the settings it understands
  - [ ] create documentation for all .map files

(this section can be seen in action [here](https://tristancharpentier.com/test/exp2). )
* Playlist pages
  - [X] create custom music player
  - [X] create custom entries for songs
  - [X] make playing animation affect body background
  - [X] parse playlist.json
    - [X] fetch relevant metadata
    - [X] extract album covers
    - [ ] extract dominant colors from covers
    - [X] output all to some tbd js database
  - [ ] integrate to preprocessor

* Website
  - [X] mobile responsiveness
  - [X] get rid of all hardcoded style from html
  - [X] completely reorganize main.css
  - [ ] segment css into separate files
  - [ ] create pretty spotify playlists page
  - [ ] add personal links to bottom of home page
  - [X] (plz one day) dark mode
  - [X] make website reach bottom of the page
  - [ ] add image onClick to make it bigger

### Preprocessor
```
usage: preprocess.py [-h] [-v] [-o OUTPUT] [-m MAP] COMMAND ...

Precompiler for tristancharpentier.com

optional arguments:
  -h, --help            show this help message and exit
  -v, --verbose         print changes
  -o OUTPUT, --output OUTPUT
                        set the output directory for export
  -m MAP, --map MAP     specify site.map generator

possible commands:
  COMMAND
    clean               deletes compiled files
    dryrun              compiles without writing files
    compile             compiles in current dir project
    export              compiles & exports according to site.map
    publish             exports via scp according to publish.map

```
