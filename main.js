var array_1 = ['pen', 'ship', 'skull', 'camera', 'book', 'bottle','tree'];
var drawn_sketch = "";
var timer_counter = 0;
var score = 0;
var answer_holder = "";
var timer_check = "";
var sketch = "";
random_no = Math.floor((Math.random() * array_1.length));
console.log(random_no);
sketch = array_1[random_no];
console.log(array_1[random_no]);
document.getElementById("sketch_name").innerHTML ="sketch to be drawn "+array_1[random_no];
function setup() {
  canvas = createCanvas(280, 280);
  canvas.center();
  background("white");
  
  canvas.mouseReleased(classifyCanvas);
}

function preload() {
  classifier = ml5.imageClassifier("DoodleNet");

}

function clear_canvas() {
  background = ("white")
}

function classifyCanvas() {
  classifier.classify(canvas,gotResults);
}

function update_canvas() {
 background("white");
  random_no = Math.floor((Math.random() * array_1.length));
  console.log(random_no);
  sketch = array_1[random_no];
  console.log(array_1[random_no]);
  document.getElementById("sketch_name").innerHTML = "sketch to be drawn"+array_1[random_no];
}

function draw() {
  strokeWeight = "13";
  strokeColor = "red";
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  check_sketch();
  if (drawn_sketch == sketch) {
    answer_holder = "set";
    score++;
    document.getElementById("score").innerHTML = "score: " + score;
  }
}

function check_sketch() {
  timer_counter++;
  document.getElementById('time').innerHTML = 'Timer: ' + timer_counter;
  console.log(timer_counter)
  if(timer_counter > 400)
    {
      timer_counter = 0;
      timer_check = "completed"
    }
    if(timer_check =="completed" || answer_holder == "set")
    {
      timer_check = "";
      answer_holder = "";
      updateCanvas();
}}


function gotResults(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  drawn_sketch=results[0].label;
  document.getElementById("label").innerHTML = "your sketch: " + results[0].label;
  document.getElementById("confidence").innerHTML = "confidence: " + Math.round(results[0].confidence * 100) + " %";
}
