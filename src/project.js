require=function t(e,n,i){function o(s,r){if(!n[s]){if(!e[s]){var a="function"==typeof require&&require;if(!r&&a)return a(s,!0);if(c)return c(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[s]={exports:{}};e[s][0].call(l.exports,function(t){var n=e[s][1][t];return o(n||t)},l,l.exports,t,e,n,i)}return n[s].exports}for(var c="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({AppManager:[function(t,e,n){"use strict";cc._RF.push(e,"037eawaArFKxr44RU4l1o9s","AppManager");var i=t("ResultPanel");window.SUBJECT_TYPE=cc.Enum({Single:-1,Multi:-1}),cc.Class({extends:cc.Component,properties:{preSubjectItem:cc.Prefab,subjectScrollView:cc.ScrollView,count:cc.Label,totalCount:cc.Label,_index:0,index:{get:function(){return this._index},set:function(t){var e=this._configArr.length-1;if(!(t===this._index||t<0||t>e)){this._index=t,this.count.string=t+1,this.moveTo(t);var n=t+1;n<=e&&this.create(n,this._configArr,this.onSelectOption.bind(this))}},visible:!1},_subjectList:[],resultPanel:i},create:function(t,e,n){var i=e[t],o=i.answer.split(",").length>1?SUBJECT_TYPE.Multi:SUBJECT_TYPE.Single,c=this._subjectList[t];if(!c){var s=cc.instantiate(this.preSubjectItem);s.parent=this.subjectScrollView.content,c={item:s.getComponent("SubjectItem")},this._subjectList.push(c)}c.type=o,c.item.init(t,i,n),i.result=-1,app.configList.push(i)},init:function(t,e){t&&(this.title=app.Util.searchComp(this.node,"AppTitle",cc.Label),this.title.string=t),this.count.string=1,this._configArr=e,this.totalCount.string=e.length,app.configList=[];for(var n=0;n<2;++n)this.create(n,e,this.onSelectOption.bind(this))},moveTo:function(t){var e=-320-640*t,n=cc.p(e,375);this.subjectScrollView.scrollToTop(),this.subjectScrollView.content.runAction(cc.moveTo(.1,n));var i=this._subjectList[t];this.subjectScrollView.content.height=i.item.node.height},update:function(){var t=this._subjectList[this.index];t&&(this.subjectScrollView.content.height=t.item.node.height)},onShowAnswer:function(){var t=this._subjectList[this.index];t&&t.item.showAnswerDisplay()},onCheckAnswer:function(){var t=this._subjectList[this.index];t&&t.item.updateAnswerDisplay()},onAssignment:function(){this._subjectList.forEach(function(t){var e=t.item,n=app.configList[e.index];if(n&&t.type===SUBJECT_TYPE.Multi){var i=n.answer.split(","),o=[],c=0;if(e.optionGroupNode.children.forEach(function(t){var e=t.getComponent(cc.Toggle);e.isChecked?o.push(e.node.tag):c++}),c>=5)n.result=-1;else if(i.length!==o.length)n.result=!1;else{var s=!0;o.forEach(function(t){-1===i.indexOf(t)&&(s=!1)}),n.result=s}app.configList[e.index]=n}}),this.resultPanel.show(this)},onLast:function(){this.index--},onNext:function(){this.index++},onBack:function(){this.mainPanel=app.Util.searchNode(this.node.parent,"MainPanel"),this.mainPanel.active=!0,this.index=0,this._subjectList.forEach(function(t){t.item.optionGroup&&t.item.optionGroup.node&&t.item.optionGroup.node.removeComponent(cc.ToggleGroup)})},onSelectOption:function(t){if(this._subjectList[this.index].type===SUBJECT_TYPE.Single){var e=app.configList[t.number];e.result=e.answer===t.option,app.configList[t.number]=e,Settings.auto&&this.onNext()}}}),cc._RF.pop()},{ResultPanel:"ResultPanel"}],Global:[function(t,e,n){"use strict";cc._RF.push(e,"e1b77aZjvpBKJD5Jt3z0oeA","Global");var i={configList:[],scrollViewPos:null};window.app=i,cc._RF.pop()},{}],Main:[function(t,e,n){"use strict";cc._RF.push(e,"0e514H/rWlBbrJGNJWyxepT","Main"),window.Settings={auto:!1},cc.Class({extends:cc.Component,properties:{preMenuItem:cc.Prefab,menuItemRoot:cc.ScrollView},_loadConfig:function(){var t=this;this._config=[],cc.loader.loadResDir("Data",function(e,n){if(!e)for(var i=0;i<n.length;++i){var o=n[i];t._config[i]=o,t._initControl(i,o.tag,o.type)}})},_initControl:function(t,e,n){var i=cc.instantiate(this.preMenuItem);i.getChildByName("Text").getComponent(cc.Label).string=e+"-"+n+"("+t+")",i.tag=t,i.on("click",this.onClick,this),i.parent=this.menuItemRoot.content,9===t&&app.scrollViewPos&&this.menuItemRoot.setContentPosition(app.scrollViewPos)},onClick:function(t){app.scrollViewPos=this.menuItemRoot.getContentPosition();var e=this._config[t.target.tag];this.appMgr=app.Util.searchComp(this.node.parent,"AppPanel","AppManager"),this.appMgr.init(e.tag,e.configArr),this.node.active=!1},onAuto:function(){Settings.auto=!Settings.auto},onLoad:function(){cc.game.setFrameRate(30),this._loadConfig()}}),cc._RF.pop()},{}],ResultPanel:[function(t,e,n){"use strict";cc._RF.push(e,"7183dncGQdAHqNVK3+Ehq1u","ResultPanel");var i=new cc.Color(150,150,255);cc.Class({extends:cc.Component,properties:{preResultItem:cc.Prefab,resultRoot:cc.Node,btnBack:cc.Node},onLoad:function(){this.node.on("touchend",function(t){t.stopPropagation()},this),this.btnBack.on("touchend",this.onBack,this)},removeResultAll:function(){this.resultRoot.removeAllChildren()},_createResult:function(){for(var t=0;t<app.configList.length;++t){var e=app.configList[t],n=cc.instantiate(this.preResultItem);app.Util.searchComp(n,"Text",cc.Label).string=t+1,-1!==e.result&&(n.color=e.result?i:cc.Color.RED),n.tag=t,n.on("touchend",this._goToTargetSubject,this),n.parent=this.resultRoot}},_goToTargetSubject:function(t){this._appMgr.index=t.target.tag,this._appMgr.onShowAnswer(),this.hide()},show:function(t){this.removeResultAll(),this._appMgr=t,this._createResult(),this.node.runAction(cc.moveTo(.2,cc.p(0,0)))},hide:function(){var t=cc.moveTo(.2,cc.p(0,-960)),e=cc.callFunc(this._hide,this),n=cc.sequence(t,e);this.node.runAction(n)},_hide:function(){this.resultRoot.removeAllChildren()},onBack:function(){this.hide()}}),cc._RF.pop()},{}],SubjectItem:[function(t,e,n){"use strict";cc._RF.push(e,"e58e2QxH7JGIrIbek6UugCU","SubjectItem");var i=["A","B","C","D","E"];cc.Class({extends:cc.Component,properties:{title:cc.Label,optionGroupNode:cc.Node,answer:cc.Label},init:function(t,e,n){var o=this,c=e.answer,s=c.split(","),r=s.length>1;this.optionGroup=null,r||(this.optionGroup=this.optionGroupNode.addComponent(cc.ToggleGroup),this.optionGroup.enabled=!1),this.index=t,this._onSelectOption=n,this.title.string=e.title;for(var a=this.optionGroupNode.children,u=0;u<a.length;++u){var l=a[u],p=i[u],h=app.Util.searchComp(l,"Text",cc.Label);if(l.active=!0,e[p]){h.string=p+"."+e[p],l.tag=p,l.on("click",this.onClick,this);var f=l.getComponent(cc.Toggle);this.optionGroup&&(this.optionGroup.allowSwitchOff=!0,f.toggleGroup=this.optionGroup,this.optionGroup.addToggle(f)),f.isChecked=!1}else l.active=!1}this.answer.string="",r?s.forEach(function(t){o.answer.string+=t+". "+e[t]+"\n\n"}):this.answer.string=c+". "+e[c],this.answer.node.parent.active=!1},showAnswerDisplay:function(){this.answer.node.parent.active=!0},updateAnswerDisplay:function(){this.answer.node.parent.active=!this.answer.node.parent.active},onClick:function(t){this.optionGroup&&(this.optionGroup.enabled=!0);var e={number:this.index,option:t.target.tag};this._onSelectOption&&this._onSelectOption(e)}}),cc._RF.pop()},{}],Util:[function(t,e,n){"use strict";cc._RF.push(e,"7dad4XCU05Ka6KwCK80IBeF","Util"),window.app.Util={searchComp:function(t,e,n){var i=this.searchNode(t,e);if(!i)return null;var o=i.getComponent(n);return o||null},searchNode:function(t,e,n){var i=void 0;i=t;for(var o=1;o<arguments.length&&i;++o)i=function(t,e){for(var n=[[t]],i=0;i<n.length;++i)for(var o=n[i],c=0;c<o.length;++c){if((t=o[c]).name===e)return t;n.push(t.children)}return null}(i,arguments[o]);return i}},cc._RF.pop()},{}]},{},["Global","Util","AppManager","Main","ResultPanel","SubjectItem"]);