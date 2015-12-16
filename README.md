# wix-client-recorder
Record and replay mouse movements. 
An utility written in vanilla javascript.

## What's That?
This is a small util which allows you to record basic mouse events (move, clicks, scroll) and events and replay then later.

## What Can I Do With It?
You can replay a client's session for many reasons: replicating a bug, see user's behaviour, etc..

## A Demonstration, Please
1. git clone this repo.
2. Open demo/src/demo.html on your browser.
3. Play!

## Cool! How do I Use It?
1. You'll have to include wix-client-recorder.min.js in your project.
2. You can call any of the following functions from your javascript call:
        Recorder.start - to start a fresh reording of a page.
        Recorder.stop - stop current reocrding
        Recorder.play - playback the current recording, or play some saved recording
        Recorder.printTable - print recording to console as table
        Recorder.printJson - print recording to console as json
        Recorder.getSteps - get an object with all recorded steps
        Recorder.setDebug - set to true if you want a verbose messages on the console.
        
## I want to contribute to this utility - how can I do that?
1. install npm (https://www.npmjs.com/)
2. install Grunt (http://gruntjs.com/)
3. git clone git@github.com:danielwix/wix-client-recorder.git
4. cd wix-client-recorder
5. run: npm i && grunt
6. modify some code.
Don't forget to run grunt before you commit.
