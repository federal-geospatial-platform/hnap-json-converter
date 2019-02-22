const jp = require('jsonpath');

exports.extract = (hnapJSON) => {

    if (hnapJSON){
        return {
            //let dateStamp = jp.query(hnapJSON, '$.value.dateStamp.dateTime');
            dateStamp: jp.query(hnapJSON, '$.value.dateStamp.dateTime'),
            //console.log('dateStamp: ' + JSON.stringify(dateStamp));
            //let language = jp.query(hnapJSON, '$.value.language.characterString.value')[0];
            distributionInfo: extractDistributionInfo(hnapJSON),

            language: jp.query(hnapJSON, '$.value.language.characterString.value')[0],
            //console.log('language: ' + JSON.stringify(language));
            //let characterSet = jp.query(hnapJSON, '$.value.characterSet.mdCharacterSetCode.value')[0];
            characterSet: jp.query(hnapJSON, '$.value.characterSet.mdCharacterSetCode.value')[0],
            //console.log('characterSet: ' + JSON.stringify(characterSet));
            //let metadataStandardVersion = jp.query(hnapJSON, '$.value.metadataStandardVersion.characterString.value')[0];
            metadataStandardVersion: jp.query(hnapJSON, '$.value.metadataStandardVersion.characterString.value')[0],
            //console.log('metadataStandardVersion: ' + JSON.stringify(metadataStandardVersion));
            //let metadataStandardName = extractMetadataStandardName(hnapJSON);
            metadataStandardName: extractMetadataStandardName(hnapJSON),
            //console.log('metadataStandardName: ' + JSON.stringify(metadataStandardName));
            //let uuid= jp.query(hnapJSON, '$.value.fileIdentifier.characterString.value')[0];
            uuid: jp.query(hnapJSON, '$.value.fileIdentifier.characterString.value')[0],
            //console.log('uuid ' + JSON.stringify(uuid));
            //let hierarchyLevel = jp.query(hnapJSON, '$.value.hierarchyLevel[0].mdScopeCode.value')[0];
            hierarchyLevel: jp.query(hnapJSON, '$.value.hierarchyLevel[0].mdScopeCode.value')[0],
            //console.log('hierarchyLevel: ' + JSON.stringify(hierarchyLevel));
            //let locale = extractLocale(hnapJSON);
            locale: extractLocale(hnapJSON),
            //console.log('locale: ' + JSON.stringify(locale));
            //let identificationInfo = extractIdentificationInfo(hnapJSON);
            identificationInfo: extractIdentificationInfo(hnapJSON),
        }
    }
}

function extractLocale(hnapJSON){

    let id= jp.query(hnapJSON, '$.value.locale[0].ptLocale.id')[0];
    let languageCode = jp.query(hnapJSON, '$.value.locale[0].ptLocale.languageCode.languageCode')[0];
    let country = jp.query(hnapJSON, '$.value.locale[0].ptLocale.country.country')[0];
    let characterEncoding = jp.query(hnapJSON, '$.value.locale[0].ptLocale.characterEncoding.mdCharacterSetCode')[0];

    return locale = {   
                        id: id,
                        languageCode:   {
                                            codeListValue: languageCode.codeListValue,
                                            value: languageCode.value
                                        },
                        country: {
                                    codeListValue: country.codeListValue,
                                    value: country.value
                                },
                        characterEncoding: {
                                                codeListValue: characterEncoding.codeListValue,
                                                value: characterEncoding.value
                                            }
                    }
}

function extractMetadataStandardName(hnapJSON){

    return {   
        metadataStandardName : jp.query(hnapJSON, '$.value.metadataStandardName.characterString.value')[0],
        alternate : {
                                            locale: jp.query(hnapJSON, 'value.metadataStandardName.ptFreeText.textGroup[0].localisedCharacterString.locale')[0],
                                            value: jp.query(hnapJSON, 'value.metadataStandardName.ptFreeText.textGroup[0].localisedCharacterString.value')[0]
                                        }
    }
}

