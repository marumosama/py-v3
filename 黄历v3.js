import plugin from '../../lib/plugins/plugin.js'
import { segment } from "oicq";
import fetch from 'node-fetch'
import cfg from '../../lib/config/config.js'
import {createRequire} from "module";
import fs from "fs";
import { exec } from "child_process";
import schedule from "node-schedule";

const require = createRequire(import.meta.url);
const _path = process.cwd();
let NICKNAME="可莉";  //机器人名字
export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '黄历',
      /** 功能描述 */
      dsc: '简单开发示例',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^.*(在哪|在哪里|哪有|哪里有)|(在哪里菜单)$',
          /** 执行方法 */
          fnc: 'cailiao'
        },
        {
          /** 命令正则匹配 */
          reg: '^求签$',
          /** 执行方法 */
          fnc: 'qiuqian'
        },
        {
          /** 命令正则匹配 */
          reg: '^解签$',
          /** 执行方法 */
          fnc: 'jieqian'
        },
        {
          /** 命令正则匹配 */
          reg: '^人生重来$',
          /** 执行方法 */
          fnc: 'life'
        },
        {
          /** 命令正则匹配 */
          reg: '^黄历$',
          /** 执行方法 */
          fnc: 'huangli'
        },
        {
          /** 命令正则匹配 */
          reg: '^#清理签文$',
          /** 执行方法 */
          fnc: 'qingli'
        },
        {
          /** 命令正则匹配 */
          reg: '^签到$',
          /** 执行方法 */
          fnc: 'sign'
        },
        
      ]
    })
  }

 
  async cailiao (e) {
   
    let msg1 =e.msg.replace(/#|在|哪|里|有|\;|cat|tac| |[0-9]|\\$|\*|>|more|less|net|head|sort|tail|sed|cut|awk|strings|od|curl|\`|\\%|\\&|\||/g, "");
  let n= msg1.match('渊下宫')?7:msg1.match('层岩')?9:(msg1.match('海岛')||msg1.match('金苹果'))?12:2;
  let msg2=(n==7)?msg1.replace(/渊下宫/,''):(n==12)?(msg1.replace(/海岛/,'').replace(/金苹果/,'')):msg1.replace(/层岩/,'')
  if (e.msg.match('菜单')) msg2='菜单';
  let command = "python ./plugins/example/py/py/qrps.py "+msg2+' '+n;
  var exec = require('child_process').exec;
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }else{
      if (stdout.trim()=="error"){
        return false;
           
      }else{
     let msg = [
          stdout,
          segment.image(`file:///${_path}/plugins/example/py/resrouces/cailiaodian/${msg2}.jpg`),
          ];
        e.reply(msg)
        return true;    
      
      }}
  })
  }
  
async huangli(e){
    let command = "python ./plugins/example/py/py/almanac.py";
  var exec = require('child_process').exec;
  //e.group.fs.upload(`${_path}/data/data.rar`)
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }else{

      let msg = [
        segment.image(`file:///${_path}/plugins/example/py/resrouces/qianwen/黄历.png`),
        ];
      e.reply(msg)
      return true;
    }
  })
    
}

async  qiuqian(e){
    let command = " python ./plugins/example/py/py/draw_lots.py "+e.user_id;
  var exec = require('child_process').exec;
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }else{
      let msg = [
        segment.image(`file:///${_path}/plugins/example/py/resrouces/qianwen/${e.user_id}.png`),
        ];
      e.reply(msg)
      return true;
    }
  })
}

async jieqian(e){
    let command = "python ./plugins/example/py/py/draw_lots.py "+e.user_id;
  const exec = require('child_process').exec;
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }else{
      if (stdout){
        let msg = [
          segment.image(`file:///${_path}/plugins/example/py/resrouces/qianwen/${e.user_id}.png`),
          ];
        e.reply(msg)
        return true;
      }else{
        let msg = [
          segment.image(`file:///${_path}/plugins/example/py/resrouces/jieqian/${e.user_id}.png`),
          ];
        e.reply(msg)
        return true;
      }      
    }
  })
}

async life(e){
    let msg1 =e.nickname.replace(/#|\;|cat|tac| |\\$|\*|>|more|less|net|head|sort|tail|sed|cut|awk|strings|od|curl|\`|\\%|\\&|\||分配|/g, "");
  let command = "python ./plugins/example/py/py/lifeRestart/liferestart.py "+msg1+' '+e.user_id;
  //var exec = require('child_process').exec;
  //e.group.fs.upload(`${_path}/plugins/python-plugin/resrouces/123.py`)
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }else{
      let msg = [
        segment.image(`file:///${_path}/plugins/example/py/resrouces/life/${e.user_id}.png`),
        ];
      e.reply(msg)
      return false;
    }
  })
}

async qingli(e){
    
    if (!e.isMaster) {
        e.reply('只有主人才能命令我')
    return true;
  }
  let command = "python ./plugins/example/py/py/clearpic.py";
  var exec = require('child_process').exec;
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }else{
      e.reply("清理成功！")
      return true;
    }
  })
    
}


async sign(e){
    let msg1 =e.nickname.replace(/#|\;|cat|tac| |\\$|\*|>|more|less|net|head|sort|tail|sed|cut|awk|strings|od|curl|\`|\\%|\\&|\||/g, "");
  let command = "python ./plugins/example/py/py/sign/sign.py "+msg1+' '+e.user_id+' '+NICKNAME;
  var exec = require('child_process').exec;
  //e.group.fs.upload(`${_path}/plugins/python-plugin/resrouces/123.py`)
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }else{
      if (stdout.trim()=='error'){
      let msg="输入错误"
      e.reply("输入错误")
    }else{
      let msg = [
        segment.image(`file:///${_path}/plugins/example/py/resrouces/today_card/${e.user_id}.png`),
        ];
      e.reply(msg)
    }}
  })
  return false;
}
 
 
}


schedule.scheduleJob("0 59 23 * * ?",async ()=>{         //零点自动清理文件
  let command = "python ./plugins/example/py/py/clearpic.py";
  var exec = require('child_process').exec;
  var ls = exec(command, function (error, stdout, stderr){
    if (error) {
      console.log("失败！\nError code: "+error.code+"\n"+error.stack);
    }})

});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


schedule.scheduleJob("0 0 8 * * ?",async ()=>{    //早报
  let Whitelist=[258623209]  //要早报的群
  let url = "https://api.03c3.cn/zb/"
  let msg =[segment.image(url)]
  
  for(let key of Whitelist){
      
  
   await Bot.pickGroup(key * 1).sendMsg(msg);

   await sleep(10000);
  }
})
