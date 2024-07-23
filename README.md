<p align="center">
<img width="300" src="https://github.com/user-attachments/assets/f1d0bf22-1350-4744-bd03-2165cb4ac1bc">
</p>

<p align="center">
<img alt="Version" src="https://img.shields.io/github/package-json/v/DCFApixels/PasswordCalculator?color=%231e90ff&style=for-the-badge">
<img alt="License" src="https://img.shields.io/github/license/DCFApixels/PasswordCalculator?color=1e90ff&style=for-the-badge">
</p>

# Password Calculator

Это небольшое приложение имеет функционал хранилища паролей, но не хранит эти пароли ни на компьютере пользователя ни на сервере. Работающее на любом устройстве и если сохранить, то работающее и без подключения к интернету.

</br>

## Как это работает?

В основе лежит мастер пароль который необходимо придумать и запомнить. Из комбинации мастер пароля и названия сайта генерируется пароль для этого сайта. Так как пара мастер пароль и название сайта при каждой повторной генерации дает одинаковый результат, генерируемые пароли нет необходимости сохранять.

## Безопасность

Данное приложение гарантирует отсутствие хранения или передачи паролей третьим лицам следующим: 
+ Приложение может работать без подключения к интернету; 
+ Не использует фреймворки или библиотеки сторонних разработчиков, за исключением браузера; 
+ Является open-source проектом и доступно для изучения исходного кода. Можно самостоятельно убедиться что все чисто.

Преимущества:<br>
+ Достаточно помнить всего лишь один мастер пароль, но для каждого сайта генерируется уникальный;
+ Генерируемые пароли имеют случайный набор символов, хуже поддаются брутфорсу;
+ Так как приложение не хранит пароли, эти пароли не подвержены утечки при взломах;
+ Быстрая смена генерируемого пароля, добавление всего одного символа или изменение версии создает новый уникальный пароль.

Недостатки:<br>
+ Утечка мастер пароля открывает доступ ко всем паролям;
+ Один мастер пароль проще поддается брутфорсу.

Перечисленные риски появляются если злоумышленник в курсе об использовании Password Calculator для генерации паролей. Риски можно контролировать если нигде не записывать пароль, а сам пароль придумать как можно длиннее с применением различных символов.