function extractIdentificationInfo(hnapJSON){
    let abstract = extractAbstract(hnapJSON);
    //console.log('abstract: ' + JSON.stringify(abstract));
    let characterSet = jp.query(hnapJSON,'$.value.identificationInfo[0].abstractMDIdentification.value.characterSet[0].mdCharacterSetCode.value')[0];
    //console.log('characterSet: ' + JSON.stringify(characterSet));
    let citation = extractCitation(hnapJSON);
    //console.log('citation: ' + JSON.stringify(citation));
    let distributionInfo = extractDistributionInfo(hnapJSON);
    let extent = extractExtent(hnapJSON);
    let keywords = extractkeywords(hnapJSON);
    //console.log('keywords: ' + JSON.stringify(keywords));
    let language = jp.query(hnapJSON,'$.value.identificationInfo[0].abstractMDIdentification.value.language[0].characterString.value')[0];
    //console.log('language: ' + JSON.stringify(language));
    let spatialRepresentationType = jp.query(hnapJSON,'$.value.identificationInfo[0].abstractMDIdentification.value.spatialRepresentationType[0].mdSpatialRepresentationTypeCode.value')[0];
    //console.log('spatialRepresentationType: ' + JSON.stringify(spatialRepresentationType));
    let status = jp.query(hnapJSON,'$.value.identificationInfo[0].abstractMDIdentification.value.status[0].mdProgressCode.value')[0];
    //console.log('status: ' + JSON.stringify(status));
    let topicCategory = jp.query(hnapJSON,'$.value.identificationInfo[0].abstractMDIdentification.value.topicCategory..mdTopicCategoryCode');
    //console.log('topicCategory: ' + JSON.stringify(topicCategory));
        
    return {
        abstract: abstract,
        characterSet: characterSet,
        citation: citation,
        distributionInfo: distributionInfo,
        extent: extent,
        keywords: keywords,
        language: language,
        spatialRepresentationType: spatialRepresentationType,
        status: status,
        topicCategory: topicCategory        
    }
}

function extractAbstract(hnapJSON){
    let abstractPaths = {
                            value: '$.value.identificationInfo[0].abstractMDIdentification.value._abstract.characterString.value',
                            alternate :{
                                            locale: '$.value.identificationInfo[0].abstractMDIdentification.value._abstract.ptFreeText.textGroup[0].localisedCharacterString.locale',
                                            value: '$.value.identificationInfo[0].abstractMDIdentification.value._abstract.ptFreeText.textGroup[0].localisedCharacterString.value' 
                                        }
                                    }

    return extractObject(hnapJSON, abstractPaths);
    //console.log('abstract: ' + JSON.stringify(extractObject(hnapJSON, abstractPaths)));                
}

function extractCitation(hnapJSON){
    let titlePaths = {
                   value: '$.value.identificationInfo[0].abstractMDIdentification.value.citation.ciCitation.title.characterString.value',
                   alternate: {
                                locale: '$.value.identificationInfo[0].abstractMDIdentification.value.citation.ciCitation.title.ptFreeText.textGroup[0].localisedCharacterString.locale',
                                value: '$.value.identificationInfo[0].abstractMDIdentification.value.citation.ciCitation.title.ptFreeText.textGroup[0].localisedCharacterString.value'
                            }
    };

    let title =  extractObject(hnapJSON, titlePaths);
    
    let date = extractCitationDates(hnapJSON);

    let citedResponsibleParty = extractCitationCitedResponsibleParty(hnapJSON);

    return {
                title:title,
                date:date,
                //citedResponsibleParty: citedResponsibleParty
                citedResponsibleParty: {}
    }    
}

function extractCitationDates(hnapJSON){
    let datePath = '$.value.identificationInfo[0].abstractMDIdentification.value.citation.ciCitation.date';
    let datesArray = jp.query(hnapJSON, datePath)[0];
    let citationDates = [];
    for (let i = 0; i < datesArray.length; i++) {
        //console.log('i: ' + i);
        //console.log('date object: ' + JSON.stringify(datesArray[i]));
        let dateObject = {    
                            date: jp.query(datesArray[i], '$.ciDate.date.date')[0],
                            dateType: jp.query(datesArray[i], '$.ciDate.dateType.ciDateTypeCode.value')[0]
                        };
        citationDates.push(dateObject);
    }
    return citationDates;
    //console.log('citation dates: ' + JSON.stringify(citationDates));
}

function extractCitationCitedResponsibleParty(hnapJSON){
    let partiesPath = '$.value.identificationInfo[0].abstractMDIdentification.value.citation.ciCitation.citedResponsibleParty';
    let partiesArray = jp.query(hnapJSON, partiesPath)[0];

    //'$.ciResponsibleParty.individualName';
    //'$.ciResponsibleParty.organisationName';
    //'$.ciResponsibleParty.positionName';
    //'$.ciResponsibleParty.contactInfo.ciContact';
    //'$.ciResponsibleParty.role.ciRoleCode.value';

    let parties = [];
    for (let i = 0; i < parties.length; i++) {
        //console.log('i: ' + i);
        //console.log('date object: ' + JSON.stringify(parties[i]));
        let dateObject = {    
                            //individualName: jp.query(parties[i], '$.ciDate.date.date')[0],
                            //date: jp.query(parties[i], '$.ciDate.dateType.ciDateTypeCode.value')[0]
                        };
        //parties.push(dateObject);
    }
    //console.log('parties: ' + JSON.stringify(parties));
}

