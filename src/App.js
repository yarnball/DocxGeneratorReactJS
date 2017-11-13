import React, { Component } from 'react';
import tester from './tester.docx';
import './App.css';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');



//Load the docx file as a binary


class App extends Component {

  render() {
  function loadFile(url,callback){
    console.log('lo', url)
          window.JSZipUtils.getBinaryContent(url,callback);
      }
      loadFile(tester,function(error,content){
          if (error) { throw error };
          var zip = new JSZip(content);
          var doc=new Docxtemplater().loadZip(zip)
          doc.setData({
              first_name: 'John',
              last_name: 'Doe',
              phone: '0652455478',
              description: 'New Website'
          });

          try {
              // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
              doc.render()
          }
          catch (error) {
              var e = {
                  message: error.message,
                  name: error.name,
                  stack: error.stack,
                  properties: error.properties,
              }
              console.log(JSON.stringify({error: e}));
              // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
              throw error;
          }

          var out=doc.getZip().generate({
              type:"blob",
              mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          }) //Output the document using Data-URI
          window.saveAs(out,"output.docx")
      })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
