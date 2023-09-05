const PriorityUtility = {
    GetIndex: function(forValue, inPriorities) {
        chanceMax = this.GetPrioritySum(inPriorities);

        if (chanceMax == 0)
            return 0;

        precentMax = 0;
        for (let i = 0; i < inPriorities.length; i++)
        {
            precentMin = precentMax;
            precentMax = precentMin + inPriorities[i] / chanceMax;
            if (precentMin <= forValue && forValue < precentMax)
            {
                return i;
            }
        }

        return inPriorities.length - 1;
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