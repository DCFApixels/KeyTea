const PriorityUtility = {
    GetIndex: function(normalizerdValue, priorities) {
        chanceMax = this.GetPrioritySum(priorities);

        if (chanceMax == 0)
            return 0;

        precentMax = 0;
        for (let i = 0; i < priorities.length; i++)
        {
            precentMin = precentMax;
            precentMax = precentMin + priorities[i] / chanceMax;
            if (precentMin <= normalizerdValue && normalizerdValue < precentMax)
            {
                return i;
            }
        }

        return priorities.length - 1;
    },

    GetPriorityPercent: function(priority, priorities) {
        return priority / this.GetPrioritySum(priorities);
    },

    GetPrioritySum: function(priorities) {
        result = 0;
        for (let i = 0; i < priorities.length; i++)
            result += priorities[i];
        return result;
    }
}