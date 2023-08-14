class Charset
{
    name = ""
    #chars = ""
    priority = 1

    get keyName()
    {
        return this.name.trim().replace(/\s+/g, ' ').toLowerCase();
    }

    get chars()
    {
        return this.#chars;
    }
    set chars(chars)
    {
        this.#chars = Charset.#SortCharset(chars);
    }

    constructor(name, chars, priority) 
    {
        if(name != null)
        {
            this.name = name;
        }
        if(chars != null)
        {
            this.#chars = Charset.#SortCharset(chars);
        }
        if(priority != null)
        {
            this.priority = priority;
        }
    } 

    static #SortCharset(str)
    {
        var charArray = str.split("");
        charArray.sort(function(a, b) {
            return a.charCodeAt(0) - b.charCodeAt(0);
        });
        return charArray.join("");;
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