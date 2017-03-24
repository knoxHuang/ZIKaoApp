require=function t(e,n,i){function o(s,r){if(!n[s]){if(!e[s]){var a="function"==typeof require&&require;if(!r&&a)return a(s,!0);if(c)return c(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){var n=e[s][1][t];return o(n?n:t)},u,u.exports,t,e,n,i)}return n[s].exports}for(var c="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({AppManager:[function(t,e,n){"use strict";cc._RFpush(e,"037eawaArFKxr44RU4l1o9s","AppManager");var i=t("ResultPanel");window.SUBJECT_TYPE=cc.Enum({Single:-1,Multi:-1}),cc.Class({"extends":cc.Component,properties:{preSubjectItem:cc.Prefab,subjectScrollView:cc.ScrollView,count:cc.Label,totalCount:cc.Label,_index:0,index:{get:function(){return this._index},set:function(t){var e=this._subjectList.length-1;t===this._index||t<0||t>e||(this._index=t,this.count.string=t+1,this.moveTo(t))},visible:!1},_subjectList:[],resultPanel:i},init:function(t,e){t&&(this.title=app.Util.searchComp(this.node,"AppTitle",cc.Label),this.title.string=t),this.count.string=1,this.totalCount.string=e.length,this._subjectList.length=0,app.configList=[];for(var n=0;n<e.length;++n){var i=e[n],o=cc.instantiate(this.preSubjectItem),c=o.getComponent("SubjectItem"),s=i.answer.split(","),r=s.length>1?SUBJECT_TYPE.Multi:SUBJECT_TYPE.Single;c.init(n,i,this.onSelectOption.bind(this)),o.parent=this.subjectScrollView.content,this._subjectList.push({item:c,type:r}),i.result=-1,app.configList.push(i)}},moveTo:function(t){var e=-320-640*t,n=cc.p(e,375);this.subjectScrollView.scrollToTop(),this.subjectScrollView.content.runAction(cc.moveTo(.1,n));var i=this._subjectList[t];this.subjectScrollView.content.height=i.item.node.height},update:function(){var t=this._subjectList[this.index];t&&(this.subjectScrollView.content.height=t.item.node.height)},onShowAnswer:function(){var t=this._subjectList[this.index];t&&t.item.showAnswerDisplay()},onCheckAnswer:function(){var t=this._subjectList[this.index];t&&t.item.updateAnswerDisplay()},onAssignment:function(){this._subjectList.forEach(function(t){if(t.type===SUBJECT_TYPE.Multi){var e=t.item,n=app.configList[e.index];n&&!function(){var t=n.answer.split(","),i=[],o=!0,c=e.optionGroupNode.children;if(c.forEach(function(t){var e=t.getComponent(cc.Toggle);e.isChecked?i.push(e.node.tag):o++}),o>=5)n.result=-1;else if(t.length!==i.length)n.result=!1;else{var s=!0;i.forEach(function(e){t.indexOf(e)===-1&&(s=!1)}),n.result=s}app.configList[e.index]=n}()}}),this.resultPanel.show(this)},onLast:function(){this.index--},onNext:function(){this.index++},onBack:function(){this.mainPanel=app.Util.searchNode(this.node.parent,"MainPanel"),this.mainPanel.active=!0,this.subjectScrollView.content.removeAllChildren()},onSelectOption:function(t){var e=this._subjectList[this.index];if(e.type===SUBJECT_TYPE.Single){var n=app.configList[t.number];n.result=n.answer===t.option,app.configList[t.number]=n}}}),cc._RFpop()},{ResultPanel:"ResultPanel"}],Global:[function(t,e,n){"use strict";cc._RFpush(e,"e1b77aZjvpBKJD5Jt3z0oeA","Global");var i={configList:[],scrollViewPos:null};window.app=i,cc._RFpop()},{}],Main:[function(t,e,n){"use strict";cc._RFpush(e,"0e514H/rWlBbrJGNJWyxepT","Main"),cc.Class({"extends":cc.Component,properties:{preMenuItem:cc.Prefab,menuItemRoot:cc.ScrollView},_loadConfig:function(){var t=this;this._config=[];for(var e=function(e){cc.loader.loadRes("Data/config_"+e,function(n,i){t._config[e]=i,t._initControl(e,i.tag,i.type)})},n=1;n<=11;++n)e(n)},_initControl:function(t,e,n){var i=cc.instantiate(this.preMenuItem),o=i.getChildByName("Text").getComponent(cc.Label);o.string=e+"-"+n+"("+t+")",i.tag=t,i.on("click",this.onClick,this),i.parent=this.menuItemRoot.content,9===t&&app.scrollViewPos&&this.menuItemRoot.setContentPosition(app.scrollViewPos)},onClick:function(t){app.scrollViewPos=this.menuItemRoot.getContentPosition();var e=this._config[t.target.tag];this.appMgr=app.Util.searchComp(this.node.parent,"AppPanel","AppManager"),this.appMgr.init(e.tag,e.configArr),this.node.active=!1},onLoad:function(){this._loadConfig()}}),cc._RFpop()},{}],ResultPanel:[function(t,e,n){"use strict";cc._RFpush(e,"7183dncGQdAHqNVK3+Ehq1u","ResultPanel");var i=new cc.Color(150,150,255);cc.Class({"extends":cc.Component,properties:{preResultItem:cc.Prefab,resultRoot:cc.Node,btnBack:cc.Node},onLoad:function(){this.node.on("touchend",function(t){t.stopPropagation()},this),this.btnBack.on("touchend",this.onBack,this)},removeResultAll:function(){this.resultRoot.removeAllChildren()},_createResult:function(){for(var t=0;t<app.configList.length;++t){var e=app.configList[t],n=cc.instantiate(this.preResultItem),o=app.Util.searchComp(n,"Text",cc.Label);o.string=t+1;var c=e.result;-1!==c&&(n.color=e.result?i:cc.Color.RED),n.tag=t,n.on("touchend",this._goToTargetSubject,this),n.parent=this.resultRoot}},_goToTargetSubject:function(t){this._appMgr.index=t.target.tag,this._appMgr.onShowAnswer(),this.hide()},show:function(t){this.removeResultAll(),this._appMgr=t,this._createResult(),this.node.runAction(cc.moveTo(.2,cc.p(0,0)))},hide:function(){var t=cc.moveTo(.2,cc.p(0,-960)),e=cc.callFunc(this._hide,this),n=cc.sequence(t,e);this.node.runAction(n)},_hide:function(){this.resultRoot.removeAllChildren()},onBack:function(){this.hide()}}),cc._RFpop()},{}],SubjectItem:[function(t,e,n){"use strict";cc._RFpush(e,"e58e2QxH7JGIrIbek6UugCU","SubjectItem");var i=["A","B","C","D","E"];cc.Class({"extends":cc.Component,properties:{title:cc.Label,optionGroupNode:cc.Node,answer:cc.Label},init:function(t,e,n){var o=this,c=e.answer,s=c.split(","),r=s.length>1;r||(this.optionGroup=this.optionGroupNode.addComponent(cc.ToggleGroup),this.optionGroup.enabled=!1),this.index=t,this._onSelectOption=n,this.title.string=e.title;for(var a=this.optionGroupNode.children,l=0;l<a.length;++l){var u=a[l],p=i[l],h=app.Util.searchComp(u,"Text",cc.Label);if(e[p]){if(h.string=p+"."+e[p],u.tag=p,u.on("click",this.onClick,this),u.isChecked=!1,!r){var f=u.getComponent(cc.Toggle);f.toggleGroup=this.optionGroup,this.optionGroup.addToggle(f)}}else u.active=!1}this.answer.string="",r?s.forEach(function(t){o.answer.string+=t+". "+e[t]+"\n\n"}):this.answer.string=c+". "+e[c],this.answer.node.parent.active=!1},showAnswerDisplay:function(){this.answer.node.parent.active=!0},updateAnswerDisplay:function(){this.answer.node.parent.active=!this.answer.node.parent.active,console.log(this.answer.node.parent.active)},onClick:function(t){this.optionGroup&&(this.optionGroup.enabled=!0);var e={number:this.index,option:t.target.tag};this._onSelectOption&&this._onSelectOption(e)}}),cc._RFpop()},{}],Util:[function(t,e,n){"use strict";cc._RFpush(e,"7dad4XCU05Ka6KwCK80IBeF","Util"),app.Util={searchComp:function(t,e,n){var i=this.searchNode(t,e);if(!i)return null;var o=i.getComponent(n);return o?o:null},searchNode:function(t,e,n){function i(t,e){for(var n=[[t]],i=0;i<n.length;++i)for(var o=n[i],c=0;c<o.length;++c){if(t=o[c],t.name===e)return t;n.push(t.children)}return null}var o=void 0;o=t;for(var c=1;c<arguments.length&&o;++c)o=i(o,arguments[c]);return o}},cc._RFpop()},{}]},{},["Global","Util","AppManager","Main","ResultPanel","SubjectItem"]);