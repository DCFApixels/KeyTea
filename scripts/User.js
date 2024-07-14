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

    static Load()
    {
        let json = localStorage.getItem(USER_DATA_KEY);
        let userData = JSON.parse(json);
        if(userData == null)
        {
            userData = UserData.CreateDefault(); 
        }
        return userData;
    }
    static Save(userData)
    {
        let json = JSON.stringify(userData);
        localStorage.setItem(USER_DATA_KEY, json);
    }
}

class UserSession
{
    data;
    masterPasswordHash;

    EnterMaterPassword(password)
    {
        masterPasswordHash = sha3_512(password);
    }
}