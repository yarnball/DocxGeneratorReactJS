import React from 'react'
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'

import tester from './tester.docx'


class App extends React.Component {
  state = {
      test:''
  };
  loadFile(url, callback) {
        console.log('lo', url)
        window.JSZipUtils.getBinaryContent(url, callback);
      }
  render() {
    this.loadFile(tester, function (error, content) {
      console.log('run!')
      if (error) { throw error };
      var zip = new JSZip(content);
      var doc = new Docxtemplater().loadZip(zip)
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
        console.log(JSON.stringify({ error: e }));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
      }

      var out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }) //Output the document using Data-URI
      window.saveAs(out, "output.docx")
    })

    return (
      <div>
      This is a test
      </div>
    );
  }
}

export default App;
