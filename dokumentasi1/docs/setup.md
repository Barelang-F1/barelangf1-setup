# **Setup Utama**

## **Jetson Nano**

<figure markdown="span">
    ![Source Running Pic](assets\JetsonNano.png){ width="500" }
</figure>

Robot Hexapod Barelang F1 menggunakan Mini PC [Jetson Nano](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit) sebagai central processing unit yang akan memproses bermacam banyaknya data secara real-time. Jetson Nano juga akan berperan penting dalam peran Computer Vision dan Motion Controll dimana semua sensor dan sistem pergerakan robot akan bergantung kepada kecepatan prosesi Jetson Nano yang kencang. <br>

### **Instalasi NVidia Jetson**
Untuk melakukan instalasi software Jeson Nano dapat dilihat pada Official NVidia Jetson Nano Installation Guide dibawah ini: <br>
[Visit the official page](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#write){ .md-button } <br>


Setelah melakukan proses instalasi dari link idatas, masukkan command berikut ini untuk melakukan update system
``` css
sudo apt update
```
dan 
``` css
sudo apt upgrade
```

Dua command diatas tadi berfungsi untuk memperbarui local package index dan memastikan sistem memiliki informasi terbaru tentang semua package yang ada dan versinya.


### **Jetson Nano Ubuntu Dummy Video**
Penginstalan Dummy video Driver ini diperlukan agar Jetson dapat menampilkan gambar pada device yang akan digunakan.
Untuk monitor dengan resolusi layar tetap menggunakan [VNC](https://www.realvnc.com/en/connect/download/viewer/) atau [Nomachine](https://kb.nomachine.com/AR02R01074), run perintah berikut ini di terminal satu per satu.
``` css
sudo apt-get install xserver-xorg-core
```
``` css
sudo apt-get install xserver-xorg-video-dummy
```
``` css
sudo apt-get install --reinstall xserver-xorg-input-all
```
``` css
sudo nano /usr/share/X11/xorg.conf.d/xorg.conf
``` 
dan lakukan penginstalan dengan memasukkan perintah ini:
``` css
sudo apt install nano
```

<br> Setelah itu, paste perintah berikut ini:

``` css
Section "Module"
        
    Disable     "dri"
        SubSection  "extmod"
            Option  "omit xfree86-dga"
        EndSubSection
    EndSection

    Section "Device"
        Identifier  "Tegra0"
        Driver      "nvidia"
        Option      "AllowEmptyInitialConfiguration" "true"
    EndSection

    Section "Monitor"
       Identifier "DSI-0"
       Option    "Ignore"
    EndSection

    Section "Screen"
       Identifier    "Default Screen"
       Monitor        "Configured Monitor"
       Device        "Default Device"
       SubSection "Display"
           Depth    24
           Virtual 1280 720
       EndSubSection
    EndSection
```
Setelah memasukkan semua perintah diatas, langkah berikutnya adalah keluar dari program dan menyimpannya dengan cara `ctrl + X` dan memilih opsi Yes `Y` kitka muncul permintaan untuk menyimpan program.

<br>

## **VSC Jetson**
Untuk melakukan instalasi [Visual Studio Code](https://code.visualstudio.com) ke dalam Jetson Nano dapat dilakukan dengan mendownload VSC tertentu melalui tombol dibawah ini: <br>

[VSC for Jetson :fontawesome-solid-download:](C:\Users\Vistus\dokumentasi1\docs\assets\tutorialpic\Dimas12.png){ .md-button } <br>

Setelah itu memasukkan perintah ini untuk melakukan penginstalan: <br>
``` css
cd Downloads 
```
``` css
sudo dpkg -i [nama file VS code yang didownload]
```

<br>

## **Penginstalan Nomachine**
[Nomachine](https://kb.nomachine.com/AR02R01074) adalah program desktop jarak jauh yang bisa digunakan dengan NVidia Jetson untuk banyak macam hal, diantaranya: <br>

- Mengakses file, audio dan video.
- Merekam dan menyiarkan layar.
- Memindahkan dan mentransfer file.

Nomachine menjadi pilihan utama karena lebih ringan dan lebih cepat ketimbang VNC. Penginstalan NoMachine kedalam NVidia Jetson Nano dapat dilakukan dengan mendownload NoMachine .deb package untuk ARmv8 melalui [Official Website]() atau mendownloadnya langsung menggunakan command wget sebagai berikut: <br>
``` css
cd Downloads 
```
``` css
wget https://www.nomachine.com/free/arm/v8/deb -O nomachine.deb
```
Lalu melakukan penginstalan dengan command ini:
``` css
sudo dpkg -i nomachine.deb
```


<br> Setelah melakukan semua step diatas, masukkan program berikut untuk reboot system:
``` css
sudo reboot
```