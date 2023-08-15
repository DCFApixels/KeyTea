class RawPassword
{
    name = "Unnamed"
    userName = ""
    usedSymbols = ["En Lower", "En Upper", "Specials", "Numbers"]
    passwordLength = 12
    version = 1

    get keyName()
    {
        return StringUtility.SimplifyString(this.name);
    }

    constructor(name, userName, usedSymbols, passwordLength) 
    {
        if(name != null)
        {
            this.name = name;
        }
        if(userName != null)
        {
            this.userName = userName;
        }
        if(usedSymbols != null)
        {
            this.usedSymbols = usedSymbols;
        }
        if(passwordLength != null)
        {
            this.passwordLength = passwordLength;
        }
    }

    GenerateRawString() 
    {
        let str = this.version + this.name.trim() + this.version + this.userName.trim() + this.version;
        return StringUtility.SimplifyString(str);
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