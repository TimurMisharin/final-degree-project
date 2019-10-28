const socket = io()

socket.on('reported', () => {
    console.log('Report is sended');
})


let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
 
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

const frames = [];

function gotPoses(poses) {

  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    frames.push(nY);
    if(frames.length>3){
        if(frames[frames.length-1]-frames[frames.length-2] > 50) {
            socket.emit('falled','falled');
        }
    }
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eyelX, eyelY);

  fill(500, 0, 0);
  ellipse(noseX, noseY, d);

}







// // get video dom element
// const video = document.querySelector('video');
        
// // request access to webcam
// navigator.mediaDevices.getUserMedia({video: {width: 426, height: 240}}).then((stream) => video.srcObject = stream);

// // returns a frame encoded in base64
// const getFrame = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext('2d').drawImage(video, 0, 0);
//     const data = canvas.toDataURL('image/png');
//     return data;
// }

// const FPT = 30;

// // setInterval(()=>{
// //     console.log(getFrame());
// // }, 1000 / 30);