const textEncoder = new TextEncoder();
const randomRootSeed = 1171693525;

function GeneratePassword(rawPassword, allCharsets, masterPasswordHash)
{
    allCharsets = builtinAlphabets;
    masterPasswordHash = "腾飞";

    let randomState = randomRootSeed;

    let rawString = rawPassword.GenerateRawString();
    let hashString = sha3_512(rawString);
    let rawPasswordBytes = textEncoder.encode(hashString);
    let masterPasswordHashBytes = textEncoder.encode(masterPasswordHash);

    //перемешиваю матер пароль и рав пароль, но так чтоб значения в массиве не выходила за пределы байта
    for (let i = 0; i < rawPasswordBytes.length; i++) {
        rawPasswordBytes[i] = (rawPasswordBytes[i] + masterPasswordHashBytes[i % masterPasswordHashBytes.length]) % 256;
    }

    let charsets = [];
    let charsetsBlock = "";
    let charsetsChunkBytesCount = 0;
    
    for (let i = 0; i < rawPassword.usedCharsets.length; i++) {
        const charset = allCharsets[rawPassword.usedCharsets[i]];
        charsets.push(charset);
        charsetsBlock += charset.chars;
    } 
    charsetsChunkBytesCount = charsetsBlock.length / 256;


    let result = [];
    let bytesMouse = 0;
    let index = 0;
    for (let i = 0; i < rawPassword.length; i++) {
        randomState = Math.abs(RandomUtility.NextState(randomState));

        let chunkSum = 0;
        for (let j = 0; j < charsetsChunkBytesCount; j++) {
            chunkSum += rawPasswordBytes[bytesMouse];
            bytesMouse++;
            if(bytesMouse >= rawPasswordBytes.length)
                bytesMouse = bytesMouse % rawPasswordBytes.length;
        } 

        index = (randomState + chunkSum) % charsetsBlock.length;
        result.push(charsetsBlock.charAt(index));

        //console.log("-----------" + i);
        //console.log("rnd " + randomState);
        //console.log(index);
        //console.log(result.join(''));

    }
    //console.log("-----------");
    //console.log("-----------");
    //console.log(result.join(''));

    //вставка по одному символу из каждого набора, для гарантированного наличия даже при низком преоритете.
    let resultIndex = rawPasswordBytes[rawPasswordBytes.length - 1];//просто беру с конца байт для дальнейших вычислений, так как он вероятнее всего не использовался еще.
    for (let i = 0; i < charsets.length; i++) {
        const charset = charsets[i];
        randomState = Math.abs(RandomUtility.NextState(randomState));
        resultIndex = (resultIndex + randomState) % rawPassword.length;

        let chunkSum = 0;
        for (let j = 0; j < charsetsChunkBytesCount; j++) {
            chunkSum += rawPasswordBytes[bytesMouse];
            bytesMouse++;
            if(bytesMouse >= rawPasswordBytes.length)
                bytesMouse = bytesMouse % rawPasswordBytes.length;
        } 

        index = (randomState + chunkSum) % charset.length;
        result[resultIndex] = charset.chars.charAt(index);
        //console.log(result.join(''));

    }

    //console.log("-----------");
    //console.log("-----------");

    return result.join('');
}

console.log(GeneratePassword(new RawPassword("Google")));
console.log(GeneratePassword(new RawPassword("Facebook")));
console.log(GeneratePassword(new RawPassword("VK")));
console.log(GeneratePassword(new RawPassword("QQ")));
console.log(GeneratePassword(new RawPassword("Wechat")));
console.log(GeneratePassword(new RawPassword("Gmail")));
console.log(GeneratePassword(new RawPassword("Yandex")));
console.log(GeneratePassword(new RawPassword("Linkedin")));