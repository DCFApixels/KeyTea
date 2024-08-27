class CharsetRecord
{
    myuid = "";
    name = "";
    _chars = "";
    priority = 1;

    get keyName() { return StringUtility.SimplifyString(this.name); }

    get chars() { return this._chars; }
    set chars(value) { this._chars = StringUtility.SortCharset(value); }

    get length() { return this._chars.length; }

    constructor(name, chars, priority) 
    {
        this.myuid = MYUID.Generate();
        if(name != null) { this.name = name; }
        if(chars != null) { this.chars = chars; }
        if(priority != null) { this.priority = priority; }
    } 
    SetMyuid(myuid)
    {
        this.myuid = myuid;
        return this;
    }
}

function AddRecord(table, record)
{
    table[record.myuid] = record;
}

const builtinCharsetRecords = {};
AddRecord(builtinCharsetRecords, new CharsetRecord("Numbers", "0123456789", 4)
    .SetMyuid("071050236146145001000000000000000000000000000001"));
AddRecord(builtinCharsetRecords, new CharsetRecord("Specials", ".,~!@#$%^&*()`'\"<>?/\\{}[]:;|+=_-", 1)
    .SetMyuid("071050236146145001000000000000000000000000000002"));
AddRecord(builtinCharsetRecords, new CharsetRecord("En Lower", "abcdefghijklmnopqrstuvwxyz", 2)
    .SetMyuid("071050236146145001000000000000000000000000000003"));
AddRecord(builtinCharsetRecords, new CharsetRecord("En Upper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2)
    .SetMyuid("071050236146145001000000000000000000000000000004"));
AddRecord(builtinCharsetRecords, new CharsetRecord("Ru Lower", "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", 1)
    .SetMyuid("071050236146145001000000000000000000000000000005"));
AddRecord(builtinCharsetRecords, new CharsetRecord("Ru Upper", "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ", 1)
    .SetMyuid("071050236146145001000000000000000000000000000006"));

console.log(builtinCharsetRecords);