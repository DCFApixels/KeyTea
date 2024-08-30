//    оставь  надежду
//        совесть
//      вежливость
//     свое  мнение
//       уважение
//      воспитание
//  критическое мышление
// а также 90% своего iq
//   всяк сюда входящий

// в общем тут получилась посредственная архитектура, тяп-ляп

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

var userSession = new UserSession;
userSession.data = UserData.Load();

var screensController = new ScreensController();

screensController.AddScreen(new MasterPasswordController(userSession, new MasterPasswordScreenView(), screensController));
screensController.AddScreen(new SelectRawPasswordController(userSession, new SelectScreenView(), screensController));
screensController.AddScreen(new EditPasswordController(null, new EditPasswordScreenView(), screensController));
screensController.AddScreen(new EditCharsetController(null, new EditCharsetScreenView(), screensController));

screensController.GetScreen(SelectRawPasswordController).Close();