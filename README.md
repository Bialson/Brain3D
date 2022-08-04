<h1 align="center">
    <img src="https://user-images.githubusercontent.com/78564805/182945343-59306535-f755-4900-b4bb-f6eba24985c9.png" width=128><br/>
    Brain3D
</h1>
<p align="center">Take a part in exploring your brain and see how it works</p>
<p align="center"><img src="https://img.shields.io/badge/version-1.0.0-blue"/>&nbsp;<img src="https://img.shields.io/badge/license-GPL-yellow"/>&nbsp;<img src="https://img.shields.io/npm/v/three.js?color=blue&label=Three.js&logo=three.js">&nbsp;</p><br/>


## Table of Contents
* [General Info](#general-information)
* [Components list](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup and run](#setup-and-run)
* [Usage](#usage)
<!-- * [License](#license) -->


## General Information
- This software provide interactive 3D brain model with user-interface interactions and access to Wikipedia knowledge about every part of brain.
- It is solution for non-specialized learning software, especially for Biology.
- Program is dedicated to high school students.
- Why did you undertake it?


## Technologies Used
- Three.js 0.77.1
- HTML 5, CSS 3
- ECMAScript 2021


## Features
List the ready features here:
- Clickable infomation boxes with reference to Wikipedia articles
- Rotation and moving around the model


## Screenshots
<p align="center">
  <img src="https://user-images.githubusercontent.com/78564805/182949201-4f2f1964-105c-4094-bffb-fc2107229a9d.png" width=400/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://user-images.githubusercontent.com/78564805/182949321-472b6112-847c-430c-a6c2-48b8cbaf73cd.png" width=400/>
</p>
<!-- ![image width=300](https://user-images.githubusercontent.com/78564805/182949201-4f2f1964-105c-4094-bffb-fc2107229a9d.png)<br/>
![image](https://user-images.githubusercontent.com/78564805/182949321-472b6112-847c-430c-a6c2-48b8cbaf73cd.png) -->



## Setup and run
Download zip archiwe with the latest release. Then extract it to single folder and run file `Brain3D.exe`.


## Usage
For developer usage download all files to single folder or just clone repository via url (https://github.com/Bialson/Brain3D.git).<br/>
The base of program is located in `js/main.js` file.<br/> To modify scene go to `showBrain()` function. <br/>The class definition `edgeLine` of info box is placed under interactions with DOM elements (splash screen) and library imports.
