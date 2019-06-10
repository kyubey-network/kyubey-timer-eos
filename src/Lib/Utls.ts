export let GetSymbolValue = function (symbolStr: string) {
    let targetArr = symbolStr.split(" ");
    return {
        Value: parseFloat(targetArr[0]),
        Symbol: targetArr[1]
    }
}