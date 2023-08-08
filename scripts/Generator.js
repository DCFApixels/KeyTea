const textEncoder = new TextEncoder();

function GeneratePassword(rawString, masterPassword)
{
    let hashString = sha3_512(rawString);
    let bytes = textEncoder.encode(hashString);

    
}