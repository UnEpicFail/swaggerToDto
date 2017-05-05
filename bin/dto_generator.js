#!/usr/bin/env node
 
const Path = require('../lib/path');
const Generator = require('../lib/generator');
const fs = require('fs');

if (process.argv.length === 2) {
    console.log(`
        -h for help
    `)
    return;
}


let path = '';
let output = '';
let namespace = '';
let template = '';

process.argv.forEach(function(val, index) {
        if(val === '-h'){
            console.log(`
                -p <path_to_swagger.yaml>
                -o <path_to_resut_output>
                -n <namespace>
                -t <path_to_template>
            `);
        } else if (val === '-p') {
            if (process.argv[index+1] !== '-o' && process.argv[index+1] !== '-n' && process.argv[index+1] !== '-t') {
                path = process.argv[index+1];
            }
        } else if (val === '-o') {
            if (process.argv[index+1] !== '-p' && process.argv[index+1] !== '-n' && process.argv[index+1] !== '-t') {
                output = process.argv[index+1];
            }
        } else if (val === '-n') {
            if (process.argv[index+1] !== '-p' && process.argv[index+1] !== '-o' && process.argv[index+1] !== '-t') {
                namespace = process.argv[index+1];
            }
        } else if (val === '-t') {
            if (process.argv[index+1] !== '-p' && process.argv[index+1] !== '-o' && process.argv[index+1] !== '-n') {
                template = process.argv[index+1];
            }
        }
}, this);

console.log(`
from '` + path + `'
to '` + output + `'
namespace '` + namespace + `'
template '` + template + `'
`)

if (path.split('.').length === 1) {
    
    fs.readdir(path, function(err, files) {
        if(err){
            console.error('Error: '+path+' not a file and not a exist directory\n\r'+err)
            return false;
        }

        for(let i in files){
            if (files[i].split('.').pop().toLowerCase() !== 'yml' && files[i].split('.').pop().toLowerCase() !== 'yaml')
                return

            let _path = path+'/'+files[i]
            let json = Path.getJSON(_path)

            if (!json) {
                return;
            } 

            Generator.generate(_path.split('/').pop().split('.')[0],json, output, namespace, template)   
        }
    })
} else {
    let json = Path.getJSON(path)

    if (!json) {
        return;
    } 

    Generator.generate(path.split('/').pop().split('.')[0],json, output, namespace, template)
}


