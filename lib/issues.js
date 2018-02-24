var front = require('hexo-front-matter');
var fs = require('hexo-fs');

let logic = function(data){
    var matters = front.parse(data.raw);
    console.log(matters)
    return data;
};

module.exports = logic;