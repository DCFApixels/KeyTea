const RandomUtility = {
    NextState: function(state){
        if(state == 0)
            state = 1295307572;
        state ^= state << 13;
        state ^= state >> 17;
        state ^= state << 5;
        return state;
    },
}