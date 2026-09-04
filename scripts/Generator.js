const textEncoder = new TextEncoder();
const randomRootSeed = 1171693525;

function GeneratePassword(rawPassword, allCharsets, masterPasswordKey)
{
    let rawPasswordString = RawPasswordRecords.GenerateRawString(rawPassword);
    let charsetsArray = SelectUsedCharsets(rawPassword, allCharsets);

    if(charsetsArray.length <= 0)
    {
        throw new Error("нет выбранных наборов символов");
    }
    if(rawPassword.length < charsetsArray.length)
    {
        throw new Error("длинна пароля меньше числа выбранных наборов символов");
    }

    if((masterPasswordKey instanceof Uint8Array) === false || masterPasswordKey.length <= 0)
    {
        throw new Error("ключ мастер-пароля отсутствует");
    }

    return DefaultGeneratePasswordAlgorithm(rawPasswordString, masterPasswordKey, charsetsArray, rawPassword.length);
}





function DefaultGeneratePasswordAlgorithm(rawPasswordString, masterPasswordKey, charsetsArray, resultPasswordLength)
{
    let rawPasswordHash = sha3_512(rawPasswordString);
    let result = CombineAndConvertToPassword(rawPasswordHash, masterPasswordKey, charsetsArray, resultPasswordLength);
    return result;
}



function CombineAndConvertToPassword(rawPasswordHash, masterPasswordKey, charsetsArray, resultPasswordLength)
{
    let rawPasswordHashBytes = textEncoder.encode(rawPasswordHash);

    // Перемешиваю мастер пароль и рав пароль. <
    let acm = rawPasswordHashBytes[resultPasswordLength % rawPasswordHashBytes.length] ^ resultPasswordLength;
    for (let i = 0; i < rawPasswordHashBytes.length; i++)
    {
        acm = RandomUtility.NextState(acm ^ rawPasswordHashBytes[i] ^ ~masterPasswordKey[i % masterPasswordKey.length]);
        rawPasswordHashBytes[i] = acm % 256;
    }
    // >

    // Подготовка
    if(charsetsArray.length <= 0)
    {
        throw new Error("нет выбранных наборов символов");
    }
    if(resultPasswordLength < charsetsArray.length)
    {
        throw new Error("длинна пароля меньше числа выбранных наборов символов");
    }

    let passwordLength = resultPasswordLength - charsetsArray.length;
    // >

    // Установка начального randomState <
    let randomState = randomRootSeed;
    let rawPasswordHashBytesSum = 0;
    for (let i = 0; i < rawPasswordHashBytes.length; i++)
    {
        rawPasswordHashBytesSum += rawPasswordHashBytes[i];
    }
    randomState = randomState ^ RandomUtility.NextState(rawPasswordHashBytesSum);
    // >

    // Генерация пароля <
    let result = [];
    let index = 0;
    for (let i = 0; i < passwordLength; i++)
    {
        let byteValue = rawPasswordHashBytes[i % rawPasswordHashBytes.length];
        randomState = Math.abs(RandomUtility.NextState(randomState + byteValue));

        let charsetIndex = GetIndex(randomState, charsetsArray);

        byteValue = rawPasswordHashBytes[(i + 1) % rawPasswordHashBytes.length];
        randomState = Math.abs(RandomUtility.NextState(randomState + byteValue));

        let charset = charsetsArray[charsetIndex];

        index = randomState % charset.chars.length;
        result.push(charset.chars.charAt(index));
    }
    // >

    // Вставка в пароль по одному символу из каждого набора, для гарантированного наличия даже при низком приоритете. <
    let tempCharsets = charsetsArray.slice();
    let tempCharsetsLength = charsetsArray.length;

    randomState = Math.abs(RandomUtility.NextState(randomState));
    let indexInResult = (randomState + rawPasswordHashBytes[rawPasswordHashBytes.length - 1]) % passwordLength;

    for (let i = 0; i < charsetsArray.length; i++)
    {
        //берем в рандомном порядке чарсеты, так чтоб они не повторялись
        randomState = Math.abs(RandomUtility.NextState(randomState));
        let tempIndex = randomState % tempCharsetsLength;
        const charset = tempCharsets[tempIndex];
        tempCharsets[tempIndex] = tempCharsets[tempCharsetsLength - 1];
        tempCharsetsLength--;
        //получен рандомный чарсет

        let byteValue = rawPasswordHashBytes[i % rawPasswordHashBytes.length];

        randomState = Math.abs(RandomUtility.NextState(randomState + byteValue));
        indexInResult = (indexInResult + randomState) % passwordLength;
        index = randomState % charset.chars.length;

        result.splice(indexInResult, 0, charset.chars.charAt(index));
    }
    // >


    let jointedResult = result.join('');
    return jointedResult;


}




function SelectUsedCharsets(rawPassword, allCharsets)
{
    let charsets = [];
    for (let i = 0; i < rawPassword.usedCharsets.length; i++)
    {
        const charset = allCharsets[rawPassword.usedCharsets[i]];
        charsets.push(charset);
    } 
    return charsets;
}
function GetIndex(value, charsets) 
{
    let sum = 0;

    for (let i = 0; i < charsets.length; i++) 
    {
        sum += charsets[i].priority;
    } 

    if (sum === 0)
    {
        return 0;
    }

    let normalizedValue = value % sum; 

    let n = 0;
    for (let i = 0; i < charsets.length; i++)
    {
        n += charsets[i].priority;
        if(n > normalizedValue)
        {
            return i;
        }
    }

    return charsets.length - 1;
}
