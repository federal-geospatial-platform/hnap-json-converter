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

const extract = require('./extract.js').extract;

const urlQuery ='https://maps.canada.ca/geonetwork/srv/eng/metadata.download.xml?uuid='

for (var i = 0, len = uuids.length; i < len; i++) {
//for (var i = 0, len = uuids.length; i < 1; i++) {

    let uuid = uuids[i];
    
    let url = urlQuery + uuid;
    let outFileName = 'JSON/' + uuid + '.json'

    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode + ' for UUID: ' + uuid); // Print the response status code if a response was received

        if (response && response.statusCode != '200'){
            console.log('Can not unmarshall: ' + uuid);
            console.log('Status code received: ' + response.statusCode);
        }

        if (!error && response && response.statusCode == '200' && body){
            
            let json;

            try {
                json = unmarshaller.unmarshalString(body);
                let extracted = extract(json);
                //fs.writeFileSync(outFileName, JSON.stringify(json));
                fs.writeFileSync(outFileName, JSON.stringify(extracted));
            } catch (error) {
                console.log("Unmarshal failed : error: " + error);
                console.log("Unmarshal failed : uuid: " + uuid);
            }
        } else {
            if (response && response.statusCode != '200'){
                console.log('Can not unmarshall: ' + uuid);
                console.log('Status code received: ' + response.statusCode);
            }
            if (!body){
                console.log('Empty body in response for UUID: ' + uuid);
            }
        }
    });
}





