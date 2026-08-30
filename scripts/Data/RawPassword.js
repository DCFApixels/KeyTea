const DEFAULT_USED_CHARSET_IDS = Object.freeze([
    "071050236146145001000000000000000000000000000003", // En Lower
    "071050236146145001000000000000000000000000000004", // En Upper
    "071050236146145001000000000000000000000000000002", // Specials
    "071050236146145001000000000000000000000000000001", // Numbers
]);

const RawPasswordRecords = {
    Create(values = {})
    {
        if(this.IsRecord(values) == false)
        {
            values = {};
        }

        return {
            myuid: this.NormalizeId(values.myuid),
            name: this.NormalizeName(values.name),
            userName: typeof values.userName === "string" ? values.userName : "",
            usedCharsets: this.NormalizeCharsetIds(values.usedCharsets),
            length: this.NormalizePositiveInteger(values.length, 12),
            version: this.NormalizePositiveInteger(values.version, 1),
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
            return value;
        }
        return "Unnamed";
    },

    NormalizeCharsetIds(value)
    {
        let source = Array.isArray(value) ? value : DEFAULT_USED_CHARSET_IDS;
        let result = [];

        for (let i = 0; i < source.length; i++)
        {
            const id = source[i];
            if(typeof id === "string" && id.trim().length > 0 && result.includes(id) == false)
            {
                result.push(id);
            }
        }

        return result;
    },

    NormalizePositiveInteger(value, fallback)
    {
        let number = typeof value === "number" ? value : Number(value);
        if(Number.isSafeInteger(number) && number > 0)
        {
            return number;
        }
        return fallback;
    },

    GenerateRawString(record)
    {
        let str = record.version + record.name.trim() + record.version + record.userName.trim() + record.version;
        return StringUtility.SimplifyString(str);
    },
};

const builtinRawPasswordRecords = [
    RawPasswordRecords.Create({
        myuid: "033073237146145001000000000000000000000000000001",
        name: "Google",
    }),
    RawPasswordRecords.Create({
        myuid: "033073237146145001000000000000000000000000000002",
        name: "Facebook",
    }),
];
