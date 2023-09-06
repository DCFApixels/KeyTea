class Charset
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

const builtinAlphabets = {
    "Numbers": new Charset("Numbers", "0123456789", 1),
    "Specials": new Charset("Specials", ".,~!@#$%^&*()`'\"<>?/\\{}[]:;|+=_-", 1),
    "En Lower": new Charset("En Lower", "abcdefghijklmnopqrstuvwxyz", 1),
    "En Upper": new Charset("En Upper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1),
    "Ru Lower": new Charset("Ru Lower", "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", 1),
    "Ru Upper": new Charset("Ru Upper", "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ", 1),
}