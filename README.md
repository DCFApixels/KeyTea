<p align="center">
<img width="300" src="https://github.com/DCFApixels/KeyTea/blob/main/images/MainIcon.png">
</p>

<p align="center">
<img alt="Version" src="https://img.shields.io/github/manifest-json/v/DCFApixels/KeyTea?style=for-the-badge&color=1e90ff">
<img alt="License" src="https://img.shields.io/github/license/DCFApixels/KeyTea?color=1e90ff&style=for-the-badge">
</p>

# :tea: Key Tea

<table>
  <tr></tr>
  <tr>
    <td colspan="3">Readme Languages:</td>
  </tr>
  <tr></tr>
  <tr>
    <td nowrap width="100">
      <a href="https://github.com/DCFApixels/KeyTea/blob/main/README-RU.md">
        <img src="https://github.com/user-attachments/assets/7bc29394-46d6-44a3-bace-0a3bae65d755"></br>
        <span>Русский</span>
      </a>  
    </td>
    <td nowrap width="100">
      <a href="https://github.com/DCFApixels/KeyTea">
        <img src="https://github.com/user-attachments/assets/3c699094-f8e6-471d-a7c1-6d2e9530e721"></br>
        <span>English</span>
      </a>  
    </td>
    <!--<td nowrap width="100">
      <a href="https://github.com/DCFApixels/KeyTea/blob/main/README-ZH.md">
        <img src="https://github.com/user-attachments/assets/8e598a9a-826c-4a1f-b842-0c56301d2927"></br>
        <span>中文</span>
      </a>  
    </td>-->
  </tr>
</table>
<br>

Link - [https://dcfapixels.github.io/KeyTea/](https://dcfapixels.github.io/KeyTea/) </br>
Versioning semantics - [Open](https://gist.github.com/DCFApixels/c3b178a308b411f530361d1d56f1f929#file-dcfapixels_versioning_en-md)

<p align="justify">
A small application with the functionality of a password manager, but it does not store these passwords either on the user's computer or on a server. It works on any device, and if the page is saved, KeyTea can be launched even without an internet connection.
</p>

</br>

## :question: How does it work?

<p align="justify">
In short, passwords are generated based on a master password that the user must create and remember. From the combination of the master password and the website's name, a unique password for that site is generated. Since the same pair of master password and website name always generates the same result, there is no need to save the generated passwords. The generation process uses a cryptographically secure hash function, meaning that the final password cannot be converted back into the master password.
</p>


</br>

## :lock: Security

**This application guarantees that passwords are not stored or transmitted to third parties in the following ways:**<br>
+ The app can function without an internet connection; 
+ It does not use third-party frameworks or libraries, except for the browser and the [js-sha3](https://github.com/emn178/js-sha3) script for calculations; 
+ It is an open-source project and the source code is available for review. Users can independently verify that everything is clean.

**Advantages:**<br>
+ It is enough to remember just one master password, but a unique one is generated for each site;
+ Generated passwords consist of a random set of characters, making them secure;
+ Since the app does not store passwords, these passwords are not susceptible to leakage by hacks;
+ Quickly change the generated password, adding just one character creates a new unique password.

**Disadvantages:**<br>
+ A master password leak exposes access to all passwords;
+ A single master password is more vulnerable to various types of attacks.

</br>

## :star: Features

+ **Cross-platform:**

<p align="justify">
The use of web languages allows the application to run on any device with a browser. And also it can be embedded in other applications. 
</p>

+ **Customizable character set:**

<p align="justify">
Some websites have specific requirements for the presence or absence of certain characters, fine-tuning the characters used allows the generation of passwords that meet these requirements. Additionally, for creating more complex passwords, characters from not only the English alphabet but also symbols can be used. By default, there are sets of special characters, numbers, the English alphabet, and the Russian alphabet.
</p>

+ **Password generation using versioning:**

<p align="justify">
In case the user needs to change the password, the password version can be modified in the settings, and increasing the version completely changes the password to a unique new one.
</p>

+ **Deterministic calculations:**

<p align="justify">
Passwords are generated the same no matter what device the app is running on.
</p>

</br>

## :scroll: Guide

### Master Password Input Screen
On the initial screen, the user is prompted to enter the master password, which is used to generate passwords.

![image](https://github.com/user-attachments/assets/396df36d-1381-433c-9b66-44ca7cec2ce5)

After entering the master password, press the "Continue" button to proceed to the password list.

![image](https://github.com/user-attachments/assets/5360397a-ba85-4855-9fc0-9f009c318080)

### Password Selection Screen

At the top of the screen, a list of resources is displayed. To retrieve a password, select the desired resource from the list.

The resource list is editable. The button at the bottom of the list with a plus icon adds a new entry, the gear icon button opens the screen for editing resource information for the password, and the adjacent recycle bin icon button removes the resource from the list.

![image](https://github.com/user-attachments/assets/58f01be4-b28a-4f08-9099-e9327588093f)

After selecting a resource, the generated password for this resource will appear in the "password" field at the bottom. To the right of the field is the button to copy the password to the clipboard. Further right is the button to show the password, which is hidden by default.

![image](https://github.com/user-attachments/assets/08958b72-9549-4fdb-b105-482b9807af13)

At the bottom of the screen, there are buttons for importing and exporting user data. These functions allow data to be transferred between devices.

![image](https://github.com/user-attachments/assets/d776ade5-f000-4ec4-b21f-0041d19a389f)

### Password Information Editing Screen

At the top, there are 4 fields available for editing:
+ **Name** - the name of the resource for which the password is being generated; this name will also be displayed on the password selection screen.
+ **User** - in case there are multiple accounts for the same resource, the user can enter account logins here, which will generate different passwords.
+ **Length** - the length of the password.
+ **Version** - the password version. The user can increase the version by clicking the `Up` button, which generates a completely new password.

Below is a list of character sets from which the user can select the ones to be used in password generation.

The list of character sets is editable. The button at the bottom of the list with a plus icon adds a new empty set, the gear icon button opens the screen for editing the character set, and the adjacent trash bin icon button removes the set from the list.

![image](https://github.com/user-attachments/assets/538cf86a-47c9-4296-8290-6224c6f8af0a)

After completing the edits, click the Save button to save the changes or Cancel to discard them.

![image](https://github.com/user-attachments/assets/efb2d3da-8c45-4468-b562-dbd89e055514)

### Character Set Editing Screen

For editing, there are 3 fields available:
+ **Name** - the name of the set displayed in the application. This does not affect password generation.
+ **Charset** - the set of characters as text. After saving, the text will be formatted, with characters sorted and duplicates removed.
+ **Priority** - the priority of the set. Priority affects the frequency with which characters from the set appear in the password. The frequency is calculated relative to the priority of all sets. The higher the priority, the more frequently characters from this set will appear. Regardless of priority, at least one character from the set will be used in the password.

![image](https://github.com/user-attachments/assets/b38c4022-d33d-44f8-b446-d7372f65616f)

After completing the edits, click the Save button to save the changes or Cancel to discard them.

![image](https://github.com/user-attachments/assets/efb2d3da-8c45-4468-b562-dbd89e055514)

</br>

## License

The MIT License: [https://raw.githubusercontent.com/DCFApixels/KeyTea/blob/main/LICENSE](https://raw.githubusercontent.com/DCFApixels/KeyTea/blob/main/LICENSE)

</br>
</br>