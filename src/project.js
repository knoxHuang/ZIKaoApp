require=function t(e,n,i){function o(c,r){if(!n[c]){if(!e[c]){var a="function"==typeof require&&require;if(!r&&a)return a(c,!0);if(s)return s(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var p=n[c]={exports:{}};e[c][0].call(p.exports,function(t){var n=e[c][1][t];return o(n?n:t)},p,p.exports,t,e,n,i)}return n[c].exports}for(var s="function"==typeof require&&require,c=0;c<i.length;c++)o(i[c]);return o}({AppManager:[function(t,e,n){"use strict";cc._RFpush(e,"037eawaArFKxr44RU4l1o9s","AppManager");var i=t("ResultPanel");window.SUBJECT_TYPE=cc.Enum({Single:-1,Multi:-1}),cc.Class({"extends":cc.Component,properties:{preSubjectItem:cc.Prefab,subjectRoot:cc.Node,count:cc.Label,totalCount:cc.Label,_index:0,index:{get:function(){return this._index},set:function(t){var e=this._subjectList.length-1;t===this._index||t<0||t>e||(this._index=t,this.count.string=t+1,this.moveTo(t))},visible:!1},_subjectList:[],resultPanel:i},init:function(t,e){t&&(this.title=app.Util.searchComp(this.node,"AppTitle",cc.Label),this.title.string=t),this.count.string=1,this.totalCount.string=e.length,app.configList=[];for(var n=0;n<e.length;++n){var i=e[n],o=cc.instantiate(this.preSubjectItem),s=o.getComponent("SubjectItem"),c=i.answer.split(","),r=c.length>1?SUBJECT_TYPE.Multi:SUBJECT_TYPE.Single;s.init(n,i,this.onSelectOption.bind(this)),o.parent=this.subjectRoot,this._subjectList.push({item:s,type:r}),i.result=-1,app.configList.push(i)}},moveTo:function(t){var e=-320-640*t,n=cc.p(e,375);this.subjectRoot.runAction(cc.moveTo(.1,n));var i=this._subjectList[t];this.subjectRoot.height=i.item.node.height},update:function(){var t=this._subjectList[this.index];t&&(this.subjectRoot.height=t.item.node.height)},onShowAnswer:function(){var t=this._subjectList[this.index];t&&t.item.showAnswerDisplay()},onCheckAnswer:function(){var t=this._subjectList[this.index];t&&t.item.updateAnswerDisplay()},onAssignment:function(){this._subjectList.forEach(function(t){t.type===SUBJECT_TYPE.Multi&&!function(){var e=t.item,n=app.configList[e.index],i=n.answer.split(","),o=[],s=!0,c=e.optionGroupNode.children;if(c.forEach(function(t){var e=t.getComponent(cc.Toggle);e.isChecked?o.push(e.node.tag):s++}),s>=5)n.result=-1;else if(i.length!==o.length)n.result=!1;else{var r=!0;o.forEach(function(t){i.indexOf(t)===-1&&(r=!1)}),n.result=r}app.configList[e.index]=n}()}),this.resultPanel.show(this)},onLast:function(){this.index--},onNext:function(){this.index++},onBack:function(){this.mainPanel=app.Util.searchNode(this.node.parent,"MainPanel"),this.mainPanel.active=!0},onSelectOption:function(t){var e=this._subjectList[this.index];if(e.type===SUBJECT_TYPE.Single){var n=app.configList[t.number];n.result=n.answer===t.option,app.configList[t.number]=n}}}),cc._RFpop()},{ResultPanel:"ResultPanel"}],Global:[function(t,e,n){"use strict";cc._RFpush(e,"e1b77aZjvpBKJD5Jt3z0oeA","Global");var i={configList:[],scrollViewPos:null};window.app=i,cc._RFpop()},{}],Main:[function(t,e,n){"use strict";cc._RFpush(e,"0e514H/rWlBbrJGNJWyxepT","Main"),cc.Class({"extends":cc.Component,properties:{preMenuItem:cc.Prefab,menuItemRoot:cc.ScrollView},_loadConfig:function(){var t=this;this._config=[];for(var e=function(e){cc.loader.loadRes("Data/config_"+e,function(n,i){t._config[e]=i,t._initControl(e,i.tag,i.type)})},n=1;n<=11;++n)e(n)},_initControl:function(t,e,n){var i=cc.instantiate(this.preMenuItem),o=i.getChildByName("Text").getComponent(cc.Label);o.string=e+"-"+n+"("+t+")",i.tag=t,i.on("click",this.onClick,this),i.parent=this.menuItemRoot.content,9===t&&app.scrollViewPos&&this.menuItemRoot.setContentPosition(app.scrollViewPos)},onClick:function(t){app.scrollViewPos=this.menuItemRoot.getContentPosition();var e=this._config[t.target.tag];this.appMgr=app.Util.searchComp(this.node.parent,"AppPanel","AppManager"),this.appMgr.init(e.tag,e.configArr),this.node.active=!1},onLoad:function(){this._loadConfig()}}),cc._RFpop()},{}],ResultPanel:[function(t,e,n){"use strict";cc._RFpush(e,"7183dncGQdAHqNVK3+Ehq1u","ResultPanel");var i=new cc.Color(150,150,255);cc.Class({"extends":cc.Component,properties:{preResultItem:cc.Prefab,resultRoot:cc.Node,btnBack:cc.Node},onLoad:function(){this.node.on("touchend",function(t){t.stopPropagation()},this),this.btnBack.on("touchend",this.onBack,this)},removeResultAll:function(){this.resultRoot.removeAllChildren()},_createResult:function(){for(var t=0;t<app.configList.length;++t){var e=app.configList[t],n=cc.instantiate(this.preResultItem),o=app.Util.searchComp(n,"Text",cc.Label);o.string=t+1;var s=e.result;-1!==s&&(n.color=e.result?i:cc.Color.RED),n.tag=t,n.on("touchend",this._goToTargetSubject,this),n.parent=this.resultRoot}},_goToTargetSubject:function(t){this._appMgr.index=t.target.tag,this._appMgr.onShowAnswer(),this.hide()},show:function(t){this.removeResultAll(),this._appMgr=t,this._createResult(),this.node.runAction(cc.moveTo(.2,cc.p(0,0)))},hide:function(){var t=cc.moveTo(.2,cc.p(0,-960)),e=cc.callFunc(this._hide,this),n=cc.sequence(t,e);this.node.runAction(n)},_hide:function(){this.resultRoot.removeAllChildren()},onBack:function(){this.hide()}}),cc._RFpop()},{}],SubjectItem:[function(t,e,n){"use strict";cc._RFpush(e,"e58e2QxH7JGIrIbek6UugCU","SubjectItem");var i=["A","B","C","D","E"];cc.Class({"extends":cc.Component,properties:{title:cc.Label,optionGroupNode:cc.Node,answer:cc.Label},init:function(t,e,n){var o=this,s=e.answer,c=s.split(","),r=c.length>1;r||(this.optionGroup=this.optionGroupNode.addComponent(cc.ToggleGroup),this.optionGroup.enabled=!1),this.index=t,this._onSelectOption=n,this.title.string=e.title;for(var a=this.optionGroupNode.children,u=0;u<a.length;++u){var p=a[u],l=i[u],h=app.Util.searchComp(p,"Text",cc.Label);if(e[l]){if(h.string=l+"."+e[l],p.tag=l,p.on("click",this.onClick,this),p.isChecked=!1,!r){var f=p.getComponent(cc.Toggle);f.toggleGroup=this.optionGroup,this.optionGroup.addToggle(f)}}else p.active=!1}this.answer.string="",r?c.forEach(function(t){o.answer.string+=t+". "+e[t]+"\n\n"}):this.answer.string=s+". "+e[s],this.answer.node.parent.active=!1},showAnswerDisplay:function(){this.answer.node.parent.active=!0},updateAnswerDisplay:function(){this.answer.node.parent.active=!this.answer.node.parent.active},onClick:function(t){this.optionGroup&&(this.optionGroup.enabled=!0);var e={number:this.index,option:t.target.tag};this._onSelectOption&&this._onSelectOption(e)}}),cc._RFpop()},{}],Util:[function(t,e,n){"use strict";cc._RFpush(e,"7dad4XCU05Ka6KwCK80IBeF","Util"),app.Util={searchComp:function(t,e,n){var i=this.searchNode(t,e);if(!i)return null;var o=i.getComponent(n);return o?o:null},searchNode:function(t,e,n){function i(t,e){for(var n=[[t]],i=0;i<n.length;++i)for(var o=n[i],s=0;s<o.length;++s){if(t=o[s],t.name===e)return t;n.push(t.children)}return null}var o=void 0;o=t;for(var s=1;s<arguments.length&&o;++s)o=i(o,arguments[s]);return o}},cc._RFpop()},{}]},{},["Global","Util","AppManager","Main","ResultPanel","SubjectItem"]);