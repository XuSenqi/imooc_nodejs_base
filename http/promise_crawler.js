var http = require('http')
var cheerio = require('cheerio')
var Promise = require('bluebird')
var url = 'http://www.imooc.com/learn/348'
var baseUrl = 'http://www.imooc.com/learn/'
//var videoIds = [ 348, 728, 637, 259, 197, 134, 75 ]
var videoIds = [ 348, 728]

function printCourseInfo(coursesData){
    //console.log( "courseData:", courseData );
    coursesData.forEach(function(courseData){
        console.log( "### " + courseData.title + '    ' + courseData.number + "人学过" + '\n' );

        courseData.videos.forEach( function( courseData ) {
            var chapterTitle=courseData.chapterTitle;
            console.log(chapterTitle+'\n');
            courseData.videos.forEach(function(video){
                console.log(' 【'+video.id+'】'+video.title+'\n');
            })
        })

    });
}

function filterChapters( html ) {
    var $ = cheerio.load( html );
    var chapters = $('.chapter')
    var title = $('title').text().trim();
    //var title = $('h2.l').text()


    //var number = $('span.meta-value js-learn-num').text()
    //var number = $($('span.meta')[0]).text()
    var number = $($('span.static-item l')[0]).text()
    console.log( "number:", number );
    // courseData = {
    //     title: title,
    //     number: number,
    //     videos: [{
    //         chapterTitle: '',
    //         videos: [
    //             title: '',
    //             id: ''
    //         ]
    //     }]
    // }
    
    var courseData = {
        title: title,
        videos: [],
        number: number
    }

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

        courseData.videos.push( chapterData );
        //item.videos.forEach( function( video ) {
        //    console.log( '  【' + video.id + '】' + video.title + '\n' );
        //});
    })

    return courseData;
}

function getPageAsync(url) {
    return new Promise( function( resolve, reject ) {
        console.log('正在爬取' + url );
        http.get( url, function(res) {
            var html = ''; 

            res.on('data', function(data) {
                 html += data;
            });
            
            res.on('end', function() {
                resolve( html )
                //var courseData = filterChapters( html );
            
                //console.log( courseData );
                //printCourseInfo(courseData);
            });
        }).on( 'error', function(e) {
            reject( e );
            console.log('获取课程数据出错！')
        })
    })
}

var fetchCourseArray = []

videoIds.forEach( function( id ) {
    fetchCourseArray.push( getPageAsync( baseUrl + id ) )
})

Promise
    .all( fetchCourseArray ) 
    .then( function( pages ) {
        var coursesData = [];
        pages.forEach( function( html ) {
            var courses = filterChapters( html )
            coursesData.push ( courses )
        })

        coursesData.sort( function( a, b ) {
            return a.number < b.number
        })

        printCourseInfo( coursesData )
    })
