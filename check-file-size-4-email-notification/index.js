'use strict';
let AWS, s3, Rx, AdmZip, bucket, file_key, file_size, slashidx, supplierID, params, zip, zipEntries, source, results;

AWS = require('aws-sdk');
s3 = new AWS.S3({apiVersion: '2006-03-01'});
Rx =  require('rx');
AdmZip = require('adm-zip');

exports.handler = (event, context, callback) => {
  console.log('\nNode:' + JSON.stringify(process.versions));
  console.log('\nReceived event:', JSON.stringify(event, null, 2));

  bucket = event.Records[0].s3.bucket.name;
  file_key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  file_size = event.Records[0].s3.object.size;
  console.log("\nFetching from " + bucket + "S3 bucket");
  console.log("\nFile to unzip is " + file_key);
  console.log("\nFile size is " + file_size);
  
  slashidx = file_key.indexOf('/');
  supplierID = file_key.slice(0,slashidx);

  // Checking file size
  if(file_size > 16500000) {
    let error = new Error("\nFile could not be unzipped due to file size");
    callback(error);
  }
  
  params = { Bucket: bucket, Key: file_key };
  s3.getObject(params, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      if (!data) callback(null, 'No Data!');
      zip = new AdmZip(data.Body);
      zipEntries = zip.getEntries(); // ZipEntry objects
      source = Rx.Observable.from(zipEntries);
      results = [];

      source.subscribe(
        (zipEntry) => {
          params = {
            Bucket  : bucket,
            Key     : supplierID + '/' + zipEntry.name,
            Body    : zipEntry.getData() // decompressed file as buffer
          };
          // upload decompressed file
          s3.putObject(params, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else results.push(data, "successful");// successful response
          });
        },
        (err) => {
          callback(err, null);
        }
      );
    }
  });
};