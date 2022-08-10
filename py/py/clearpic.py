# -*- coding: utf-8 -*-
import os
import json
FILE_PATH1 = os.path.dirname(__file__)
FILE_PATH =os.path.join(FILE_PATH1,"../resrouces")
if not os.path.exists(FILE_PATH+'/qianwen'):
    os.makedirs(FILE_PATH+'/qianwen')
if not os.path.exists(FILE_PATH+'/jieqian'):
    os.makedirs(FILE_PATH+'/jieqian')
if not os.path.exists(FILE_PATH+'/cailiaodian'):
    os.makedirs(FILE_PATH+'/cailiaodian')
if not os.path.exists(FILE_PATH+'/life'):
    os.makedirs(FILE_PATH+'/life')
if not os.path.exists(FILE_PATH+'/today_card'):
    os.makedirs(FILE_PATH+'/today_card')    
    
path=os.listdir(FILE_PATH+'/jieqian')
for i in path:
    os.remove(FILE_PATH+'/jieqian/'+i)


path2=os.listdir(FILE_PATH+'/qianwen')
for k in path2:
    os.remove(FILE_PATH+'/qianwen/'+k)
path3=os.listdir(FILE_PATH+'/cailiaodian')
for k in path3:
    os.remove(FILE_PATH+'/cailiaodian/'+k)
path4=os.listdir(FILE_PATH+'/life')
for k in path4:
    os.remove(FILE_PATH+'/life/'+k)

a=dict()
DATA_PATH=os.path.join(FILE_PATH1,"../data")
with open(DATA_PATH+'/qianwen.json','w') as g:
    a=json.dumps(a)
    g.write(a)
