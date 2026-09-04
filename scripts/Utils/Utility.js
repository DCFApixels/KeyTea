class Utility
{
    static parseInt(v)
    {  
        if(typeof v !== "string" || v.length <= 0)
        {
            return 0;
        }
        const result = Number.parseInt(v, 10);
        return Number.isNaN(result) ? 0 : result;
    }
}
