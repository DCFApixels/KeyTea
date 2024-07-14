class CharsetRecord
{
    name = ""
    #chars = ""
    priority = 1

    get keyName() { return StringUtility.SimplifyString(this.name); }

    get chars() { return this.#chars; }
    set chars(value) { this.#chars = StringUtility.SortCharset(value); }

    get length() { return this.#chars.length; }

    constructor(name, chars, priority) 
    {
        if(name != null) { this.name = name; }
        if(chars != null) { this.chars = chars; }
        if(priority != null) { this.priority = priority; }
    } 
}

const builtinCharsetRecords = {
    "Numbers": new CharsetRecord("Numbers", "0123456789", 4),
    "Specials": new CharsetRecord("Specials", ".,~!@#$%^&*()`'\"<>?/\\{}[]:;|+=_-", 1),
    "En Lower": new CharsetRecord("En Lower", "abcdefghijklmnopqrstuvwxyz", 2),
    "En Upper": new CharsetRecord("En Upper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2),
    "Ru Lower": new CharsetRecord("Ru Lower", "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", 1),
    "Ru Upper": new CharsetRecord("Ru Upper", "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ", 1),
}