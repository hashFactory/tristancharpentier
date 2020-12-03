#!/bin/zsh

# give argument if you don't want to recompile
if [ $# -eq 0 ]
then
    ./preprocess.py compile
fi

# fetch original and browser window ID
CURRENT=`xdotool getactivewindow`
WID=`xdotool search --name "Mozilla Firefox" | head -1`

# switch to browser and refresh page
xdotool windowactivate $WID
xdotool key F5

# focus back to original window
xdotool windowactivate $CURRENT