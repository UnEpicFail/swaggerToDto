const fs = require('fs');
const mkdirp = require('mkdirp');
const mustache = require('mustache');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelize(str) {
    let _str = str.split('_')
    for (let i in _str){
        _str[i]=capitalizeFirstLetter(_str[i])
    }
    return _str.join('')
}

function getExtends(allOf, data, namespace) {
    
    
    for (let i in allOf){
        for (let j in allOf[i]) {
            if (allOf[i].hasOwnProperty(j)){
                if (j === '$ref') {
                    let ref = allOf[i][j].split('#')
                    if (ref[0].length > 0) {
                        data.extends = namespace + '\\' + capitalizeFirstLetter(ref[0].split('.')[0]) + '\\' + ref[1].split('/').pop()
                    } else {
                        data.extends = ref[1].split('/').pop()
                    }
                } else {
                    data.description = allOf[i].description
                    data.properties = getProperties(allOf[i].properties, namespace)
                    break;
                }
            }
        } 
    }
    return data
}

function getTypeFromPropertie(propertie, namespace) {
    if (propertie['$ref']) {
        let ref = propertie['$ref'].split('#')
        if (ref[0].length > 0) {
            return namespace + '\\' + capitalizeFirstLetter(ref[0].split('.')[0]) + '\\' + ref[1].split('/').pop()
        } else {
            return ref[1].split('/').pop()
        }
    } else {
        return (propertie.format || propertie.type)
    }
}

function getProperties(properties, namespace) {
    let p = []
    for (let i in properties) {
        p.push({
            name: i,
            camelCase: camelize(i),
            type: getTypeFromPropertie(properties[i], namespace),
            description: properties[i].description
        })
    }
    return p
}

function templating (fileName, definitionName, definition, output, namespace, tpl) {

    let data = {
        namespace: namespace + '\\' + fileName, 
        definitionName: definitionName
    }

    if(definition.allOf) {
        data = getExtends(definition.allOf, data, '\\' + namespace)
    } else {
        data.description = definition.description
        data.properties = getProperties(definition.properties, '\\' + namespace)
    }
    
     fs.writeFile(output +'/'+definitionName+'.php', mustache.render(tpl, {data:data}), { flag: 'w' }, function(res){
        console.log('File write '+output +'/'+definitionName+'.php');
    })
}

function generate (fileName, json, output, namespace, template) {
    let definitions = json.definitions;
    let _fileName = capitalizeFirstLetter(fileName)
    let _output = output + '/' + _fileName;

    if (!definitions) {
        console.error('Error: No definitions!');
        return false;
    }
    let installedfolder = __dirname.split('/')
    installedfolder.pop()
    let tpl = fs.readFileSync((template || installedfolder.join('/')+'/tpl/dto.tpl'), 'utf8')
    
    mkdirp(_output, function(){
        for (let i in definitions){
            templating(_fileName, i, definitions[i], _output, namespace, tpl)
        }
    })


}

module.exports.generate = generate;