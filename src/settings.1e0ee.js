window._CCSettings={platform:"web-mobile",groupList:["default","ui"],collisionMatrix:[[true],[false,false]],rawAssets:{assets:{"0":["AnswerIcon.prefab",0],"1":["data/newSingle.json",1],"6":["Single.prefab",0],"8":["data/single.json",1]}},assetTypes:["cc.Prefab","cc.JsonAsset"],launchScene:"db://assets/main.fire",scenes:[{url:"db://assets/main.fire",uuid:3}],packedAssets:{"06fdfdc57":[2,7,0,4,5],"07b3092c1":[1,"1bnL/Td11J+YnYah3c3U0Z",2,"3cYD441MdEbbPJ7vmyDOld","68J8oyAQdFUrqy37MXmbtE","90AErWL21A4ZPvtxQ3XG8G","9bvaMerUlDyary99mJa6xp",3,"b5sR0VfthKzI4pW0VAicWZ",4,5],"0886dab66":["1fLMy9bsRGCb96ugB7WM2U",6,7],"08ff65a7a":[9,10,11,12,13,14,15,16,17,18,19]},md5AssetsMap:{import:["06fdfdc57","29981","07b3092c1","423cb","0886dab66","31d8b","08ff65a7a","750fb",8,"a932c"],"raw-assets":[9,"076a6",10,"c06a9",11,"7661e",12,"ac5d9",13,"83fcc",14,"48276",15,"65417",16,"e4b75",17,"cdbc9",18,"90cf4",19,"1d6ae"]},orientation:"",subpackages:{},uuids:["c7Ck580PJDw5PV7IezrlXM","15gIn5LMpAU7RXlST3l3y3","29FYIk+N1GYaeWH/q1NxQO","a9+kPy8nBHTIbo3bsiV/c0","e97GVMl6JHh5Ml5qEDdSGa","f0BIwQ8D5Ml7nTNQbh1YlS","73JpqWYA5ODqaIONYPrPeh","c2MRfhT8tHwpkKkmFZ33jD","81yekv//tKTYi5O8YYWyAs","1377KveqtBOapOukeNW5IN","71VhFCTINJM6/Ky3oX9nBT","73oJA92A5OPKpn+ZlUPAj1","82X2b0n/9JmokwqrHoitlE","b4P/PCArtIdIH38t6mlw8Y","b4fIsvN/9J0bMqzxEZsjWE","d2kHe6FidKcpV5e1aiNTQM","d55p4RolRECaXmJ9L6q/3t","d8HsitJHxOYqo801xBk8ev","e8Ueib+qJEhL6mXAHdnwbi","f9jA9dutZGHZwY+RuWj/Mw"]};(function (settings) {
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