<p align="center">
<img width="300" src="https://github.com/DCFApixels/KeyTea/blob/main/images/MainIcon.png">
</p>

<p align="center">
<img alt="Version" src="https://img.shields.io/github/manifest-json/v/DCFApixels/KeyTea?style=for-the-badge&color=1e90ff">
<img alt="License" src="https://img.shields.io/github/license/DCFApixels/KeyTea?color=1e90ff&style=for-the-badge">
</p>

# Key Tea
Ссылка - [https://dcfapixels.github.io/KeyTea/](https://dcfapixels.github.io/KeyTea/)

<p align="justify">
Это небольшое приложение имеет функционал хранилища паролей, но не хранит эти пароли ни на компьютере пользователя ни на сервере. Работает на любом устройстве и если сохранить страницу, то приложение можно запустить и без подключения к интернету.
</p>

</br>

## Как это работает?

<p align="justify">
Если коротко то пароли вычисляются. В основе лежит мастер пароль который необходимо придумать и запомнить. Из комбинации мастер пароля и названия сайта генерируется уникальный пароль для этого сайта. Так как одинаковая пара мастер пароля и названия сайта при каждой повторной генерации дает одинаковый результат, генерируемые пароли нет необходимости сохранять. При генерации используя криптостойкая хеш функция, в следствии чего конечный пароль нельзя обратно конвертировать в мастер пароль.
</p>

</br>

## Безопасность

**Данное приложение гарантирует отсутствие хранения или передачи паролей третьим лицам следующим:**<br>
+ Приложение может работать без подключения к интернету; 
+ Не использует фреймворки или библиотеки сторонних разработчиков, за исключением браузера и скрипта [js-sha3](https://github.com/emn178/js-sha3) для вычислений; 
+ Является open-source проектом и доступно для изучения исходного кода. Можно самостоятельно убедиться что все чисто.

**Преимущества:**<br>
+ Достаточно помнить всего лишь один мастер пароль, но для каждого сайта генерируется уникальный;
+ Генерируемые пароли имеют случайный набор символов, что делает их надежными;
+ Так как приложение не хранит пароли, эти пароли не подвержены утечки при взломах;
+ Быстрая смена генерируемого пароля, добавление всего одного символа создает новый уникальный пароль.

**Недостатки:**<br>
+ Утечка мастер пароля открывает доступ ко всем паролям;
+ Один мастер пароль проще поддается разного вида атакам.

</br>

## Особенности

+ **Кроссплатформенность:**

<p align="justify">
Использование веб языков позволяет запускать приложение на любом устройстве при наличии браузера. А так же оно может быть встроенно в другие приложения. 
</p>

+ **Настройка наборов символов:**

<p align="justify">
Некоторые сайты имеют особые ограничения к обязательному наличию или отсутствию некоторых символов, тонкая настройка используемых символов позволит генерировать пароли в соответствии с требованиями. Так же для создания более сложных паролей можно использовать символы не только из английского алфавита и символов. По умолчанию имеются наборы спец символов, цифр, английского алфавита, а так же русского.
</p>

+ **Перегенерация пароля с помощью версии:**

<p align="justify">
На случай необходимости смены пароля в настройках пароля можно изменить его версию, повышение версии полностью меняет пароль на уникальный новый.
</p>

+ **Детерминированные вычисления:**

<p align="justify">
Пароли генерируются одинаковые вне зависимости от того на каком устройстве запущено приложение.
</p>


</br>

![image](https://github.com/user-attachments/assets/afebc1c8-4204-40b0-a031-6f886d1fcb7b)
![image](https://github.com/user-attachments/assets/7ec6ef39-a8ee-46e0-9c9c-7fb3cb05b0dc)
![image](https://github.com/user-attachments/assets/298b0e52-aadb-4cd5-bf1b-d52f646784bf)
![image](https://github.com/user-attachments/assets/a95c86ca-522e-4674-9542-1044d54be612)
![image](https://github.com/user-attachments/assets/538cf86a-47c9-4296-8290-6224c6f8af0a)
![image](https://github.com/user-attachments/assets/b38c4022-d33d-44f8-b446-d7372f65616f)


</br>
</br>
</br>
