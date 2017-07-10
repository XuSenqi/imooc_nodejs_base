var stream = require('stream')
var util = require('util')

function ReadStream(){
    stream.Readable.call(this)  //ReadStreamc:  call是基于对象继承，可以获取对象方法

}

util.inherits(ReadStream, stream.Readable)  //ReadStream继承了 stream.Readable的原型函数

//通过以上两步，ReadStream成了新的stream.Readable

ReadStream.prototype._read = function(){
    this.push('I ')
    this.push('Love ')
    this.push('Imooc\n ')
    this.push(null)
}

function WriteStream(){
    stream.Writable.call(this)
    this._cached = new Buffer('')
}

util.inherits(WriteStream, stream.Writable)

WriteStream.prototype._write = function(chunk, encode, cb){  //function里面再有cb()是什么意思？
    console.log(chunk.toString())
    cb()
}

function TransformStream(){
    stream.Transform.call(this)
}

util.inherits(TransformStream, stream.Transform)

TransformStream.prototype._transform = function(chunk, encode, cb){
    this.push(chunk)
    cb()
}

TransformStream.prototype._flush = function(cb){
    this.push('Oh Yeah!')
    cb()
}

var rs = new ReadStream()
var ws = new WriteStream()
var ts = new TransformStream()

rs.pipe(ts).pipe(ws)
