window._CCSettings={platform:"web-mobile",groupList:["default","ui"],collisionMatrix:[[true],[false,false]],rawAssets:{assets:{"0":["data/single.json",1],"2":["Single.prefab",0],"5":["AnswerIcon.prefab",0]}},assetTypes:["cc.Prefab","cc.JsonAsset"],launchScene:"db://assets/main.fire",scenes:[{url:"db://assets/main.fire",uuid:1}],packedAssets:{"01f6eddc0":[8,9,10,11,12,13,14,15,16],"03b954ba7":["1bnL/Td11J+YnYah3c3U0Z",3,0,"9bvaMerUlDyary99mJa6xp",1,"b5sR0VfthKzI4pW0VAicWZ",6,7],"0540d3b22":["1fLMy9bsRGCb96ugB7WM2U",2,4,"ff3jyrOkdIA5edXuD+bWno"],"06fdfdc57":[3,4,5,6,7]},md5AssetsMap:{import:["01f6eddc0","5462f","03b954ba7","c3809","0540d3b22","63018","06fdfdc57","a4f93"],"raw-assets":[8,"076a6",9,"c06a9",10,"ac5d9",11,"11da9",12,"83fcc",13,"e4b75",14,"cdbc9",15,"90cf4",16,"1d6ae"]},orientation:"",subpackages:{},uuids:["81yekv//tKTYi5O8YYWyAs","a9+kPy8nBHTIbo3bsiV/c0","73JpqWYA5ODqaIONYPrPeh","29FYIk+N1GYaeWH/q1NxQO","c2MRfhT8tHwpkKkmFZ33jD","c7Ck580PJDw5PV7IezrlXM","e97GVMl6JHh5Ml5qEDdSGa","f0BIwQ8D5Ml7nTNQbh1YlS","1377KveqtBOapOukeNW5IN","71VhFCTINJM6/Ky3oX9nBT","82X2b0n/9JmokwqrHoitlE","aeNbMSR9BMXYs+1jJbtXAJ","b4P/PCArtIdIH38t6mlw8Y","d55p4RolRECaXmJ9L6q/3t","d8HsitJHxOYqo801xBk8ev","e8Ueib+qJEhL6mXAHdnwbi","f9jA9dutZGHZwY+RuWj/Mw"]};(function (settings) {
                var uuids = settings.uuids;
                var md5AssetsMap = settings.md5AssetsMap;
                for (var folder in md5AssetsMap) {
                    var md5Entries = md5AssetsMap[folder];
                    for (var i = 0; i < md5Entries.length; i += 2) {
                        if (typeof md5Entries[i] === 'number') {
                            md5Entries[i] = uuids[md5Entries[i]];
                        }
                    }
                }
            })(window._CCSettings);