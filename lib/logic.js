var request = require('request')
var front = require('hexo-front-matter');
var fs = require('hexo-fs');

function initIssues(item, config)
{
    //定义创建issue需要的参数
    var formData = 
    {
        title: item.title,
        labels: ['Gitalk','Gitment',String(item.abbrlink)],
        body : item.permalink
    }

    //定义HTTP请求头部
    var header = 
    {
        'Accept': 'application/vnd.github.symmetra-preview+json, application/vnd.github.html+json;charset=UTF-8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Host': 'api.github.com',
        'Origin': 'https://qinyuanpei.github.io/',
        'Referer': 'https://qinyuanpei.github.io/posts/' + item.abbrlink,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0',
        'Authorization': 'token ' + config.token
    }

    //定义请求的URL
    var baseURL = 'https://api.github.com'
    var reqURL = baseURL + '/repos/' + config.owner + '/' + config.repo + '/issues'

    //请求API
    request.post({
        url: reqURL,
        encoding: 'utf-8',
        gzip: true, //启用GZip解压否则会出现乱码情况
        headers: header,
        body: JSON.stringify(formData)
    },function(error,response,data)
    {
        console.log(error)
        if(error) return null;
        console.info(data)
        if(response.statusCode != 201) return null;

        return JSON.parse(data)
    });
}

let logic = function(item,config){
    var issueId = item.issseId;
    if(typeof(issueId) == 'undefined'){
        var data = initIssues(item,config);
        console.info(data == null)
        //allTexts = item.raw.split('\n');
        //allTexts.splice(2,0,'issueId: ' + data.id);
        //fs.writeFileSync('E:\temp\1.md', allTexts.join('\n'), 'utf-8');
        //console.log('Generated issueId [] for post []')
    }
    
    return item;
};

module.exports = logic;