function extractDistributionInfo(hnapJSON){
    let path = '$.value.distributionInfo.mdDistribution.transferOptions';
    let subpath = '$.mdDigitalTransferOptions.onLine[0].ciOnlineResource';
    
    let options = jp.query(hnapJSON, path)[0];

    //console.log('options; ' + JSON.stringify(options));
    let transferOptions = [];

    for (let i = 0; i < options.length; i++) {
        const o = options[i];
        let option = jp.query(o, subpath)[0];
        //console.log('option ' + i + ': ' + JSON.stringify(option));
        let transferOption = extractTransferOptions(option);
        transferOptions.push(transferOption);
    }

    return {
        distributionFormat: {},
        distributor: {},        
        transferOptions: transferOptions
    }
}

function extractTransferOptions(json){

    if (json) {
        let url = json.linkage.url;
        //console.log('url: ' + JSON.stringify(url));
        let protocol = jp.query(json, '$.protocol.characterString.value')[0];
        //console.log('protocol: ' + JSON.stringify(protocol));
        let namePaths = {
                    value: '$.name.characterString.value',
                    alternate :{
                                    locale: '$.name.ptFreeText.textGroup[0].localisedCharacterString.locale',
                                    value: '$.name.ptFreeText.textGroup[0].localisedCharacterString.value' 
                                }
                }
        let name = extractObject(json, namePaths);
        //console.log('name: ' + JSON.stringify(name));

        let descriptionPaths = {
                value: '$.description.characterString.value',
                alternate :{
                                locale: '$.description.ptFreeText.textGroup[0].localisedCharacterString.locale',
                                value: '$.description.ptFreeText.textGroup[0].localisedCharacterString.value' 
                            }
            }
        let description = extractObject(json, descriptionPaths);
        //console.log('description: ' + JSON.stringify(description));

        return {
                url: url,
                protocol: protocol,
                name: name,
                description: description
        }
    }
}

function extractkeywords(hnapJSON){
    let paths = {
                    value: '$.value.identificationInfo[0].abstractMDIdentification.value.descriptiveKeywords[0].mdKeywords.keyword[0].characterString.value',
                    alternate :{
                                    locale: '$.value.identificationInfo[0].abstractMDIdentification.value.descriptiveKeywords[0].mdKeywords.keyword[0].ptFreeText.textGroup[0].localisedCharacterString.locale',
                                    value: '$.value.identificationInfo[0].abstractMDIdentification.value.descriptiveKeywords[0].mdKeywords.keyword[0].ptFreeText.textGroup[0].localisedCharacterString.value' 
                                }
                }
    return extractObject(hnapJSON, paths);
}

function extractExtent(hnapJSON){
   let extents = jp.query(hnapJSON,'$.value.identificationInfo[0].abstractMDIdentification.value.extent..exExtent');
   //console.log('extentArray: ' + JSON.stringify(extentArray));

   let result = [];
   for (let i = 0; i < extents.length; i++) {
       const extent = extents[i];
       //console.log('extent: ' + JSON.stringify(extent));

        let e =  {
                    type: '', 
                    value: {}
                };

       if (extent && extent.temporalElement){
            let beginPosition = '$.value.identificationInfo[0].abstractMDIdentification.value.extent[0].exExtent.temporalElement[0].exTemporalExtent.value.extent.abstractTimePrimitive.value.beginPosition.value';
            let endPosition = '$.value.identificationInfo[0].abstractMDIdentification.value.extent[0].exExtent.temporalElement[0].exTemporalExtent.value.extent.abstractTimePrimitive.value.endPosition.value';
            e.type = 'temporalElement';
            e.value.beginPosition = jp.query(hnapJSON, beginPosition)[0];
            e.value.endPosition = jp.query(hnapJSON, endPosition)[0];
       }

       if (extent && extent.geographicElement){
            let path = '$.value.identificationInfo[0].abstractMDIdentification.value.extent[1].exExtent.geographicElement[0].abstractEXGeographicExtent.value';
            e.type = 'geographicElement';
            let points = jp.query(hnapJSON, path)[0];
            e.value = {
                westBoundLongitude: jp.query(points, '$.westBoundLongitude.decimal')[0],
                eastBoundLongitude: jp.query(points, '$.eastBoundLongitude.decimal')[0],
                southBoundLatitude: jp.query(points, '$.southBoundLatitude.decimal')[0],
                northBoundLatitude: jp.query(points, '$.northBoundLatitude.decimal')[0]
            };
        }
       result.push(e);
   }
   //console.log('extent result: ' + JSON.stringify(result));
   return result;
}

// The pathObject has two keys.
//  value: the primary value set in the HNAP JSON
// alternate : the second lanuage object which itself has two keys
//          locale: language value
//          value: the second language version of the primary value
function extractObject(hnapJSON, pathObject){
    return {
        value: jp.query(hnapJSON,pathObject.value)[0],
        alternate:  {
                        locale: jp.query(hnapJSON, pathObject.alternate.locale)[0],
                        value: jp.query(hnapJSON, pathObject.alternate.value)[0]
                    }
    }
}