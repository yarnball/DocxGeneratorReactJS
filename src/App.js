import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

//Load the docx file as a binary


class App extends Component {

  render() {
    var content = fs.readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

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

    var buf = doc.getZip()
                 .generate({type: 'nodebuffer'});

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
