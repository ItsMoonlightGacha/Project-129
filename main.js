song1="";
song2="";
songStatus=" ";
leftWristScore="0";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded() {
    console.log("pose net is initialized");
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristScore=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightWristX+"rightWristY= "+rightWristY);
        }
}
function draw() {
    image(video,0,0,600,500)
    fill("#FF0000");
    stroke("#FF0000");
    if(leftWristScore > 0.2) {
    circle(leftWristX,leftWristY,20);
    inNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(inNumberleftWristY);
    console.log(remove_decimals);
    volume=remove_decimals/625;



    if(songStatus=false) {
        song.play();
        document.getElementById("song_name").innerHTML="Song Name: "+volume;
    }
    }
}
function play() {
    song.play();
}
function stop() {
    song.stop();
}