const express = require('express');
const app = express();
const dotenv = require("dotenv");
const { HTTP_STATUS } = require('./utils/constants');
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const multer = require('multer');
const { checkWavFile, checkArg } = require('./middleware/validators');

dotenv.config();
const cors = require('cors')
app.use(express.json())
app.use(cors());

// Routes
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Perform speech recognition on a WAV audio file.
 *
 * @return {Object} - The JSON object containing the recognized text.u.
 * 
 * @description This function uses the following query parameters:
 *              - `req.body.language` : A string representing the recognition language.
 *              - `req.file` : The WAV audio file to recognize.
 */
app.post('/reconnaissance-vocale',
  upload.single('audioData'),
  checkWavFile,checkArg, (req, res) => {
    // Config
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.API_KEY, process.env.REGION);
    speechConfig.speechRecognitionLanguage = req.body.language;

    let audioConfig = sdk.AudioConfig.fromWavFileInput(req.file.buffer);
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
      switch (result.reason) {

        case sdk.ResultReason.RecognizedSpeech:
          return res.status(HTTP_STATUS.OK).json({ data: result.text });

        case sdk.ResultReason.NoMatch:
          return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Speech could not be recognized." });

        case sdk.ResultReason.Canceled:
          const cancellation = sdk.CancellationDetails.fromResult(result);

          if (cancellation.reason == sdk.CancellationReason.Error){
            console.error(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
            console.error(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Erreur interne du serveur.' });
          }

          return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Requête incorrecte.' });
      }
      speechRecognizer.close();
    });

  });

const PORT = process.env.PORT || 4112;
app.listen(PORT, console.log("Server has started at port " + PORT))