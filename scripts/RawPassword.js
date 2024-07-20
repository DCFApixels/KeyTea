class RawPasswordRecord
{
    name = "Unnamed";
    userName = "";
    usedCharsets = ["En Lower", "En Upper", "Specials", "Numbers"];
    length = 12;
    version = 1;

    get keyName() { return StringUtility.SimplifyString(this.name); }

    constructor(name, userName, usedCharsets, length) 
    {
        if(name != null) { this.name = name; }
        if(userName != null) { this.userName = userName; }
        if(usedCharsets != null) { this.usedCharsets = usedCharsets; }
        if(length != null) { this.length = length; }
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

const builtinRawPasswordRecords = [
    new RawPasswordRecord("Google"),
    new RawPasswordRecord("Facebook"),
];