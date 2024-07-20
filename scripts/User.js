const USER_DATA_KEY = "PasswordCalculator-UserData";

class UserData
{
    rawPasswordRecords;
    charsetRecords;

    static CreateDefault()
    {
        let ud = new UserData();
        ud.rawPasswordRecords = Object.assign(builtinRawPasswordRecords);
        ud.charsetRecords = Object.assign(builtinCharsetRecords);
        return ud;
    }

    static Clear()
    {
        localStorage.clear();
    }

    static Load()
    {
        //this.Clear(); 
        
        let json = localStorage.getItem(USER_DATA_KEY);
        let userData = this.FromJson(json);
        if(userData == null)
        {
            userData = UserData.CreateDefault(); 
        }
        this.Save(userData);
        return userData;
    }
    static Save(userData)
    {
        let json = this.ToJson(userData);
        localStorage.setItem(USER_DATA_KEY, json);
    }

    static FromJson(json)
    {
        let userData = JSON.parse(json);

        if(userData == null) { return null; }
        //TODO блэт, ктож знал что класс JSON не умеет сохранять прототипы классов
        //пришлось написать костыль, который по хорошему тоже бы переработать.
        //В общем приходится агрессивно вручную восстанавливать прототипы после загрузки.
        //Чтобы исправить нужно просто убрать все поведение из объектов, одних только данных вполне достаточно
        let rawPasswordRecordKeys = Object.keys(userData.rawPasswordRecords);
        let charsetRecordKeys = Object.keys(userData.charsetRecords);
        for (let i = 0; i < rawPasswordRecordKeys.length; i++)
        {
            const element = userData.rawPasswordRecords[rawPasswordRecordKeys[i]];
            let obj = new RawPasswordRecord();
            Object.assign(obj, element);
            userData.rawPasswordRecords[rawPasswordRecordKeys[i]] = obj;
        }
        for (let i = 0; i < charsetRecordKeys.length; i++)
        {
            const element = userData.charsetRecords[charsetRecordKeys[i]];
            let obj = new CharsetRecord();
            Object.assign(obj, element);
            userData.charsetRecords[charsetRecordKeys[i]] = obj;
        }

        return userData;
    }
    static ToJson(userData)
    {
        //TODO по факту это костыль, тут я плохо продумал структуру данных, так что нужно будет переработать это
        //В общем проблема в том что ключи и строки в полях name должны быть равны, 
        //и для этого при изменении name нужно обновлять ключ
        //PS возможно все не так плохо 
        let rawPasswordRecordKeys = Object.keys(userData.rawPasswordRecords);
        let charsetRecordKeys = Object.keys(userData.charsetRecords);
        for (let i = 0; i < rawPasswordRecordKeys.length; i++)
        {
            const key = rawPasswordRecordKeys[i];
            const element = userData.rawPasswordRecords[key];
            if(key != element.name)
            {
                userData.rawPasswordRecords[element.name] = element;
                delete userData.rawPasswordRecords[key];
            }
        }
        for (let i = 0; i < charsetRecordKeys.length; i++)
        {
            const key = charsetRecordKeys[i];
            const element = userData.charsetRecords[key];
            if(key != element.name)
            {
                userData.charsetRecords[element.name] = element;
                delete userData.charsetRecords[key];
            }
        }

        return JSON.stringify(userData);
    }
}

class UserSession
{
    data;
    masterPasswordHash = "";

    EnterMasterPassword(password)
    {
        //TODO доработать хеширование мастер пароля
        this.masterPasswordHash = GeneratePasswordWithDefaultHash(new RawPasswordRecord("Master", null, null, 32), builtinCharsetRecords, password);
        console.log(this.masterPasswordHash);
    }
}