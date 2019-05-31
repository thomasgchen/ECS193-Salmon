const jsreport = require('jsreport');

jsreport
  .render('<h1>Hello world</h1>')
  .then(out => {
    console.log(out);
    // out.stream.pipe(res);
  })
  .catch(e => {
    console.error(e);
  });
