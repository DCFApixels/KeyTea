const USER_DATA_KEY = "PasswordTea-UserData";

const UserData = {
    CreateDefault()
    {
        let charsetRecords = {};
        let charsetIds = Object.keys(builtinCharsetRecords);

        for (let i = 0; i < charsetIds.length; i++)
        {
            const record = CharsetRecords.Create(builtinCharsetRecords[charsetIds[i]]);
            charsetRecords[record.myuid] = record;
        }

        return {
            rawPasswordRecords: builtinRawPasswordRecords.map(record => RawPasswordRecords.Create(record)),
            charsetRecords: charsetRecords,
        };
    },

    Normalize(value)
    {
        if(this.IsRecord(value) == false)
        {
            return this.CreateDefault();
        }

        const defaults = this.CreateDefault();
        let charsetRecords = this.NormalizeCharsetRecords(value.charsetRecords);

        if(Object.keys(charsetRecords).length <= 0)
        {
            charsetRecords = defaults.charsetRecords;
        }

        return {
            rawPasswordRecords: this.NormalizeRawPasswordRecords(
                value.rawPasswordRecords,
                charsetRecords,
                defaults.rawPasswordRecords),
            charsetRecords: charsetRecords,
        };
    },

    NormalizeCharsetRecords(value)
    {
        if(value == null || typeof value !== "object")
        {
            return {};
        }

        const sourceIsArray = Array.isArray(value);
        const entries = Object.entries(value);
        let result = {};

        for (let i = 0; i < entries.length; i++)
        {
            const sourceKey = entries[i][0];
            const sourceRecord = entries[i][1];

            if(CharsetRecords.IsRecord(sourceRecord) == false)
            {
                continue;
            }

            let id = sourceIsArray == false && this.IsSafeId(sourceKey)
                ? sourceKey
                : sourceRecord.myuid;

            if(this.IsSafeId(id) == false)
            {
                id = MYUID.Generate();
            }

            const record = CharsetRecords.Create(Object.assign({}, sourceRecord, { myuid: id }));
            if(record.chars.length <= 0)
            {
                continue;
            }

            result[id] = record;
        }

        return result;
    },

    NormalizeRawPasswordRecords(value, charsetRecords, fallbackRecords)
    {
        let sourceRecords;

        if(Array.isArray(value))
        {
            if(value.length <= 0)
            {
                return [];
            }
            sourceRecords = value;
        }
        else if(this.IsRecord(value))
        {
            sourceRecords = Object.values(value);
            if(sourceRecords.length <= 0)
            {
                sourceRecords = fallbackRecords;
            }
        }
        else
        {
            sourceRecords = fallbackRecords;
        }

        let result = [];
        for (let i = 0; i < sourceRecords.length; i++)
        {
            if(RawPasswordRecords.IsRecord(sourceRecords[i]))
            {
                result.push(this.NormalizeRawPasswordRecord(sourceRecords[i], charsetRecords));
            }
        }

        if(result.length <= 0 && sourceRecords.length > 0)
        {
            return fallbackRecords.map(record => this.NormalizeRawPasswordRecord(record, charsetRecords));
        }

        return result;
    },

    NormalizeRawPasswordRecord(value, charsetRecords)
    {
        const record = RawPasswordRecords.Create(value);
        const availableCharsetIds = Object.keys(charsetRecords);
        let usedCharsets = [];

        for (let i = 0; i < record.usedCharsets.length; i++)
        {
            const id = record.usedCharsets[i];
            if(Object.prototype.hasOwnProperty.call(charsetRecords, id) && usedCharsets.includes(id) == false)
            {
                usedCharsets.push(id);
            }
        }

        if(usedCharsets.length <= 0)
        {
            usedCharsets = DEFAULT_USED_CHARSET_IDS.filter(
                id => Object.prototype.hasOwnProperty.call(charsetRecords, id));
        }
        if(usedCharsets.length <= 0)
        {
            usedCharsets = availableCharsetIds.slice(0, 4);
        }

        record.usedCharsets = usedCharsets;
        record.length = Math.max(record.length, usedCharsets.length, 1);
        return record;
    },

    IsRecord(value)
    {
        return value != null && typeof value === "object" && Array.isArray(value) == false;
    },

    IsSafeId(value)
    {
        return typeof value === "string"
            && value.trim().length > 0
            && value !== "__proto__"
            && value !== "prototype"
            && value !== "constructor";
    },
};

const UserDataStorage = {
    Clear()
    {
        try
        {
            localStorage.removeItem(USER_DATA_KEY);
            return true;
        }
        catch(error)
        {
            console.error("Unable to clear saved user data.", error);
            return false;
        }
    },

    Load()
    {
        try
        {
            return this.FromJson(localStorage.getItem(USER_DATA_KEY));
        }
        catch(error)
        {
            console.warn("Unable to read saved user data. Defaults were restored.", error);
            return UserData.CreateDefault();
        }
    },

    Save(userData)
    {
        try
        {
            localStorage.setItem(USER_DATA_KEY, this.ToJson(userData));
            return true;
        }
        catch(error)
        {
            console.error("Unable to save user data.", error);
            return false;
        }
    },

    FromJson(json)
    {
        if(typeof json !== "string" || json.trim().length <= 0)
        {
            return UserData.CreateDefault();
        }

        try
        {
            return UserData.Normalize(JSON.parse(json));
        }
        catch(error)
        {
            console.warn("Saved user data is invalid. Defaults were restored.", error);
            return UserData.CreateDefault();
        }
    },

    ToJson(userData)
    {
        return JSON.stringify(UserData.Normalize(userData));
    },
};

class UserSession
{
    data;
    masterPasswordKey = new Uint8Array();

    async EnterMasterPassword(password)
    {
        this.ClearMasterPassword();
        this.masterPasswordKey = await PasswordKdf.DeriveMasterKey(password);
    }

    ClearMasterPassword()
    {
        this.masterPasswordKey.fill(0);
        this.masterPasswordKey = new Uint8Array();
    }
}
