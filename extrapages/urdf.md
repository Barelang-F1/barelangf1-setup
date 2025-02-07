# **SolidWorks to ROS Gazebo**

Agar dapat menggunakan desain robot yang sudah kita persiapkan dari aplikasi [SolidWorks](https://www.solidworks.com) ke dalam [ROS Gazebo](https://gazebosim.org/home) maka kita harus mengubah tipe file desain 3D robot menjadi file **.URDF** terlebih dahulu. Akan tetapi, opsi mengeksport file ke tipe URDF tidak akan ada di Solidowrks sebelum kita menginstall plugin di bawah ini. <br>

[SolidWorks to URDF Exporter](https://wiki.ros.org/sw_urdf_exporter){.md-button} <br>

<br>
Setelah menginstall extensi exporter URDF pada SolidWorks, kamu dapat mengakses video-video yang akan menjelaskan basic desain .urdf pada Gazebo melalui tombol dibawah ini. <br>

[Playlist Video Basics](https://www.youtube.com/playlist?list=PLeEzO_sX5H6TBD6EMGgV-qdhzxPY19m12){.md-button} <br>

<br>
Langkah berikutnya adalah mengexport bagian-bagian robot yang digunakan, untuk bagian kaki dapat diupload secara terpisah (kaki bagian tengah kiri, dan kaki bagian tengah kanan).

<br>
File yang telah di export kemudian di **Zip** lalu di copy ke ubuntu 18 yang telah disetup sebelumnya, di ubuntu ini kita aka Unzip file pada bagian `Document`, lalu copy bagian stl **Body**, **Coxa**, **Femur**, dan **Tibia**. Lalu Paste file-file ini pada bagian `src/hexapod_description/meshes`

<br>
Lalu download aplikasi [Meshlab](https://www.meshlab.net) yang akan digunakan untuk mengurangi faces yang akan digunakan sebagai stl collision nantinya.
Untuk ubuntu, petunjuk penginstalan aplikasi meshlab dapat di akses melalui tombol dibawah ini.

[Meshlab for Ubuntu](https://www.howtoinstall.me/ubuntu/18-04/meshlab/){.md-button} <br>

<br>
Sehingga pada folder `src/hexapod_description/meshes` akan terdapat 8 total file stl yang akan digunakan di Gazebo (body, body_col, coxa, coxa_col, *dan seterusnya*)