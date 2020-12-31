import json
import os

template_html = 'playlist_template.html'
playlist_json = 'magna_opera.json'
playlist_folder = 'magna_opera'
output_html = 'magna_opera.html'

template = ""
html_buffer = ""
i = 0
files = [s for s in os.listdir(playlist_folder) if os.path.isfile(os.path.join(playlist_folder, s))]

def find_file(index):
    for f in files:
        if [int(s) for s in f.split() if s.isdigit()][0] == (index + 1):
            print(str(index+1) + '   ' + os.path.join(playlist_folder, f))
            return os.path.join(playlist_folder, f)

with open(template_html, 'r') as t:
    template = t.read()

with open(playlist_json, 'r') as f:
    data = json.load(f)
    print(len(data))
    for track in data:
        track_buf = '' + template
        print(track['title'])
        track_buf = track_buf.replace('|ART|', track['picture'])
        track_buf = track_buf.replace('|TITLE|', track['title'])
        track_buf = track_buf.replace('|ARTIST|', track['artist'])
        track_buf = track_buf.replace('|ALBUM|', track['album'])
        track_buf = track_buf.replace('|ID|', str(i))
        track_buf = track_buf.replace('|FILE|', find_file(i))
        html_buffer += track_buf
        i += 1

with open(output_html, 'w+') as o:
    o.write(html_buffer)
    o.close()
