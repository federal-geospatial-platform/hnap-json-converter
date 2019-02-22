const fs = require('fs');
const Jsonix = require('jsonix').Jsonix;

const UUIDs = require('./uuids');
//console.log(JSON.stringify(uuids));


const GCO = require('ogc-schemas').ISO19139_GCO_20070417;
const GMD = require('ogc-schemas').ISO19139_GMD_20070417;
const GMX = require('ogc-schemas').ISO19139_GMX_20070417;
const GSR = require('ogc-schemas').ISO19139_GSR_20070417;
const GSS = require('ogc-schemas').ISO19139_GSS_20070417;
const GTS = require('ogc-schemas').ISO19139_GTS_20070417;
const GML_3_2_1 = require('ogc-schemas').GML_3_2_1;
const XLink = require('w3c-schemas').XLink_1_0;

const context =  new Jsonix.Context([XLink, GML_3_2_1, GMD, GMX, GSR, GSS, GTS, GCO, ]);
const unmarshaller = context.createUnmarshaller();

//let url ='https://maps.canada.ca/geonetwork/srv/eng/metadata.download.xml?uuid=87b08750-4180-4d31-9414-a9470eba9b42'
//let uuid ='4eb3e825-5b0f-45a3-8b8b-355188d24b71'
const urlQuery ='https://maps.canada.ca/geonetwork/srv/eng/metadata.download.xml?uuid='

let uuids = UUIDs.uuids;

for (var i = 0, len = uuids.length; i < len; i++) {

    let uuid = uuids[i];
    console.log(uuid);

    let url = urlQuery + uuid;
    let outFileName = 'JSON/' + uuid + '.json'

    //unmarshaller.unmarshalFile('hnap.xml',
    unmarshaller.unmarshalURL(url,    
        function (unmarshalled) {
            
            fs.writeFile(outFileName, JSON.stringify(unmarshalled), (err) => {
                if (err) throw err;
                console.log('Saved: ' + uuid);
            });
        }
    );
}

