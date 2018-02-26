var request = require('request')
var front = require('hexo-front-matter');
var fs = require('hexo-fs');

function initIssues(item, config)
{
    //定义创建issue需要的参数
    var formData = 
    {
        title: item.title,
        labels: ['Gitalk',String(item.abbrlink)],
        body : item.permalink
    }

    //定义HTTP请求头部
    var header = 
    {
        'Accept': 'application/vnd.github.symmetra-preview+json, application/vnd.github.html+json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Host': 'api.github.com',
        //'Origin': 'https://qinyuanpei.github.io/',
        //'Referer': 'https://qinyuanpei.github.io/posts/' + data.abbrlink,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0',
        'Authorization': 'token ' + config.token
    }

    //定义请求的URL
    var baseURL = 'https://api.github.com'
    var reqURL = baseURL + '/repos/' + config.owner + '/' + config.repo + '/issues'

    //请求API
    request.post({
        url: reqURL,
        headers: header,
        timeout: 3000,
        body: JSON.stringify(formData)
    },function(error,response,data)
    {

        if(!error)
        {
            console.log(response.body)
            console.log(data)
            return JSON.parse(data)
        }

    });
}
    
let logic = function(item,config){
    //initIssues(data,config)
    var issueId = initIssues(item,config)
    console.log(issueId)
    if(typeof(issseId) == 'undefined'){

    }else if(typeof(issseId) != 'undefined'){

    }
    // allTexts = data.raw.split('\n')
    // allTexts.splice(2,0,'issueId: ' + '测试ID')
    // fs.writeFileSync(data.full_source, allTexts.join('\n'), 'utf-8');
    return item;
};

module.exports = logic;