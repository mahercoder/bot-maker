// const fs = require('fs')
// const path = require('path')

// /**
//  * Look ma, it's cp -R.
//  * @param {string} src  The path to the thing to copy.
//  * @param {string} dest The path to the new copy.
//  */
//  let copyDirSync = function(src, dest) {
//      let exists = fs.existsSync(src);
//      let stats = exists && fs.statSync(src);
//      let isDirectory = exists && stats.isDirectory();
//      if (isDirectory) {
//        fs.mkdirSync(dest);
//        fs.readdirSync(src).forEach(function(childItemName) {
//         copyDirSync(path.join(src, childItemName),
//                            path.join(dest, childItemName));
//        });
//      } else {
//        fs.copyFileSync(src, dest);
//      }
// }

// module.exports = {
//      copyDirSync
// }

let fs = require('fs');
let path = require('path');

function copyFileSync( source, target ) {

    let targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderSync( source, target ) {
    let files = [];

    // Check if folder needs to be created or integrated
    let targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            let curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

module.exports = {
  copyFolderSync
}