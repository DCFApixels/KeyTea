
class App
{
    screens = new Map();

    session;

    GetScreen(screenType)
    {
        let screen = this.screens.get(screenType);
        return screen;
    }

    AddScreen(screen)
    {
        let screenType = screen.prototype;
        this.screens.set(screenType, screen);
        return this;
    }
}

class User
{
    userData;
    session;
}

var userSession = new UserSession;
userSession.data = UserData.Load();

var app = new App();

app.AddScreen(new MasterPasswordScreenView());
app.AddScreen(new SelectScreen());