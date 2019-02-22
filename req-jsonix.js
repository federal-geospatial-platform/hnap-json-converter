const fs = require('fs');
const Jsonix = require('jsonix').Jsonix;
const request = require('request');

const uuids = require('./uuids').uuids;

const GCO = require('ogc-schemas').ISO19139_GCO_20070417;
const GMD = require('ogc-schemas').ISO19139_GMD_20070417;
const GMX = require('ogc-schemas').ISO19139_GMX_20070417;
const GSR = require('ogc-schemas').ISO19139_GSR_20070417;
const GSS = require('ogc-schemas').ISO19139_GSS_20070417;
const GTS = require('ogc-schemas').ISO19139_GTS_20070417;
const GML = require('ogc-schemas').GML_3_2_1;
const XLink = require('w3c-schemas').XLink_1_0;

const context =  new Jsonix.Context([XLink, GML, GMD, GMX, GSR, GSS, GTS, GCO, ]);
const unmarshaller = context.createUnmarshaller();

const urlQuery ='https://maps.canada.ca/geonetwork/srv/eng/metadata.download.xml?uuid='

for (var i = 0, len = uuids.length; i < len; i++) {

    let uuid = uuids[i];
    
    let url = urlQuery + uuid;
    let outFileName = 'JSON/' + uuid + '.json'

    //let tempFile = 'tempXML/' + uuid + '.xml';
    //let tempFileStream = fs.createWriteStream(tempFile);
    let errorFlag = false;

    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.

        if (!error && body){
            let json = unmarshaller.unmarshalString(body);
            //console.log(JSON.stringify(objectFromXMLString));
            let jsonString = JSON.stringify(json);
            fs.writeFileSync(outFileName, jsonString);
        }
    });
    /* request(url)
    .on('response', function(response){
        console.log('Status: ' + response.statusCode + ' : ' + uuid);        
    })
    .on('error', function(err) {
        console.log(err)
    })
    .pipe(
        tempFileStream
    ); */
}

for (var i = 0, len = uuids.length; i < len; i++) {

    let uuid = uuids[i];
    
    let tempFile = 'tempXML/' + uuid + '.xml';
    let outFileName = 'JSON/' + uuid + '.json';

    /* fs.watch('tempXML', (eventType, filename) => {
        console.log(`event type is: ${eventType}`);
        if (filename) {
            console.log(`filename provided: ${filename}`);
        } else {
            console.log('filename not provided');
        }
    }); */

    /* fs.access(tempFile, fs.F_OK, (err) => {
        if (err) {
          console.error(err)
          console.log("XML no: " + tempFile)
          return
        }
        console.log("XML yes: " + tempFile)
    }); */

    /* unmarshaller.unmarshalFile(tempFile,
        function (unmarshalled) {
            fs.writeFile(outFileName, JSON.stringify(unmarshalled), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
    ); */
}



