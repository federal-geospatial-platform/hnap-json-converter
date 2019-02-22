var request = require('request');

const url = 'https://maps.canada.ca/geonetwork/srv/eng/metadata.download.xml';

const uuid ='87b08750-4180-4d31-9414-a9470eba9b42'
const qsUUID = {uuid:uuid};


//request('https://maps.canada.ca/geonetwork/srv/eng/metadata.download.xml?uuid=87b08750-4180-4d31-9414-a9470eba9b42', function (error, response, body) {
/* request({url:url, qs:qsUUID}, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body);
  
}); */


//http://catalog.data.gov/csw?service=CSW&version=2.0.2&request=GetRecords&typenames=csw:Record&elementsetname=brief
//https://maps.canada.ca/geonetwork/csw?service=CSW&version=2.0.2&request=GetRecords&typenames=csw:Record&elementsetname=brief
const cswUrl = 'https://maps.canada.ca/geonetwork/srv/eng/csw';
const  qsGetCount= {    service:'CSW',
                        version:'2.0.2',
                        request:'GetRecords',
                        typenames:'csw:Record',
                        elementsetname:'brief',
                        constraintLanguage:'FILTER'
                    };
request({url:cswUrl, qs:qsGetCount}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); 
});

/* const  qsGetRecordsById= {  service:'CSW',
                            version:'2.0.2',
                            request:'GetRecordById',
                            id:uuid,
                            elementsetname:'full'
                            };

request({url:cswUrl, qs:qsGetRecordsById}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); 
});  */


const  qsGetRecordsById19139= {  service:'CSW',
                            version:'2.0.2',
                            request:'GetRecordById',
                            id:uuid,
                            elementsetname:'full',
                            outputSchema:'http://www.isotc211.org/2005/gmd'
                            };

// HTTP GET (ISO 19139):
// https://maps.canada.ca/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetRecordById&id=87b08750-4180-4d31-9414-a9470eba9b42&elementsetname=full&outputSchema=http://www.isotc211.org/2005/gmd

/* request({url:cswUrl, qs:qsGetRecordsById19139}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); 
});
 */


 //THIS IS GOLD
 // reference1.mapinfo.com/software/spectrum/lim/8_0/services/Spatial/source/Services/csw/postget/postgetgetrecords.html

 const qsGetRecords= {  Request:'GetRecords',
                        service:'CSW',
                        resultType:'results',
                        version:'2.0.2',
                        maxRecords:'2',
                        startPosition:'1',
                        typeNames:'gmd:MD_Metadata',
                        ElementSetName:'full',
                        outputSchema:'http://www.opengis.net/cat/csw/2.0.2',
                        outputFormat:'application/xml',
                        CONSTRAINTLANGUAGE:'Filter',
                        Constraint:'<Filter><PropertyIsEqualTo><PropertyName>Title</PropertyName><Literal>Railway</Literal></PropertyIsEqualTo></Filter>',
                        constraint_language_version:'1.1.0'
                    };

/* request({url:cswUrl, qs:qsGetRecords}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); 
}); */
