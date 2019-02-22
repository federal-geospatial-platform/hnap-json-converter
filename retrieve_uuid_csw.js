const request = require('request');
const fs = require('fs');

const Jsonix = require('jsonix').Jsonix;

const CSW = require('ogc-schemas').CSW_2_0_2;
const DC_1_1 = require('ogc-schemas').DC_1_1;
const OWS_1_0_0  = require('ogc-schemas').OWS_1_0_0;
const OWS_1_1_0  = require('ogc-schemas').OWS_1_1_0;
const OWS_2_0 = require('ogc-schemas').OWS_2_0;
const XLink = require('w3c-schemas').XLink_1_0;

const context =  new Jsonix.Context([XLink, DC_1_1, OWS_1_0_0, CSW]);
const unmarshaller = context.createUnmarshaller();

//https://maps.canada.ca/geonetwork/csw?service=CSW&version=2.0.2&request=GetRecords&typcswenames=csw:Record&elementsetname=brief
const cswUrl = 'https://maps.canada.ca/geonetwork/srv/eng/csw';

const  qsGetCount= {    service:'CSW',
                        version:'2.0.2',
                        request:'GetRecords',
                        typenames:'csw:Record',
                        elementsetname:'brief',
                        constraintLanguage:'FILTER'};

request({url:cswUrl, qs:qsGetCount}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body);

    let json = unmarshaller.unmarshalString(body);
    //console.log('count: ' + JSON.stringify(json));
    let count = json.value.searchResults.numberOfRecordsMatched;
    console.log('count: ' + JSON.stringify(count));

    const qsGetUUIDs= {  Request:'GetRecords',
                        service:'CSW',                        
                        resultType:'results',
                        version:'2.0.2',
                        maxRecords:'1',
                        startPosition:'1',
                        typeNames:'gmd:MD_Metadata',                        
                        //elementnameStrategy:'context',
                        elementsetname:'brief',
                        //ElementName:'/csw:Record/dc:identifier',
                        constraintLanguage:'FILTER',
                        outputSchema:'http://www.opengis.net/cat/csw/2.0.2',
                        outputFormat:'application/xml'
                    };

    for (let position = 1; position < count +1; position++) {

        qsGetUUIDs.startPosition = position;
        
        request({url:cswUrl, qs:qsGetUUIDs}, function (error, response, body) {
            
            if (!error && response && response.statusCode =='200'){
                                            
                let json = unmarshaller.unmarshalString(body);    
                let record;
                let uuid;

                if (json && json.value && json.value.searchResults){
                    record = json.value.searchResults.abstractRecord[0];
                    if (record && record.value){
                        uuid = record.value.identifier[0].value.content[0];   
                    }
                } else {
                    console.log('Can not proceed : json: ' + JSON.stringify(json));
                }
                
                //console.log('startPosition: ' + position);
                //console.log('uuid: ' + JSON.stringify(uuid));

            } else {
                
                console.log('startPosition: ' + position);
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            }
        });    
    }    
});