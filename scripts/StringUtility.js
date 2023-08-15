class StringUtility
{
    static SimplifyString(str)
    {
        //упрощение строки для упрощения запоминания пользователем
        return str.trim() 
            .replace(/\s+/g, ' ')
            .toLowerCase()
            .replace("\\", "/")
            .replace("—", "-")
            .replace(/["`]/g, "'");
    }

    static SortCharset(str)
    {
        //для детерминированности вычислений строки с набором символов сортируются по их юникоду
        let charArray = str.split("");
        charArray.sort(function(a, b) {
            return a.charCodeAt(0) - b.charCodeAt(0);
        });
        return charArray.join("");
    }
}