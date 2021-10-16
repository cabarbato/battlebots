const path = require('path');
const express = require('express');
const { spawn } = require('child_process');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   /* const year = new Date().getFullYear(),
      python = spawn('python', ['server/main.py', toString(year)]);

   python.stdout.on('data', function (d) {
      console.log(`Begin data collection for year ${year}`);
   });

   python.on('close', (d) => {
      console.log(`finished data collection: ${d}`);
   }); */
});