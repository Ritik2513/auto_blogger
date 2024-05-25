const { Deepgram } = require("@deepgram/sdk");
const deepgram = new Deepgram("08951a2526ddbed851ca0e65fd46c55f0c631a07");
const fs = require("fs");
let audioSource = {
  stream: fs.createReadStream("./static/uploads/firebase.mp4"),
  mimetype: "video/mp4",
};

// Sending a Buffer of the file
fs.readFile("./static/uploads/tauri.mp4", function (err, buffer) {});

async function start() {
  const response = await deepgram.transcription.preRecorded(audioSource, {
    punctuate: true,
    // other options are available
  });

  console.log(response.results.channels[0].alternatives[0]);
}

start();
