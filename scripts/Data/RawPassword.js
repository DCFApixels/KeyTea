class RawPasswordRecord
{
    myuid = "";
    name = "Unnamed";
    userName = "";
    usedCharsets = [
        "071050236146145001000000000000000000000000000003", //En Lower
        "071050236146145001000000000000000000000000000004", //En Upper
        "071050236146145001000000000000000000000000000002", //Specials
        "071050236146145001000000000000000000000000000001", //Numbers
    ];
    length = 12;
    version = 1;

    get keyName() { return StringUtility.SimplifyString(this.name); }

    constructor(name, userName, usedCharsets, length) 
    {
        this.myuid = MYUID.Generate();
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

    SetMyuid(myuid)
    {
        this.myuid = myuid;
        return this;
    }
}

const builtinRawPasswordRecords = [
    new RawPasswordRecord("Google").SetMyuid("033073237146145001000000000000000000000000000001"),
    new RawPasswordRecord("Facebook").SetMyuid("033073237146145001000000000000000000000000000002"),
];

//console.log(builtinRawPasswordRecords);
