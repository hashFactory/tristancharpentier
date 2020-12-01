#!/usr/bin/python3

import os
import json
import sys
import argparse

# defines all the metadata a page needs
class FuturePage():
    def __init__(self):
        self.name = ""
        self.type = ""
        self.filename = ""
        self.title = ""
        self.nav = ""
        self.header = ""
        self.article = ""
        self.template = ""

    def __str__(self):
        return self.name + " " + self.file

# defines what macros are available to a page
class Macro():
    def __init__(self):
        self.name = "NO_NAME"
        self.tag = "NO_TAG"
        self.filename = "NO_FILE"

    def __init__(self, name, tag, filename):
        self.name = name
        self.tag = tag
        self.filename = filename
    
    def __str__(self):
        return self.name + " " + self.tag + " " + self.file

# fetch the default template page
def get_page(template):
    with open("templates/page.html", 'r') as page_template:
        #return [l.rstrip() for l in page_template.readlines()]
        contents = page_template.read()
        page_template.close()
        return contents

# generates 
def generate_pages(future, macros):
    for fu in future:
        template = get_page("")
        with open(content_dir + fu.filename, 'r') as content:
            with open(fu.filename, 'w') as future_page:
                for m in range(0, 3):
                    print(macros[m].name)
                    template = template.replace(macros[m].name, open("templates/" + macros[m].filename, 'r').read())
                template = template.replace("<|ARTICLE|>", content.read())
                future_page.write(template)
                print(template)
                future_page.close()
            content.close()

# read the pages json into an object
def read_pages_map(filename, macros):
    # read in json file
    with open(filename, 'r') as f:
        pages = json.load(f)['pages']
    future = []

    # read in json into smarter objects
    for page in pages:
        fu = FuturePage()
        if page.get('name'):
            fu.name = page['name']
        if page.get('filename'):
            fu.filename = page['filename']
        if page.get('type'):
            fu.type = page['type']
            if fu.type == 'content':
                fu.article = fu.filename
        if page.get('title'):
            fu.title = page['title']
        future.append(fu)
    
    # fill the blanks
    for fu in future:
        if fu.title == "":
            fu.title = "title.html"
        if fu.nav == "":
            fu.nav = "nav.html"
        if fu.header == "":
            fu.header = "header.html"
        if fu.article == "":
            fu.article = "article.html"
    return future

# read site.map to find substitutions
def read_site_map(filename):
    macros = []
    with open(filename, 'r') as f:
        contents = [l.rstrip() for l in f.readlines()]
    for c in contents:
        if len(c) > 2:
            line = c.split(" ")
            macros.append(Macro(line[0], line[1], line[2]))
    return macros

# handles main functions
def main(args):
    macros = read_site_map(map_file)
    future = read_pages_map(pages_file, macros)
    generate_pages(future, macros)

# main entry
# just parses and sends everything to main
if __name__ == '__main__':
    map_file = "site.map"
    pages_file = "pages.map"
    content_dir = "content/"

    parser = argparse.ArgumentParser(description="Precompiler for tristancharpentier.com")

    parser.add_argument("clean", help="deletes compiled files", action="store_true")
    parser.add_argument("dryrun", help="compiles without writing files", action="store_true")
    parser.add_argument("compile", help="compiles project", action="store_true")
    parser.add_argument("-v", "--verbose", help="print changes", action="store_true")
    
    args = parser.parse_args()

    main(args)