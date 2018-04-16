require = function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n || e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = "function" == typeof require && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }
  return e;
}()({
  AppManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "037eawaArFKxr44RU4l1o9s", "AppManager");
    "use strict";
    var ResultPanel = require("ResultPanel");
    window.SUBJECT_TYPE = cc.Enum({
      Single: -1,
      Multi: -1
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        preSubjectItem: cc.Prefab,
        subjectScrollView: cc.ScrollView,
        count: cc.Label,
        totalCount: cc.Label,
        _index: 0,
        index: {
          get: function get() {
            return this._index;
          },
          set: function set(val) {
            var len = this._configArr.length - 1;
            if (val === this._index || val < 0 || val > len) return;
            this._index = val;
            this.count.string = val + 1;
            this.moveTo(val);
            var lastVal = val + 1;
            lastVal <= len && this.create(lastVal, this._configArr, this.onSelectOption.bind(this));
          },
          visible: false
        },
        _subjectList: [],
        resultPanel: ResultPanel
      },
      create: function create(idx, configArr, cb) {
        var data = configArr[idx];
        if (-1 !== app.configList.indexOf(data)) return;
        var answerkeys = data["answer"].split(",");
        var _type = answerkeys.length > 1 ? SUBJECT_TYPE.Multi : SUBJECT_TYPE.Single;
        var info = this._subjectList[idx];
        if (!info) {
          var node = cc.instantiate(this.preSubjectItem);
          node.parent = this.subjectScrollView.content;
          info = {
            item: node.getComponent("SubjectItem")
          };
          this._subjectList.push(info);
        }
        info.type = _type;
        info.item.init(idx, data, cb);
        data.result = -1;
        app.configList.push(data);
      },
      init: function init(title, configArr) {
        if (title) {
          this.title = app.Util.searchComp(this.node, "AppTitle", cc.Label);
          this.title.string = title;
        }
        this.count.string = 1;
        this._configArr = configArr;
        this.totalCount.string = configArr.length;
        app.configList = [];
        for (var i = 0; i < 2; ++i) this.create(i, configArr, this.onSelectOption.bind(this));
      },
      moveTo: function moveTo(idx) {
        var newX = -320 - 640 * idx;
        var newPos = cc.p(newX, 375);
        this.subjectScrollView.scrollToTop();
        this.subjectScrollView.content.runAction(cc.moveTo(.1, newPos));
        var subject = this._subjectList[idx];
        this.subjectScrollView.content.height = subject.item.node.height;
      },
      update: function update() {
        var subject = this._subjectList[this.index];
        subject && (this.subjectScrollView.content.height = subject.item.node.height);
      },
      onShowAnswer: function onShowAnswer() {
        var subject = this._subjectList[this.index];
        subject && subject.item.showAnswerDisplay();
      },
      onCheckAnswer: function onCheckAnswer() {
        var subject = this._subjectList[this.index];
        subject && subject.item.updateAnswerDisplay();
      },
      onAssignment: function onAssignment() {
        this._subjectList.forEach(function(subject) {
          var item = subject.item;
          var subjectData = app.configList[item.index];
          if (subjectData && subject.type === SUBJECT_TYPE.Multi) {
            var answerArr = subjectData.answer.split(",");
            var selectAnswerArr = [], _Count = 0;
            var optionList = item.optionGroupNode.children;
            optionList.forEach(function(node) {
              var option = node.getComponent(cc.Toggle);
              option.isChecked ? selectAnswerArr.push(option.node.tag) : _Count++;
            });
            if (_Count >= 5) subjectData["result"] = -1; else if (answerArr.length !== selectAnswerArr.length) subjectData["result"] = false; else {
              var matching = true;
              selectAnswerArr.forEach(function(answer) {
                -1 === answerArr.indexOf(answer) && (matching = false);
              });
              subjectData["result"] = matching;
            }
            app.configList[item.index] = subjectData;
          }
        });
        this.resultPanel.show(this);
      },
      onLast: function onLast() {
        this.index--;
      },
      onNext: function onNext() {
        this.index++;
      },
      onBack: function onBack() {
        this.mainPanel = app.Util.searchNode(this.node.parent, "MainPanel");
        this.mainPanel.active = true;
        this.index = 0;
        this._subjectList.forEach(function(target) {
          target.item.optionGroup && target.item.optionGroup.node && target.item.optionGroup.node.removeComponent(cc.ToggleGroup);
        });
      },
      onSelectOption: function onSelectOption(info) {
        var subject = this._subjectList[this.index];
        if (subject.type === SUBJECT_TYPE.Single) {
          var subjectData = app.configList[info.number];
          subjectData["result"] = subjectData.answer === info.option;
          app.configList[info.number] = subjectData;
          Settings.auto && this.onNext();
        }
      }
    });
    cc._RF.pop();
  }, {
    ResultPanel: "ResultPanel"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1b77aZjvpBKJD5Jt3z0oeA", "Global");
    "use strict";
    var app = {
      configList: [],
      scrollViewPos: null
    };
    window.app = app;
    cc._RF.pop();
  }, {} ],
  Main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e514H/rWlBbrJGNJWyxepT", "Main");
    "use strict";
    window.Settings = {
      auto: false,
      init: function init() {
        this.auto = "true" === cc.sys.localStorage.getItem("auto");
        var toggleNode = cc.find("Canvas/MainPanel/New Toggle");
        var toggle = toggleNode.getComponent(cc.Toggle);
        toggle.isChecked = this.auto;
        console.log("get auto:" + this.auto);
      },
      save: function save() {
        cc.sys.localStorage.setItem("auto", this.auto);
        console.log("save auto:" + this.auto);
      }
    };
    cc.Class({
      extends: cc.Component,
      properties: {
        preMenuItem: cc.Prefab,
        menuItemRoot: cc.ScrollView
      },
      _loadConfig: function _loadConfig() {
        var _this = this;
        this._config = [];
        cc.loader.loadResDir("Data", function(err, datas) {
          if (err) return;
          for (var i = 0; i < datas.length; ++i) {
            var data = datas[i];
            _this._config[i] = data;
            _this._initControl(i, data.tag, data.type);
          }
        });
      },
      _initControl: function _initControl(idx, tag, type) {
        var node = cc.instantiate(this.preMenuItem);
        var text = node.getChildByName("Text").getComponent(cc.Label);
        text.string = tag + "-" + type;
        node.tag = idx;
        node.on("click", this.onClick, this);
        node.parent = this.menuItemRoot.content;
        9 === idx && app.scrollViewPos && this.menuItemRoot.setContentPosition(app.scrollViewPos);
      },
      onClick: function onClick(event) {
        app.scrollViewPos = this.menuItemRoot.getContentPosition();
        var config = this._config[event.target.tag];
        this.appMgr = app.Util.searchComp(this.node.parent, "AppPanel", "AppManager");
        this.appMgr.init(config.tag, config.configArr);
        this.node.active = false;
      },
      onAuto: function onAuto() {
        Settings.auto = !Settings.auto;
        Settings.save();
      },
      onLoad: function onLoad() {
        cc.game.setFrameRate(30);
        Settings.init();
        this._loadConfig();
      }
    });
    cc._RF.pop();
  }, {} ],
  ResultPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7183dncGQdAHqNVK3+Ehq1u", "ResultPanel");
    "use strict";
    var RIGHT_COLOR = new cc.Color(150, 150, 255);
    cc.Class({
      extends: cc.Component,
      properties: {
        preResultItem: cc.Prefab,
        resultRoot: cc.Node,
        btnBack: cc.Node
      },
      onLoad: function onLoad() {
        this.node.on("touchend", function(event) {
          event.stopPropagation();
        }, this);
        this.btnBack.on("touchend", this.onBack, this);
      },
      removeResultAll: function removeResultAll() {
        this.resultRoot.removeAllChildren();
      },
      _createResult: function _createResult() {
        for (var i = 0; i < app.configList.length; ++i) {
          var data = app.configList[i];
          var node = cc.instantiate(this.preResultItem);
          var text = app.Util.searchComp(node, "Text", cc.Label);
          text.string = i + 1;
          var result = data["result"];
          -1 !== result && (node.color = data["result"] ? RIGHT_COLOR : cc.Color.RED);
          node.tag = i;
          node.on("touchend", this._goToTargetSubject, this);
          node.parent = this.resultRoot;
        }
      },
      _goToTargetSubject: function _goToTargetSubject(event) {
        this._appMgr.index = event.target.tag;
        this._appMgr.onShowAnswer();
        this.hide();
      },
      show: function show(appMgr) {
        this.removeResultAll();
        this._appMgr = appMgr;
        this._createResult();
        this.node.runAction(cc.moveTo(.2, cc.p(0, 0)));
      },
      hide: function hide() {
        var hideMoveTo = cc.moveTo(.2, cc.p(0, -960));
        var callFnc = cc.callFunc(this._hide, this);
        var action = cc.sequence(hideMoveTo, callFnc);
        this.node.runAction(action);
      },
      _hide: function _hide() {
        this.resultRoot.removeAllChildren();
      },
      onBack: function onBack() {
        this.hide();
      }
    });
    cc._RF.pop();
  }, {} ],
  SubjectItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e58e2QxH7JGIrIbek6UugCU", "SubjectItem");
    "use strict";
    var OPTION_STR = [ "A", "B", "C", "D", "E" ];
    cc.Class({
      extends: cc.Component,
      properties: {
        title: cc.Label,
        optionGroupNode: cc.Node,
        answer: cc.Label
      },
      init: function init(idx, config, onSelectOption) {
        var _this = this;
        var answerkey = config["answer"];
        var answerkeys = answerkey.split(",");
        var isCheckbox = answerkeys.length > 1;
        this.optionGroup = null;
        if (!isCheckbox) {
          this.optionGroup = this.optionGroupNode.addComponent(cc.ToggleGroup);
          this.optionGroup.enabled = false;
        }
        this.index = idx;
        this._onSelectOption = onSelectOption;
        this.title.string = config["title"];
        var children = this.optionGroupNode.children;
        for (var i = 0; i < children.length; ++i) {
          var option = children[i];
          var key = OPTION_STR[i];
          var text = app.Util.searchComp(option, "Text", cc.Label);
          option.active = true;
          if (!config[key]) {
            option.active = false;
            continue;
          }
          text.string = key + "." + config[key];
          option.tag = key;
          option.on("click", this.onClick, this);
          var optionToggle = option.getComponent(cc.Toggle);
          if (this.optionGroup) {
            this.optionGroup.allowSwitchOff = true;
            optionToggle.toggleGroup = this.optionGroup;
            this.optionGroup.addToggle(optionToggle);
          }
          optionToggle.isChecked = false;
        }
        this.answer.string = "";
        isCheckbox ? answerkeys.forEach(function(str) {
          _this.answer.string += str + ". " + config[str] + "\n\n";
        }) : this.answer.string = answerkey + ". " + config[answerkey];
        this.answer.node.parent.active = false;
      },
      showAnswerDisplay: function showAnswerDisplay() {
        this.answer.node.parent.active = true;
      },
      updateAnswerDisplay: function updateAnswerDisplay() {
        this.answer.node.parent.active = !this.answer.node.parent.active;
      },
      onClick: function onClick(event) {
        this.optionGroup && (this.optionGroup.enabled = true);
        var info = {
          number: this.index,
          option: event.target.tag
        };
        this._onSelectOption && this._onSelectOption(info);
      }
    });
    cc._RF.pop();
  }, {} ],
  Util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7dad4XCU05Ka6KwCK80IBeF", "Util");
    "use strict";
    window.app.Util = {
      searchComp: function searchComp(parent, name, component) {
        var node = this.searchNode(parent, name);
        if (!node) return null;
        var comp = node.getComponent(component);
        if (!comp) return null;
        return comp;
      },
      searchNode: function searchNode(parent, name1, name2) {
        var node = void 0;
        function search(node, name) {
          var queue = [ [ node ] ];
          for (var i = 0; i < queue.length; ++i) {
            var list = queue[i];
            for (var j = 0; j < list.length; ++j) {
              node = list[j];
              if (node.name === name) return node;
              queue.push(node.children);
            }
          }
          return null;
        }
        node = parent;
        for (var i = 1; i < arguments.length && node; ++i) node = search(node, arguments[i]);
        return node;
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "Global", "Util", "AppManager", "Main", "ResultPanel", "SubjectItem" ]);