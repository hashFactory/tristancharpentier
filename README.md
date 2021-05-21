# tristancharpentier.com

My main github repo for my personal website. You can find it right [here](https://tristancharpentier.com).

`out/` contains the website once exported.
Look at the bottom of this readme to see how to compile this website.

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
  - [X] only make `export` rmdir if compilation was successful
  - [ ] add `print` command that outputs all the settings it understands
  - [ ] create documentation for all .map files
  - [-] figure out solution for growing /assets size (Update: finish migration to gdrive hosting)
    - [ ] fix lack of gdrive hosting
  - [ ] add instructions to readme on how to compile
  - [ ] integrate music page into main page
  - [ ] add testing

(this section can be seen in action [here](https://tristancharpentier.com/test/exp6))
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

(this section can be seen in action [here](https://tristancharpentier.com/test/projects.html))
* Projects pages
  - [ ] look into separating projects into separate pages
  - [ ] automatically generate low res image previews
  - [ ] setup automated tests for assets
  - [ ] create .map project directive 
  - [ ] add music player project
  - [ ] add lidar, kinect, and projectM
  - [ ] add jvid page
  - [ ] add NST and GPT projects

* Website
  - [X] mobile responsiveness
  - [X] get rid of all hardcoded style from html
  - [X] completely reorganize main.css
  - [ ] segment css into separate files
  - [X] create pretty spotify playlists page
    - [ ] make playlist page update automatically
  - [ ] add personal links to bottom of home page
  - [X] (plz one day) dark mode
  - [X] make website reach bottom of the page
  - [-] add image onClick to make it bigger
  - [X] create projects page
    - [ ] make each project page link to higher res version
  - [ ] create webradio page

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

#### HOW TO
* Add a page
  1. create content page in content/
  2. add required assets and media to appropriate locations
  3. if should be nav-accessible, add entry into nav.html
  4. add directives to site.map