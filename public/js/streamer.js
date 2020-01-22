const resMsg = document.querySelector('#msg')

sendReport = () => {
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

// Grab elements, create settings, etc.
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// The detected positions will be inside an array
let poses = [];

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function (stream) {
    video.srcObject = stream;
    video.play();
  });
}

// A function to draw the video and poses into the canvas.
// This function is independent of the result of posenet
// This way the video will not seem slow if poseNet 
// is not detecting a position
function drawCameraIntoCanvas() {
  // Draw the video element into the canvas
  ctx.drawImage(video, 0, 0, 640, 480);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawSkeleton();
  window.requestAnimationFrame(drawCameraIntoCanvas);
}
// Loop over the drawCameraIntoCanvas function
drawCameraIntoCanvas();

// Create a new poseNet method with a single detection
const poseNet = ml5.poseNet(video, modelReady);
poseNet.on('pose', gotPoses);

// A function that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
}

function modelReady() {
  console.log("model ready")
  poseNet.multiPose(video)
}

let frames = [];
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      // console.log(keypoint.score)
      // console.log(keypoint.part)
      if (keypoint.part === 'nose') {
        frames.push(keypoint.position.x)
        console.log(keypoint.position.x)
        if (frames.length > 3) {
          if (frames[frames.length - 2] - frames[frames.length - 1] > 100) {
            alert('ALL')
            sendReport()
            frames = [];
          }
        }
      }
      if (keypoint.score > 0.2) {
        ctx.beginPath();
        ctx.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
}