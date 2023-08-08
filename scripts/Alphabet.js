class Alphabet
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
    "Numbers": new Alphabet("Numbers", "0123456789", 1),
    "Specials": new Alphabet("Specials", ".,~!@#$%^&*()`'\"<>?/\\{}[]:;|+=_-", 1),
    "En Lower": new Alphabet("En Lower", "abcdefghijklmnopqrstuvwxyz", 1),
    "En Upper": new Alphabet("En Upper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1),
    "Ru Lower": new Alphabet("Ru Lower", "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", 1),
    "Ru Upper": new Alphabet("Ru Upper", "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ", 1),
}