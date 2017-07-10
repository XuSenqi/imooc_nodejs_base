var fs = require('fs')

var readStream = fs.createReadStream('1.mp4')
var writeStream = fs.createWriteStream('1-stream.mp4')

readStream.on('data',function(chunk) {
    if( writeStream.write(chunk) == false ) {
        readStream.pause()
        console.log('still cached')
    }
})

readStream.on('end', function() {
    console.log( 'end' )
    writeStream.end()
})

writeStream.on('drain', function() {
    console.log( 'data drains' )
    readStream.resume()
})
