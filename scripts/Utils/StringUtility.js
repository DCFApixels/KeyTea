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

    static RemoveDuplicatesInSorted(sortedStr) {
        if (sortedStr.length === 0) return sortedStr; // Если строка пустая, возвращаем её
    
        let result = sortedStr[0]; // Начинаем с первого символа
    
        for (let i = 1; i < sortedStr.length; i++) {
            if (sortedStr[i] !== sortedStr[i - 1]) { // Сравниваем текущий символ с предыдущим
                result += sortedStr[i]; // Если символы разные, добавляем его к результату
            }
        }
    
        return result;
    }
}