status1 = "";
objects = [];
song = "";
song2 = "";
function preload() {
    song1 = loadSound("alarm_clock_5.mp3")
    song2 = loadSound("lullaby.mp3")
}
function setup() {
    canvas = createCanvas(400, 400)
    canvas.position(480, 175)
    video = createCapture(VIDEO)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)

}
function modelLoaded() {
    status1 = true
    console.log('model is loaded')
    objectDetector.detect(video, gotResult)
}
function draw() {
    image(video, 0, 0, 400, 400)

    if (status1 != "") {
       

            for (i = 0; i < objects.length; i++) {
                if (objects[i].label=="person") {
                    document.getElementById("detect_status").innerHTML = "Status: Detecting Baby"
                    song1.stop()
                    song2.play()
                } else {
                    song2.stop()
                    song1.play()
                    document.getElementById("detect_objects_status").innerHTML = "Baby Not Detected"
                }
                if (objects[i].label==0) {
                    song2.stop()
                    song1.play()
                    document.getElementById("detect_objects_status").innerHTML = "Baby Not Detected"
                }
        
                fill("red")
                percentage = floor(objects[i].confidence * 100)
                text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y)
                noFill()
                stroke("red")
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            }



     
    }
}
function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results;
        document.getElementById("detect_objects_status").innerHTML = "Baby Detected"
    }
}
