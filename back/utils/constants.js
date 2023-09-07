const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}


// Problème le front génère les codes plus ou moins iso.
// Le problème sait que qu'azure gère les code_iso officiels.
// Donc les langues comme arabe / english ont plusieurs code iso selon le pays
const CODE_ISO = {
    arab: "ar-MA", //Maroc
    german: "de-DE",
    english : "en-GB", //Royaume-uni
    spanish : "es-ES",
    finnish : "fi-FI",
    french : "fr-FR",
    italian : "it-IT",
    dutch : "nl-NL",
    portuguese : "pt-PT",
    ukrainian : "uk-UA",
}
// Soit il faudrait définir le pays de l'user pour être le plus précis possible selon son accent 
// Soit on établi un code_iso pour les deux pays.

module.exports = {
    HTTP_STATUS,
    CODE_ISO
};