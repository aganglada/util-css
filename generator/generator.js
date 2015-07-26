var fs = require('fs'),
    _ = require('lodash'),
    jsonFilesPath = __dirname + '/files',
    cssFilesPath = __dirname + '/../src',
    files = fs.readdirSync(jsonFilesPath);

files.forEach(generate);

function generate(file) {
    var obj, property, styles, cssFilePath;

    styles = '';
    obj = JSON.parse(fs.readFileSync(jsonFilesPath + '/' + file, 'utf8'));
    property = Object.keys(obj)[0];
    cssFilePath = cssFilesPath + '/' + property + '.css';

    _.forEach(obj[property], function(value, key) {
        styles += '.u-' + key + ' {\n\t' + property + ': ' + value + ';\n}\n\n';
    });

    fs.open(cssFilePath, 'w', function(error) {
        if (error) throw 'error opening file: ' + error;
        fs.writeFile(cssFilePath, styles, function(error) {
            if (error) throw 'write error:  ' + error.message;
            console.log('Successful Write to ' + cssFilePath);
        });
    });
}