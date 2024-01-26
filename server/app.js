const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/data', (req, res) => {
    const fileName = req.query.n;
    const lineNumber = req.query.m;

    if (!fileName) {
        return res.status(400).send('Missing "n" parameter');
    }

    const filePath = `./temp/data/${fileName}.txt`;

    if (lineNumber) {
        const lineContent = readSpecificLine(filePath, lineNumber);
        res.send(lineContent);
    } else {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        res.send(fileContent);
    }
});

function readSpecificLine(filePath, lineNumber) {
    const fileContent = fs.readFileSync(filePath, 'utf-8').split('\n');
    return fileContent[lineNumber - 1] || 'Line not found';
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
