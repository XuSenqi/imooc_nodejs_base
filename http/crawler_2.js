var http = require('http')
var cheerio = require('cheerio')

var url = 'http://www.imooc.com/learn/348'

/****************************
打印得到的数据结构
[{
    chapterTitle:'',
    videos:[{
        title:'',
        id:''
    }]
}]
*****************************/

function printCourseInfo(courseData){
    //console.log( "courseData:", courseData );
    courseData.forEach(function(item){
        var chapterTitle=item.chapterTitle;
        console.log(chapterTitle+'\n');
        item.videos.forEach(function(video){
            console.log(' 【'+video.id+'】'+video.title+'\n');
        })
    });
}

function filterChapters( html ) {
    var $ = cheerio.load( html );
    var chapters = $('.chapter')

    var courseData = []
    chapters.each( function(item) {
        console.log( item );
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text().trim().split('\n')[0];
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }

        console.log( chapterTitle + '\n' );

        videos.each( function( item ) {
            var video = $(this).find('.J-media-item');
            //var videoTitle = video.text().trim().split('\n')[0];
            var videoTitle = video.text().split(/\s+/).slice(1,-2).join(' ');
            var id = video.attr('href').split('video/')[1]

            chapterData.videos.push( {
                title: videoTitle,
                id: id
            });
        })

        courseData.push( chapterData );
        //item.videos.forEach( function( video ) {
        //    console.log( '  【' + video.id + '】' + video.title + '\n' );
        //});
    })

    return courseData;
}

http.get( url, function(res) {
    var html = ''; 
    res.on('data', function(data) {
         html += data;
    });
    
    res.on('end', function() {
        //console.log( html )
        var courseData = filterChapters( html );
    
        console.log( courseData );
        printCourseInfo(courseData);

    });
}).on( 'error', function() {
    console.log('获取课程数据出错！')
})
