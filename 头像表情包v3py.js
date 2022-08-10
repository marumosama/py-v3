import plugin from '../../lib/plugins/plugin.js'
import { segment } from "oicq";
import fetch from 'node-fetch'
import cfg from '../../lib/config/config.js'
import {createRequire} from "module";

const require = createRequire(import.meta.url);
const _path = process.cwd();

const keywordList = [
  "摸",
  "摸摸",
  "摸头",
  "摸摸头",
  "rua",
  "亲",
  "亲亲",
  "贴贴",
  "贴",
  "蹭",
  "蹭蹭",
  "顶",
  "玩",
  "拍",
  "撕",
  "丢",
  "扔",
  "抛",
  "掷",
  "爬",
  "给爷爬",
  "精神支柱",
  "一直",
  "加载中",
  "转",
  "小天使",
  "不要靠近",
  "一样",
  "滚",
  "玩游戏",
  "来玩游戏",
  "膜拜",
  "膜",
  "吃",
  "啃",
  "出警",
  "警察",
  "问问",
  "去问问",
  "舔屏",
  "舔",
  "prpr",
  "搓",
  "鲁迅说",
  "鲁迅说过",
  "国旗",
  "墙纸",
  "交个朋友",
  "继续干活",
  "完美",
  "完美的",
  "关注",
  "我朋友说",
  "我有个朋友说",
  "这像画吗",
  "震惊",
  "兑换券",
  "听音乐",
  "典中典",
  "哈哈镜",
  "永远爱你",
  "对称",
  "可达鸭",
  "王境泽",
  "为所欲为",
  "馋身子",
  "切格瓦斯",
  "谁反对",
  "曾小贤",
  "压力大爷",
  "五年怎么过的",
  "安全感",
  "永远喜欢",
  "我永远喜欢",
  "采访",
  "打拳",
  "群青",
  "捣",
  "捶",
  "需要",
  "你可能需要",
  "你好骚啊",
  "小画家",
  "结婚申请",
  "阿尼亚喜欢",
  "阿妮亚喜欢",
  "结婚登记",
  "捂脸",
  "敲",
  "喜报",
  "垃圾",
  "垃圾桶",
  "为什么at我",
  "像样的亲亲",
  "吸",
  "嗦",
  "紧贴",
];
//不需要@触发
const specialList = [
  "你好骚啊",
  "可达鸭",
  "王境泽",
  "为所欲为",
  "馋身子",
  "切格瓦斯",
  "喜报",
  "谁反对",
  "曾小贤",
  "压力大爷",
  "鲁迅说",
  "鲁迅说过",
  "五年怎么过的",
];



export class example extends plugin {
  constructor () {
    let rule = {
      reg: ".*",
      fnc: 'biaoQing'
    }
    super({
      /** 功能名称 */
      name: '头像表情包',
      /** 功能描述 */
      dsc: '简单开发示例',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 20000,
      rule: [rule,
        {
          /** 命令正则匹配 */
          reg: '表情帮助',
          /** 执行方法 */
          fnc: 'biaoQingHelp'
        }
      ]
    })
    Object.defineProperty(rule, 'log', {
      get: () => !!this.isbiaoQing
      })
  }
 
  
  async biaoQing (e) {
   
    if (!e.isGroup || !e.msg) {
      return false;
    }
    const atItem = e.message.filter((item) => item.type === "at");
  
    let isSpecial = keywordList.filter((item) => e.msg.includes(item) && item !== e.msg).length > 0;
  
    let key = '';
    let target='';
    let sex='abc';
    
    if (e.msg.match('自己'))target=e.user_id,key=e.msg.replace('自己','');
    if (atItem.length){
      target=atItem[0].qq,key=e.msg;
      let a=await Bot.pickUser(e.user_id).getSimpleInfo()
      sex=a.sex;}
    if (e.img)target=e.img[0],key=e.msg;
    if (e.hasReply) {
  
      let msg=(await e.group.getChatHistory(e.source.seq,1)).pop()
      for (var key3 of msg.message){
        if (key3.type=='image'){
          target=key3.url
          key=e.msg
          sex=msg.sender.nickname.replace(/#|\;|cat|tac| |\\$|\*|>|more|less|net|head|sort|tail|sed|cut|awk|strings|od|curl|\`|\\%|\\&|\||/g, "")+'，'+msg.sender.sex
          break;
        }
  
      }
    }
    
    if (!keywordList.includes(e.msg)&&!isSpecial)
      return false;
    if(!key){key=e.msg}
    for (var key2 of keywordList){
      if (key.includes(key2)){
        key=key.replace(key2,key2+'_')
      }
    }
    //console.log(key)
    if (!key.includes("_")){return false;}
    let keys=key.split("_")
    if (!keywordList.includes(keys[0])){return false;}
    if (!specialList.includes(keys[0])){
      if (!target){
        let msg_id =await e.group._getLastSeq()
        let msg=(await e.group.getChatHistory(msg_id,2))[0]
        //console.log(msg)
        for (var key4 of msg.message){
          if (key4.type=='image'){
            target=key4.url
            sex=msg.sender.nickname.replace(/#|\;|cat|tac| |\\$|\*|>|more|less|net|head|sort|tail|sed|cut|awk|strings|od|curl|\`|\\%|\\&|\||/g, "")+'，'+msg.sender.sex
            break;
          }     
        }
        
        if(!target){
          return false;
        }
      }    
    }
    key=keys[0]+'_'+keys.join(',').replace(keys[0],'').replace(",","")
    if(!key){
      key =e.msg.replace(/#|\;|cat|tac| |\\$|\*|>|more|less|net|head|sort|tail|sed|cut|awk|strings|od|curl|\`|\\%|\\&|\||/g, "");
    }
    if (!target){target=cfg.masterQQ[0]}
    if (key) {//+e.group_id+' '
      let command = "python ./plugins/example/py/py/petpet/petpet.py "+e.user_id+' '+target+' '+key+' '+sex;
      var exec = require('child_process').exec;
      var ls = exec(command, function (error, stdout, stderr){
      if (error) {
        console.log("失败！\nError code: "+error.code+"\n"+error.stack);
        return false;
      }else{
        if (stdout.trim()=="error"){
          return false;
        }else{
          let msg = [
            //stdout,
            segment.image(`file:///${_path}/plugins/example/py/resrouces/images/123.${stdout.trim()}`)];
          e.reply(msg)
          return true;
      }}
      
      });
      
       
  };
  }

  async biaoQingHelp(e){
    if (!e.isGroup) {
      return false;
    }
    let command = "python ./plugins/example/py/py/petpet/petpet.py help";
      var exec = require('child_process').exec;
      var ls = exec(command, function (error, stdout, stderr){
      if (error) {
        console.log("失败！\nError code: "+error.code+"\n"+error.stack);
      }else{
        e.reply([
        segment.image(`file:///${_path}/plugins/example/py/resrouces/images/help.jpeg`),
        ]);
        return true; //返回true 阻挡消息不再往下
      }
      });
  }
}


