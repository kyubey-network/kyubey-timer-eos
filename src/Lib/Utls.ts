export let GetSymbolValue = function (symbolStr: string) {
    let targetArr = symbolStr.split(" ");
    return {
        Value: parseInt(targetArr[0]),
        Symbol: targetArr[1]
    }
}