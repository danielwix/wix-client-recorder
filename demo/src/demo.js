/*eslint-env browser*/
(function () {
  'use strict';

  function loadPlaybackFromInsertRecording() {
    var loadedPlayback = document.getElementById('insert-recording').value;
    var loadedStepsAsJson = JSON.parse( loadedPlayback);
    Recorder.play(loadedStepsAsJson);
  }

  function pasteJsonToTextArea() {
    document.getElementById('insert-recording').value = JSON.stringify(Recorder.getSteps());
  }

  window.Demo = {
    loadPlaybackFromInsertRecording: loadPlaybackFromInsertRecording,
    pasteJsonToTextArea: pasteJsonToTextArea
  };

}());