<p align="center">
<img width="300" src="https://github.com/user-attachments/assets/f1d0bf22-1350-4744-bd03-2165cb4ac1bc">
</p>

<p align="center">
<img alt="Version" src="https://img.shields.io/github/manifest-json/v/DCFApixels/PasswordCalculator?style=for-the-badge&color=1e90ff">
<img alt="License" src="https://img.shields.io/github/license/DCFApixels/PasswordCalculator?color=1e90ff&style=for-the-badge">
</p>

# Password Calculator
Ссылка - [https://dcfapixels.github.io/PasswordCalculator/](https://dcfapixels.github.io/PasswordCalculator/)

Это небольшое приложение имеет функционал хранилища паролей, но не хранит эти пароли ни на компьютере пользователя ни на сервере. Работает на любом устройстве и если сохранить страницу, то приложение можно запустить и без подключения к интернету.

</br>

## Как это работает?

Если коротко то пароли вычисляются. В основе лежит мастер пароль который необходимо придумать и запомнить. Из комбинации мастер пароля и названия сайта генерируется уникальный пароль для этого сайта. Так как одинаковая пара мастер пароля и названия сайта при каждой повторной генерации дает одинаковый результат, генерируемые пароли нет необходимости сохранять. 

## Безопасность

Данное приложение гарантирует отсутствие хранения или передачи паролей третьим лицам следующим: 
+ Приложение может работать без подключения к интернету; 
+ Не использует фреймворки или библиотеки сторонних разработчиков, за исключением браузера и скрипта [js-sha3](https://github.com/emn178/js-sha3) для вычислений; 
+ Является open-source проектом и доступно для изучения исходного кода. Можно самостоятельно убедиться что все чисто.

Преимущества:<br>
+ Достаточно помнить всего лишь один мастер пароль, но для каждого сайта генерируется уникальный;
+ Генерируемые пароли имеют случайный набор символов, что делает их надежными;
+ Так как приложение не хранит пароли, эти пароли не подвержены утечки при взломах;
+ Быстрая смена генерируемого пароля, добавление всего одного символа создает новый уникальный пароль.

Недостатки:<br>
+ Утечка мастер пароля открывает доступ ко всем паролям;
+ Один мастер пароль проще поддается разного вида атакам.