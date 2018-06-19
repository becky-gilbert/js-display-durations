/*
 * Example plugin template
 */

jsPsych.plugins["estimate-refresh-rate"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "estimate-refresh-rate",
    parameters: {
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 5000
      }
    }
  }

  plugin.trial = function(display_element, trial) {


    var trial_data = {
      frames_diff: []
    }

    var last = null;

    function next(){
      var now = performance.now();
      if(last !== null){
        trial_data.frames_diff.push(now - last);
      }
      last = now;
      var remaining = (trial.trial_duration - (now - start)) / 1000;
      display_element.innerHTML = "<p style='font-size:48px;'>" + Math.ceil(remaining) + "</p>";
      if(remaining > 0) {
        window.requestAnimationFrame(next);
      } else {
        end();
      }
    }

    var start = performance.now();
    window.requestAnimationFrame(next);

    function end(){
      display_element.innerHTML = "";
      // end trial
      jsPsych.finishTrial(trial_data);  
    }
  };

  return plugin;
})();
