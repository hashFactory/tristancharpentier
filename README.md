# tristancharpentier.com

My main github repo for my personal website. You can find it right [here](https://tristancharpentier.com).

### TODO:

* Preprocessor (preprocessor.py)
  - [x] compiles templates into final pages
  - [X] basic argument parsing
  - [ ] add options for specifying source and destination directory
  - [ ] add export functionality to create the ready webpage
    - [ ] need to add directories to `site.map` to specify what to move to output folder
  - [ ] more robust directives for page specifiction (specific js, css, etc...)
  - [ ] beautify output html for indentation & more
  - [ ] add `selected` class to correct `<li>` of nav
  - [ ] pull heavy media from lw839 file server

* Website
  - [X] mobile responsiveness
  - [X] get rid of all hardcoded style from html
  - [X] completely reorganize main.css
  - [ ] segment css into separate files
  - [ ] create pretty spotify playlists page
  - [ ] add personal links to bottom of home page
  - [X] (plz one day) dark mode
  
### Preprocessor
```
usage: preprocess.py [-h] [-v] COMMAND ...

Precompiler for tristancharpentier.com

optional arguments:
  -h, --help     show this help message and exit
  -v, --verbose  print changes

possible commands:
  COMMAND
    clean        deletes compiled files
    dryrun       compiles without writing files
    compile      compiles project
```
