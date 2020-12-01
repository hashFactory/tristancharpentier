# tristancharpentier.com

My main github repo for my personal website. You can find it right [here](https://tristancharpentier.com).

### TODO:

* Preprocessor (preprocessor.py)
  - [x] compiles templates into final pages
  - [X] basic argument parsing
  - [ ] add options for specifying source and destination directory
  - [ ] more robust directives for page specifiction (specific js, css, etc...)
  - [ ] beautify output html for indentation & more
  - [ ] add `selected` class to correct `<li>` of nav

* Website
  - [ ] mobile responsiveness
  - [ ] get rid of all hardcoded style from html
  - [ ] completely reorganize main.css
  - [ ] segment css into separate files
  - [ ] create pretty spotify playlists page
  - [ ] add personal links to bottom of home page
  - [ ] (plz one day) dark mode
  
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
