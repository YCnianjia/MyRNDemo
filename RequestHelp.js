import MD5 from 'react-native-md5';

//排序
export let SortData={

}

SortData.sortBody = (params) => {
    var map = params
    map['_from'] = 'yjk'
    map['appId'] = '101'

    var keys = []
    for (let i in map) {
        keys.push(i)
        // console.log('key:'+i+'value:'+map[i])
    }
    let sorts = keys.sort()
    var sortMap = {}
    for (let i in sorts) {
        // console.log('key1:'+sorts[i]+'value1:'+map[sorts[i]])
        sortMap[sorts[i]] = map[sorts[i]]
    }
    // console.log('排序前'+JSON.stringify(map))
    let appSecret = '140c3df6-ba0f-4889-8ae7-23eb1aef89c0'
    let sortBase = JSON.stringify(sortMap) + appSecret
    // console.log('排序后'+sortBase)
    let md5Str = MD5.hex_md5(sortBase)
    // console.log('hex_md5:'+md5Str)
    sortMap['sign'] = md5Str
    return sortMap
}

//数据请求签名加密
export function YJKSortBody(params){
    var map = params
    map['_from'] = 'yjk'
    map['appId'] = '101'

    var keys = []
    for (let i in map) {
        keys.push(i)
        // console.log('key:'+i+'value:'+map[i])
    }
    let sorts = keys.sort()
    var sortMap = {}
    for (let i in sorts) {
        // console.log('key1:'+sorts[i]+'value1:'+map[sorts[i]])
        sortMap[sorts[i]] = map[sorts[i]]
    }
    // console.log('排序前'+JSON.stringify(map))
    let appSecret = '140c3df6-ba0f-4889-8ae7-23eb1aef89c0'
    let sortBase = JSON.stringify(sortMap) + appSecret
    // console.log('排序后'+sortBase)
    let md5Str = MD5.hex_md5(sortBase)
    // console.log('hex_md5:'+md5Str)
    sortMap['sign'] = md5Str
    return sortMap
}