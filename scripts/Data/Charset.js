const CharsetRecords = {
    Create(values = {})
    {
        if(this.IsRecord(values) == false)
        {
            values = {};
        }

        return {
            myuid: this.NormalizeId(values.myuid),
            name: this.NormalizeName(values.name),
            chars: this.NormalizeChars(values.chars),
            priority: this.NormalizePriority(values.priority),
        };
    },

    IsRecord(value)
    {
        return value != null && typeof value === "object" && Array.isArray(value) == false;
    },

    NormalizeId(value)
    {
        if(typeof value === "string" && value.trim().length > 0)
        {
            return value;
        }
        return MYUID.Generate();
    },

    NormalizeName(value)
    {
        if(typeof value === "string" && value.trim().length > 0)
        {
            return value.normalize("NFC");
        }
        return "Unnamed";
    },

    NormalizeChars(value)
    {
        if(typeof value !== "string")
        {
            return "";
        }

        const normalizedValue = value.normalize("NFC");
        return StringUtility.RemoveDuplicatesInSorted(StringUtility.SortCharset(normalizedValue));
    },

    NormalizePriority(value)
    {
        let number = typeof value === "number" ? value : Number(value);
        if(Number.isSafeInteger(number) && number >= 0)
        {
            return number;
        }
        return 1;
    },
};

const builtinCharsetRecords = {};

function AddBuiltinCharset(values)
{
    const record = CharsetRecords.Create(values);
    builtinCharsetRecords[record.myuid] = record;
}

AddBuiltinCharset({
    myuid: "071050236146145001000000000000000000000000000001",
    name: "Numbers",
    chars: "0123456789",
    priority: 3,
});
AddBuiltinCharset({
    myuid: "071050236146145001000000000000000000000000000002",
    name: "Specials",
    chars: ".,~!@#$%^&*()`'\"<>?/\\{}[]:;|+=_-",
    priority: 1,
});
AddBuiltinCharset({
    myuid: "071050236146145001000000000000000000000000000003",
    name: "En Lower",
    chars: "abcdefghijklmnopqrstuvwxyz",
    priority: 2,
});
AddBuiltinCharset({
    myuid: "071050236146145001000000000000000000000000000004",
    name: "En Upper",
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    priority: 2,
});
AddBuiltinCharset({
    myuid: "071050236146145001000000000000000000000000000005",
    name: "Ru Lower",
    chars: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
    priority: 2,
});
AddBuiltinCharset({
    myuid: "071050236146145001000000000000000000000000000006",
    name: "Ru Upper",
    chars: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
    priority: 2,
});
