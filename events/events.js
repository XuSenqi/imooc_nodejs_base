var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();
//addListener事件绑定一般不要超过10个，以免造成内存泄漏
life.on('求安慰',function(who){
	console.log('给'+who+'做饭');
});
life.on('求安慰',function(who){
	console.log('给'+who+'洗衣服');
});
life.on('求安慰',function(who){
	console.log('给'+who+'搓背');
});
life.on('求安慰',function(who){
	console.log('给'+who+'揉肩');
});
life.on('求安慰',function(who){
	console.log('给'+who+'捶腿');
});
life.on('求溺爱',function(who){
	console.log('陪'+who+'逛街');
});
life.on('求溺爱',function(who){
	console.log('陪'+who+'旅游');
});
//有名函数的绑定与监听事件的移除
function water(who){
	console.log('给'+who+'倒水');
}
life.on('求安慰',water);
//life.removeListener('求安慰',water);//移除
//移除所有的监听事件
//life.removeAllListeners();
//移除某个动作的监听事件
//life.removeAllListeners('求安慰');
//打出'求安慰'的所有监听事件
console.log("life.listeners('求安慰'):", life.listeners('求安慰'));
console.log("life.listeners('求安慰').length:", life.listeners('求安慰').length);
console.log("EventEmitter.listenerCount(life,'求安慰'):", EventEmitter.listenerCount(life,'求安慰'));

////不传参数结果为0
console.log(life.listeners().length);
var hasConfortListener = life.emit('求安慰','老公');
//var hasLovedListener = life.emit('求溺爱','老婆');
//var hasPlayedListener = life.emit('求玩坏','男人和女人');
////触发事件，是否有监听事件（返回值判断）
console.log(hasConfortListener);
//console.log(hasLovedListener);
//console.log(hasPlayedListener);
