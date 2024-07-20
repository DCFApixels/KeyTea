
class ScreensController
{
    screens = new Map();

    session;

    GetScreen(screenType)
    {
        let screen = this.screens.get(screenType.prototype);
        return screen;
    }

    AddScreen(screen)
    {
        let screenType = Object.getPrototypeOf(screen);
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

var screensController = new ScreensController();

screensController.AddScreen(new MasterPasswordController(userSession, new MasterPasswordScreenView(), screensController));
screensController.AddScreen(new SelectRawPasswordController(userSession, new SelectScreenView(), screensController));
screensController.AddScreen(new EditPasswordController(userSession, new EditPasswordScreenView(), screensController));

screensController.GetScreen(SelectRawPasswordController).Close();