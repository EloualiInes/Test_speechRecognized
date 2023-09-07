const { HTTP_STATUS } = require("../utils/constants");
const { isStringEmpty } = require("../utils/utils");

const checkWavFile = (req, res, next) => {
    if(!req.file)
        return res.status(HTTP_STATUS.BAD_REQUEST).json({error: "Aucun fichier téléchargé"})

    const header = Buffer.alloc(4);
    header.fill(0);
    req.file.buffer.copy(header, 0,0,4);

    if(header.toString("utf-8") !== "RIFF")
        return res.status(HTTP_STATUS.BAD_REQUEST).json({error: "Le fichier n'est pas au format wav"});

    next();
}

const checkArg = (req, res, next) => {
    if(!req.body.language)
        return res.status(HTTP_STATUS.BAD_REQUEST).json({error : "Il manque la langue de la voice"});
    if(!isStringEmpty(req.body.language))
        return res.status(HTTP_STATUS.BAD_REQUEST).json({error : "\"language\" n'est pas un string ou est vide"});
    next();
}


module.exports={
    checkWavFile,
    checkArg
}