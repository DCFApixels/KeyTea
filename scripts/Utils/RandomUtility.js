const RandomUtility = {
    ZeroState: 1295307572,
    Max: 2147483647,

    NextState: function(state){
        if(state == 0)
            state = this.ZeroState;
        state ^= state << 13;
        state ^= state >> 17;
        state ^= state << 5;
        return state % this.Max;
    },
}