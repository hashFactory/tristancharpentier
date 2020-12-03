#!/bin/zsh

# give argument if you don't want to recompile
if [ $# -eq 0 ]
then
    # try to find repo
    REPO=$(find ~ -type d -name "tristancharpentier")
    SCRIPT="$REPO/preprocess.py"

    # if couldn't find compile script inform user
    if [ ! -f $SCRIPT ]
    then
        echo "Could not find preprocess.py in repo"
        echo "Guessed location: $SCRIPT"
    fi

    # compile website
    echo $SCRIPT compile
    $SCRIPT compile
fi

# fetch original and browser window ID
CURRENT=`xdotool getactivewindow`
WID=`xdotool search --name "Mozilla Firefox" | head -1`

# switch to browser and refresh page
xdotool windowactivate $WID
xdotool key F5

# focus back to original window
xdotool windowactivate $CURRENT