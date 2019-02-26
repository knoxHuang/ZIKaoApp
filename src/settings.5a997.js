window._CCSettings={platform:"web-mobile",groupList:["default","ui"],collisionMatrix:[[true],[false,false]],rawAssets:{assets:{"0":["AnswerIcon.prefab",0],"1":["Single.prefab",0],"4":["data/single.json",1]}},assetTypes:["cc.Prefab","cc.JsonAsset"],launchScene:"db://assets/main.fire",scenes:[{url:"db://assets/main.fire",uuid:5}],packedAssets:{"06fdfdc57":[3,2,0,6,7],"0886dab66":["1fLMy9bsRGCb96ugB7WM2U",1,2],"08ff65a7a":[8,9,10,11,12,13,14,15,16,17,18],"0948c2ec3":["1bnL/Td11J+YnYah3c3U0Z",3,"3cYD441MdEbbPJ7vmyDOld","68J8oyAQdFUrqy37MXmbtE",4,"90AErWL21A4ZPvtxQ3XG8G","9bvaMerUlDyary99mJa6xp",5,"b5sR0VfthKzI4pW0VAicWZ",6,7]},md5AssetsMap:{import:["06fdfdc57","29981","0886dab66","e6b31","08ff65a7a","750fb","0948c2ec3","c438a"],"raw-assets":[8,"076a6",9,"c06a9",10,"7661e",11,"ac5d9",12,"83fcc",13,"48276",14,"65417",15,"e4b75",16,"cdbc9",17,"90cf4",18,"1d6ae"]},orientation:"portrait",subpackages:{},uuids:["c7Ck580PJDw5PV7IezrlXM","73JpqWYA5ODqaIONYPrPeh","c2MRfhT8tHwpkKkmFZ33jD","29FYIk+N1GYaeWH/q1NxQO","81yekv//tKTYi5O8YYWyAs","a9+kPy8nBHTIbo3bsiV/c0","e97GVMl6JHh5Ml5qEDdSGa","f0BIwQ8D5Ml7nTNQbh1YlS","1377KveqtBOapOukeNW5IN","71VhFCTINJM6/Ky3oX9nBT","73oJA92A5OPKpn+ZlUPAj1","82X2b0n/9JmokwqrHoitlE","b4P/PCArtIdIH38t6mlw8Y","b4fIsvN/9J0bMqzxEZsjWE","d2kHe6FidKcpV5e1aiNTQM","d55p4RolRECaXmJ9L6q/3t","d8HsitJHxOYqo801xBk8ev","e8Ueib+qJEhL6mXAHdnwbi","f9jA9dutZGHZwY+RuWj/Mw"]};(function (settings) {
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