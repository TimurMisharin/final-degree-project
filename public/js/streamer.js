const resMsg = document.querySelector('#msg')

let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;

function sendReport() {
  axios.post('/reports', {
      description: `Fall Detected in: ${new Date()}`
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      resMsg.innerHTML = "Reported!!!"
    })
    .catch(function (error) {
      resMsg.innerHTML = "Something went Wrong!!!"
    })
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);

  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function modelReady() {
  console.log('model ready!')
}

const frames = [];

function gotPoses(poses) {
  if (poses.length > 0) {
    const nX = poses[0].pose.keypoints[0].position.x;
    const nY = poses[0].pose.keypoints[0].position.y;
    const eX = poses[0].pose.keypoints[1].position.x;
    const eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

// function gotPoses(poses) {

// if (poses.length > 0) {

//   let eX = poses[0].pose.keypoints[1].position.x;
//   let eY = poses[0].pose.keypoints[1].position.y;
//   frames.push(nY);
//   if (frames.length > 3) {
//     if (frames[frames.length - 1] - frames[frames.length - 2] > 50) {
//         sendReport();
//     }
//     noseX = lerp(noseX, nX, 0.5);
//     noseY = lerp(noseY, nY, 0.5);
//     eyelX = lerp(eyelX, eX, 0.5);
//     eyelY = lerp(eyelY, eY, 0.5);
//   }
// }


function draw() {
  image(video, 0, 0);
  const d = dist(noseX, noseY, eyelX, eyelY);
  console.log(d)
  fill(255, 0, 0);
  ellipse(noseX, noseY, 50);

}
// }