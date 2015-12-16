/*eslint-env browser*/
(function () {
    'use strict';

    var localSteps, preTime, nowTime;
    var cursor = getCursor();
    var debug = false;

    function onMouseMove(e) {
        addEvent('move', e.pageX, e.pageY);
    }

    function onClick(e) {
        addEvent('click', e.pageX, e.pageY);
    }

    function onScroll() {
        addEvent('scroll', window.scrollX, window.scrollY);
    }

    function addEvent(type, x, y) {
        localSteps.push({type: type, x: x, y: y, time: Date.now()});
    }

    function resetParams() {
        localSteps = [];
        preTime = 0;
        nowTime = 0;
    }

    function start() {
        log('Recording started');
        resetParams();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('click', onClick);
        document.addEventListener('scroll', onScroll);
    }

    function stop() {
        log('Recording stopped');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('click', onClick);
        document.removeEventListener('scroll', onScroll);
    }

    function clickOnElementAtPosition(x, y) {
        var clickCandidate = document.elementFromPoint(x, y);

        while (clickCandidate && !clickCandidate.click) {
            clickCandidate = clickCandidate.parentNode;
        }

        if (clickCandidate && clickCandidate.click) {
            clickCandidate.click();
        }
    }

    function play(steps) {
        steps = steps || localSteps;
        stop();

        log('Playing recording with', steps.length, 'steps');

        showCursor();

        var stepNumber = 0;
        var stepsCount = steps.length;
        var timeout, currentStep;

        (function animate() {
            currentStep = steps[stepNumber];
            if (currentStep.type === 'move') {
                setCursorPosition(currentStep.x, currentStep.y);
            }

            if (currentStep.type === 'click') {
                clickOnElementAtPosition(currentStep.x, currentStep.y);
            }

            if (currentStep.type === 'scroll') {
                window.scrollTo(currentStep.x, currentStep.y);
            }

            preTime = nowTime;
            nowTime = currentStep.time;

            stepNumber++;

            if (stepNumber === stepsCount) {
                log('Finished playing recording');
                window.clearTimeout(timeout);
                hideCursor();
            } else {
                timeout = window.setTimeout(animate, nowTime - preTime);
            }

        }());
    }

    function printTable() {
        console.table(localSteps);
    }

    function printJson() {
        console.log(JSON.stringify(localSteps));
    }

    function getCursor() {
        var cursorNode = document.createElement('div');

        cursorNode.style.borderRadius = '50%';
        cursorNode.style.background = 'red';
        cursorNode.style.width = '10px';
        cursorNode.style.height = '10px';
        cursorNode.style.position = 'fixed';
        cursorNode.style.top = 0;
        cursorNode.style.left = 0;
        cursorNode.style.zIndex = 999;

        return cursorNode;
    }

    function setCursorPosition(x, y) {
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    }

    function showCursor() {
        document.body.appendChild(cursor);
    }

    function hideCursor() {
        document.body.removeChild(cursor);
    }

    function getSteps() {
        return localSteps;
    }

    function setDebug(enabled) {
        debug = enabled;
    }

    function log() {
        if (debug) {
            logWithTimestamp(arguments);
        }
    }

    function logWithTimestamp(args) {
        var argsAsArray = Array.prototype.slice.call(args);
        var now = new Date().toString();

        console.log.apply(console, [now].concat(argsAsArray));
    }

    window.Recorder = {
        start: start,
        stop: stop,
        play: play,
        printTable: printTable,
        printJson: printJson,
        getSteps: getSteps,
        setDebug: setDebug
    };

}());