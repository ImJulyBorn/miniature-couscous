var status = "";
objects = [];
function preload(){
    alarm = loadSound("alarm-siren.mp3");
}
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}
function start(){
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}
function draw(){
    image(video, 0, 0, 400, 400);
    if(status != ""){
        r = random(255);
            g = random(255);
            b = random(255);
            ObjectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
        if(objects[0].label == "person")
        {
            document.getElementById("status").innerHTML = "Status - Objects detected";
            document.getElementById("baby_found").innerHTML = "Baby found";
        } else{
            document.getElementById("status").innerHTML = "Status - Objects detected";
            document.getElementById("baby_found").innerHTML = "Baby not found";
            alarm.play();
        }
    }
}
function modelLoaded(){
    console.log("model loaded .");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    } 
    console.log(results);
    objects = results;
}