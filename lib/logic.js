var request = require('request')
var front = require('hexo-front-matter');
var fs = require('hexo-fs');

    function initIssues(title)
   {
        var opts = 
        {
            url: 'https://qpi.github.io/repos/qinyuanpei/BlogComments/issues',
            form: 
            {
                'title': title,
                'labels': ['gitment'],
                'body': title
            },
            headers:
            {
                'token': 'b76cfcbfbf87505eda071f17c909982a0eb8d815'
            }
        };

        request.post(opts,function(error,response,data)
        {
            if(error) console.log(error)
            console.log( JSON.stringify(response) );
        });
    }



let logic = function(data,config){
    initIssues(data.title)
    // allTexts = data.raw.split("\n")
    // allTexts.splice(2,0,'issueId: ' + '测试ID')
    // fs.writeFileSync(data.full_source, allTexts.join('\n'), 'utf-8');
    return data;
};

module.exports = logic;