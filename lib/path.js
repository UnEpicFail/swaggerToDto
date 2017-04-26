const fs = require('fs');
const js_yaml = require('js-yaml');

function getJSON(path) {
    if(path.length === 0 && path[0] !== ' ') {
        console.error("Error: Invalid path! => '"+ path +"'");
        return false;
    }

    try {
        let file = fs.readFileSync(path, 'utf8');
        if(!file){
            console.error('Error: Readed file not valid');
            return;
        }

        try {
            let pars = js_yaml.safeLoad(file);
            console.log('File '+ path +' parsed successfully\n\r')
            return pars;
        } catch(e) {
            console.error("Error: Exeption when try parse yaml to JSON")
        }
        
    } catch (e) {
        console.error("Error: Exeption when try to read file '"+ path +"', \n\r"+e);
        return false;
    }
    

}

module.exports.getJSON = getJSON;