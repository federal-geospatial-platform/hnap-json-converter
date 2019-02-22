exports.extract = (hnapJSON) => {
    let ex = {test: 'test'};

    if (hnapJSON && hnapJSON.value){

        let val = hnapJSON.value;

        //let dateStamp = val.dateStamp;
        ex.dateStamp = resolve(val.dateStamp)('dateStamp')('dateTime')() || undefined;

        //let language = val.language;
        ex.language = resolve(val.language)('characterString')('value')() || undefined;

        //let characterSet = val.characterSet;
        //extract.characterSet = characterSet.mdCharacterSetCode.value;

        ex.parentIdentifier = resolve(val.parentIdentifier)('characterString')('value')() || undefined;
        
        ex.distributionInfo = resolve(val.distributionInfo)('mdDistribution')() || undefined;
        
        let v = resolve(val.metadataStandardVersion)('characterString')('value')() || undefined;
        ex.metadataStandardVersion = v;

        //let fileIdentifier = val.fileIdentifier;
        ex.uuid = resolve(val.fileIdentifier)('characterString')('value')() || undefined;

        let metadataStandardName = val.metadataStandardName;
        //extractedHNAP.metadataStandardName = metadataStandardName.characterString.value;
        
        let contactHNAP = val.contact[0].ciResponsibleParty;
        //extractedHNAP.contact = { 
        //    organisationName = contactHNAP.organisationName.characterString.value,
        //    contactInfo = contactHNAP.contactInfo.ciContact,
        //    role = contactHNAP.role.ciRoleCode.value
        //};
        
        let locale = val.locale[0];
        //extractedHNAP.locale = loclale.ptLocale;

        //let referenceSystemInfo = val.referenceSystemInfo;

        let identificationInfo = resolve(val.identificationInfo[0])('abstractMDIdentification')('value')();

        let abstract = extractAbstract(identificationInfo._abstract);
        let hierarchyLevel = val.hierarchyLevel;
        let dataQualityInfo = val.dataQualityInfo;

        return ex;


    } else {
        console.log("empty HNAP JSON object");
    }

}

// http://jsfiddle.net/VHcdq/1
// https://codereview.stackexchange.com/questions/54531/checking-if-variable-is-defined-before-accessing-its-properties
function resolve(value) {
    return function(key) {
        return key ? resolve((value || {})[key]) : value;
    };
}

function extractAbstract(_abstract){
    //value.identificationInfo[0].abstractMDIdentification.value._abstract.characterString.value
    let first = resolve(_abstract)('characterString')('value')();

    //value.identificationInfo[0].abstractMDIdentification.value._abstract.ptFreeText.textGroup[0].localisedCharacterString
    let alternate = resolve(_abstract)('ptFreeText')('textGroup[0]')();
    //let alternate = resolve(_abstract)('ptFreeText')('textGroup[0]')();

    if (!_abstract) return _abstract;
    
    return {
                primary: {
                            locale: switchLanguage(alternate.locale),
                            value: alternate.value
                },
                alternate: {
                            locale: alternate.locale,
                            value: alternate.value
                }
            }
}

// ptFreeText elements in HNAP are used for alternate language information
// the default value does not define the language, 
// so need to use the language of the alternate to get the default language
function switchLanguage(lang){
    if (lang){
        return ((lang = "#fra") ? "#eng" : "#fra");
    }
    return lang;
}