# tristancharpentier

TODO:

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
  
## Preprocessor
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
