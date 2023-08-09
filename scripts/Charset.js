class Charset
{
    keyName = ""
    chars = ""
    priority = 1
    constructor(keyName, chars, priority) 
    {
        if(keyName != null)
            this.keyName = keyName;
        if(chars != null)
            this.chars = chars;
        if(priority != null)
            this.priority = priority;
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