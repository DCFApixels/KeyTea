class UserData{

}

class UserSessionData{
    masterPasswordHash;

    EnterMaterPassword(password)
    {
        masterPasswordHash = sha3_512(password);
    }
}

userData = new UserData(); 
userSessionData = new UserSessionData(); 