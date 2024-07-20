const textEncoder = new TextEncoder();
const randomRootSeed = 1171693525;

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function GeneratePasswordWithDefaultHash(rawPassword, allCharsets, masterPassword)
{
    return GeneratePassword(rawPassword, allCharsets, sha3_512(masterPassword));
}
function GeneratePassword(rawPassword, allCharsets, masterPasswordHash)
{
    //let rawString = RawPasswordRecord.prototype.GenerateRawString(rawPassword);
    let rawString = rawPassword.GenerateRawString();
    let hashString = sha3_512(rawString);
    let rawPasswordBytes = textEncoder.encode(hashString);
    let masterPasswordHashBytes = textEncoder.encode(masterPasswordHash);
    let charsets = [];

    //перемешиваю мастер пароль и рав пароль, но так чтоб значения в массиве не выходила за пределы байта.
    for (let i = 0; i < rawPasswordBytes.length; i++)
    {
        rawPasswordBytes[i] = (rawPasswordBytes[i] + masterPasswordHashBytes[i % masterPasswordHashBytes.length]) % 256;
    }
    for (let i = 0; i < rawPassword.usedCharsets.length; i++)
    {
        const charset = allCharsets[rawPassword.usedCharsets[i]];
        charsets.push(charset);
    } 

    if(charsets.length <= 0)
    {
        throw new Error("нет выбранных наборов символов");
    }
    if(rawPassword.length < charsets.length)
    {
        throw new Error("длинна пароля меньше числа выбранных наборов символов");
    }

    let passwordLength = rawPassword.length - charsets.length;

    let randomState = randomRootSeed;
    let rawPasswordBytesSum = 0;
    for (let i = 0; i < rawPasswordBytes.length; i++)
    {
        rawPasswordBytesSum += rawPasswordBytes[i];
    }
    randomState = randomState ^ RandomUtility.NextState(rawPasswordBytesSum);

    let result = [];
    let index = 0;
    for (let i = 0; i < passwordLength; i++)
    {
        let byteValue;
        byteValue = rawPasswordBytes[i % rawPasswordBytes.length];
        randomState = Math.abs(RandomUtility.NextState(randomState + byteValue));

        let charsetIndex = GetIndex(randomState, charsets);

        byteValue = rawPasswordBytes[(i + 1) % rawPasswordBytes.length];
        randomState = Math.abs(RandomUtility.NextState(randomState + byteValue));

        let charset = charsets[charsetIndex];

        index = randomState % charset.chars.length;
        result.push(charset.chars.charAt(index));
    }

    //вставка по одному символу из каждого набора, для гарантированного наличия даже при низком приоритете.
    let tempCharsets = charsets.slice();
    let tempCharsetsLength = charsets.length;

    randomState = Math.abs(RandomUtility.NextState(randomState));
    let indexInResult = (randomState + rawPasswordBytes[rawPasswordBytes.length - 1]) % passwordLength;

    for (let i = 0; i < charsets.length; i++)
    {
        //берем в рандомном порядке чарсеты, так чтоб они не повторялись
        randomState = Math.abs(RandomUtility.NextState(randomState));
        let tempIndex = randomState % tempCharsetsLength;
        const charset = tempCharsets[tempIndex];
        tempCharsets[tempIndex] = tempCharsets[tempCharsetsLength - 1];
        tempCharsetsLength--;
        //получен рандомный чарсет

        let byteValue = rawPasswordBytes[i % rawPasswordBytes.length];

        randomState = Math.abs(RandomUtility.NextState(randomState + byteValue));
        indexInResult = (indexInResult + randomState) % passwordLength;
        index = randomState % charset.length;

        result.insert(indexInResult, charset.chars.charAt(index));
    }
    //console.log("-----------");
    return result.join('');
}

function GetIndex(value, charsets) 
{
    let sum = 0;

    for (let i = 0; i < charsets.length; i++) 
    {
        const charset = charsets[i];
        sum += charset.priority;
    } 

    if (sum == 0) 
        return 0;

    let normalizedValue = value % sum; 

    let n = 0;
    for (let i = 0; i < charsets.length; i++)
    {
        n += charsets[i].priority;
        if(n > normalizedValue)
            return i;
    }

    return priorities.length - 1;
}

console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "1"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "1"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "2"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "2"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "11"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "11"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "22"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "33"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "44"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "55"));
console.log("----");
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "33"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "34"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "43"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "44"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "4"));
console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Google", null, null, 12), builtinCharsetRecords, "3"));
//console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Facebook", builtinAlphabets, "123")));
//console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("VK", builtinAlphabets, "123")));
//console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("QQ", builtinAlphabets, "123")));
//console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Wechat", builtinAlphabets, "123")));
//console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Gmail", builtinAlphabets, "123")));
//console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Yandex", builtinAlphabets, "123")));
//console.log(GeneratePasswordWithDefaultHash(new RawPasswordRecord("Linkedin", builtinAlphabets, "123")));