class RawPassword
{
    keyName = "Unnamed"
    userName = ""
    usedSymbols = ["En Lower", "En Upper", "Specials", "Numbers"]
    passwordLength = 12
    version = 1

    constructor(keyName, userName, usedSymbols, passwordLength) 
    {
        if(keyName != null)
            this.keyName = keyName;
        if(userName != null)
            this.userName = userName;
        if(usedSymbols != null)
            this.usedSymbols = usedSymbols;
        if(passwordLength != null)
            this.passwordLength = passwordLength;
    }

    GenerateRawString() 
    {
        let str = this.version + this.keyName + this.version + this.userName + this.version;
        str = str.toLowerCase(); //чтоб было проще запоминать, убираем зависимость от регистров
        str = str.replace(/\s+/g, ' '); //так же убираем дублирующиеся пробелы
        return str;
    }

    UpVersion()
    {
        this.version++;
    }
}

const builtinRawPasswords = {
    "Google": new RawPassword("Google"),
    "Facebook": new RawPassword("Facebook")
}