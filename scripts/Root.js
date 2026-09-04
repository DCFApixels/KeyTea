//    оставь  надежду
//        совесть
//      вежливость
//     свое  мнение
//       уважение
//      воспитание
//  критическое мышление
// а также 90% своего iq
//   всяк сюда входящий

// в общем архитекутра тут не бестпрактис

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
userSession.data = UserDataStorage.Load();

var screensController = new ScreensController();

screensController.AddScreen(new MasterPasswordController(userSession, new MasterPasswordScreenView(), screensController));
screensController.AddScreen(new SelectRawPasswordController(userSession, new SelectScreenView(), screensController));
screensController.AddScreen(new EditPasswordController(null, new EditPasswordScreenView(), screensController));
screensController.AddScreen(new EditCharsetController(null, new EditCharsetScreenView(), screensController));

screensController.GetScreen(SelectRawPasswordController).Close();

if("serviceWorker" in navigator && window.isSecureContext)
{
    window.addEventListener("load", () =>
    {
        navigator.serviceWorker.register("./service-worker.js").catch(error =>
        {
            console.warn("Unable to register the offline service worker.", error);
        });
    });
}
