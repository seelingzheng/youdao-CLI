const Table = require('cli-table2');//表格输出
const superagent = require('superagent');//http 请求

const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=seelingzheng2017&key=1810990891&type=data&doctype=json&version=1.1'
 function getValue (word) {
    superagent.get(API)
        .query({ q: word })
        .end(function (err, res) {
            if (err) {
                console.log('something wrong,try again');
                return false;
            }
            let data = JSON.parse(res.text);
            let result = {}
            if(data.basic){
                result[word]=data['basic']['explains'];
            }else if(data.translation){
                result[word]=data['translation']
            }else{
                console.log('error');
            }
            let table = new Table();
            table.push(result);
            console.log(table.toString());
        })

}

module.exports =getValue;
//getValue('love');