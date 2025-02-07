# **Setup Utama**

## **Jetson Nano**

<figure markdown="span">
    ![Source Running Pic](assets\pictures\JetsonNano.png){ width="500" }
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

[Direct Download VSC for Jetson :fontawesome-solid-download:](https://update.code.visualstudio.com/1.77.3/linux-deb-arm64/stable){ .md-button } <br>

Setelah itu memasukkan perintah ini untuk melakukan penginstalan: <br>
``` css
cd Downloads 
```
``` css
sudo dpkg -i [nama file VS code yang didownload]
```

<br>

## **NoMachine**
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

<br>

### **Setting IP Statis untuk LAN Nomachine**
IP statis sangat berguna jika suatu webiste atau device external perlu mengingat IP penggunanya, IP statis adalah titik akses tetap sehingga IP yang diakses tidak akan berubah-ubah. Hal ini dapat membuat komunikasi antar device semakin mudah dan konsisten.<br> 
Seperti pada namanya, disini kita akan menggunakan LAN/kabel Ethernet.

<figure markdown="span">
    ![Source Running Pic](assets\pictures\JetsonNanoLAN.png){ width="500" }
</figure>

JetsonNano memiliki sebuah slot untuk kabel LAN/Ethernet, port ini dapat digunakan untuk menghubungkan JetsonNano dengan PC anda menggunakan kabel LAN/Ethernet.

### **Konfigurasi IP Statis**
Tanpa Internet, anda perlu mengatur IP statis pada kedua perangkat yatu pada JetsonNano dan pada PC anda 

#### Pada Jetson Nano
- Edit file konfigurasi jaringan:
```css
sudo nano /etc/network/interfaces
```

- Lalu tambahkan konfigurasi berikut:
```css
auto eth0
iface eth0 inet static
address 192.168.1.2
netmask 255.255.255.0
```

- Simpan dan restart jaringan dengan memasukkan perintah ini:
```css
sudo systemctl restart networking
```

#### Pada PC User
- Atur IP Statis di pengaturan jaringan:
!!! info "Windows"
    * Buka Control Panel > **Network and Sharing Center** > **Change adapter settings**
    * Klik kanan pada koneksi Ethernet > **Properties**
    * Pilih **Internet Protocol Version 4 (TCP/IPv4)** dan klik "Properties"
    * Masukkan: 
        <br> - IP Adress: `192.168.1.1`
        <br> - Subnet Mask: `255.255.255.0`
    * Klik OK
    

!!! warning "Ubuntu" 
    OOPS we haven't gotten that far yet, we'll make an update as soon as we do! 

<br>

#### **Verifikasi Koneksi**
Untuk mengverifikasi jika kedua perangkat (Jetson Nano dengan PC pengguna)sudah tersambung dengan benar, kita dapat membuat kedua device saling ping untuk memastikan keduanya tersambung.

- Dari PC ke Jetson Nano:
```css
ping 192.168.1.2
```

- Dari Jetson Nano ke PC:
```css
ping 192.168.1.1
```

### **Menggunakan NoMachine**
Agar dapat menggunakan NoMachine, kita harus menjalankan NoMachine server pada Jetson Nano terlebih dahulu (biasanya server berjalan otomatis setelah instalasi). <br>

Lalu pada PC ada beberapa langkah yang harus dilakukan:

- Buka NoMachine client dan tambahkan koneksi baru: <br>
    \- Pilih **manual connection**.
    \- Masukkan alamat IP Jetson Nano (`192.168.1.2`).
    \- Pilih protokol (Default adalah NX).

- Klik Connect.
- Masukkan username dan password Jetson Nano untuk login.

<br>

### **Instalasi ROS Bridge**
[ROS Bridge](https://wiki.ros.org/rosbridge_suite) adalah suatu framework atau Tool yang memungkinkan komunikasi antara Robot Operating System dengan sistem external seperti penggunaan website, aplikasi mobile, atau bahasa pemrograman lainnya sembari menyediakan interface untuk semua sistem non-ROS agar sistem-sistem tersebut dapat bekerja dengan ROS dengan cara bertukar pesan dan protokol seperti [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [JSON](https://www.json.org/json-en.html), atau API Lainnya.

- Install ROS Bridge di Jetson Nano
Jalankan perintah berikut di Jetson Nano:
```css
sudo apt-get install ros-melodic-rosbridge-server
```
!!! note
    Ganti *melodic* dengan versi ROS Anda jika berbeda

- Jalankan ROS Bridge
```css
roslaunch rosbridge_server rosbridge_websocket.launch
```

Secara default, server WebSocket berjalan di **port 9090**.

- Test ROS Bridge
Gunakan WebSocket client seperti **ROS Web Tools** atau **RQT** untuk memeriksa data

<br>

### **Ubah Nama Host Jetson**
Menggunakan nama Host atau mDNS (Bonjour/Avahi) <br>
Jika Anda sering berpindah jaringan dan tidak ingin repot mengatur IP statis, anda dapat gunakan **nama host** atau teknologi **mDNS** untuk menggantikan IP Address. Langkah-langkahnya adalah sebagai berikut:

**Instalasi mDNS (Avahi) di Jetson:**

- Pastikan Avahi terinstall di Jetson Nano dengan menjalankan perintah berikut ini:
```css
sudo apt update
sudo apt install avahi-daemon libnss-mdns
```

- o	Setelah terinstal, Jetson akan dapat diakses menggunakan hostname.local. Misalnya, jika nama host Jetson Anda adalah bf1, maka Anda dapat mengaksesnya dengan:
```css
ws://bf1.local:9090
```

### **Install GStreamer**
[GStreamer](https://gstreamer.freedesktop.org) adalah framework multimedia yang sangat fleksibel dan kuat yang dapat digunakan untuk streaming video, termasuk dari kamera USB atau kamera lain yang terhubung ke Jetson. GStreamer dapat digunakan untuk membuat stream MJPEG, RTSP, atau bahkan HLS (HTTP Live Streaming).<br>
Berikut adalah langkah-langkah menggunakan GStreamer:

- **Instalasi GStreamer di Jetson** <br>
Jika GStreamer belum terinstal di Jetson Anda, Anda dapat menginstalnya dengan perintah berikut:
```css
sudo apt-get update
sudo apt-get install gstreamer1.0-tools
```

- **Menyiapkan GStreamer untuk Streaming** <br>
Anda dapat menggunakan GStreamer untuk mengalirkan video dari kamera ke aplikasi lain, termasuk aplikasi Flutter. Misalnya, Anda dapat menyiapkan stream video menggunakan GStreamer dengan perintah berikut:
```css
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! x264enc ! flvmux ! rtmpsink location='rtmp://your-server-address/stream'
```
Perintah di atas mengalirkan video ke server RTMP. Anda bisa mengganti rtmp://your-server-address/stream dengan alamat server atau endpoint sesuai dengan kebutuhan Anda. Anda juga bisa memilih untuk mengalirkan stream dalam format lain (misalnya, HLS atau MJPEG).

- **Menggunakan GStreamer dengan RTSP** <br>
Jika Anda ingin menggunakan RTSP (Real-Time Streaming Protocol) untuk streaming, Anda dapat mengonfigurasi GStreamer untuk menyediakan stream RTSP. Berikut adalah perintah untuk memulai server RTSP dengan GStreamer:
```css
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! x264enc ! rtph264pay ! udpsink host=127.0.0.1 port=5004
```
Anda dapat mengakses stream ini di aplikasi lain menggunakan protokol RTSP

### **Memastikan Server RTMP Dijalankan dengan Benar**

Setelah itu, kita harus memastikan bahwa server RTMP di `bf1.local` benar-benar berjalan dan mendengarkan pada port yang sesuai. Jika Anda menggunakan **NGINX dengan modul RTMP**, pastikan bahwa NGINX telah dikonfigurasi untuk menerima stream RTMP pada URL `rtmp://bf1.local/stream`.

Jika Anda belum menyiapkan server RTMP, berikut adalah langkah-langkah singkat untuk menyiapkannya menggunakan NGINX dengan modul RTMP:

- Instalasi NGINX dengan Modul RTMP:
```css 
sudo apt-get update
sudo apt-get install libnginx-mod-rtmp nginx
```
- Konfigurasi NGINX untuk RTMP: Edit file konfigurasi NGINX `(/etc/nginx/nginx.conf)` dan tambahkan blok konfigurasi berikut di bawah bagian:
```css
rtmp {
    server {
        listen 1935;  # Port RTMP default
        chunk_size 4096;

        application stream {
            live on;
            record off;
        }
    }
}
```	

- Mulai ulang NGINX untuk memuat konfigurasi baru dengan memasukkan perintah dibawah ini:
```css
sudo systemctl restart nginx
```

- Lalu Verifikasi NGINX sedang berjalan dan mendengarkan pada port 1935 dengan memasukkan perintah ini:
```css
sudo netstat -tulnp | grep 1935
```

Jika server RTMP berjalan dengan benar, Anda harus bisa mengalirkan video menggunakan GStreamer ke `rtmp://bf1.local/stream.`

### **Memeriksa Koneksi ke `bf1.local`**
Pastikan bahwa nama host `bf1.local` dapat diresolusikan dan terhubung dengan benar. Anda bisa mencoba menggunakan alamat IP langsung dari Jetson alih-alih nama host, untuk menghindari masalah dengan resolusi DNS atau bonjour/avahi. <br>
Cobalah untuk mengganti `bf1.local` dengan alamat IP Jetson:
```css
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! x264enc ! flvmux ! rtmpsink location='rtmp://<Jetson-IP>/stream'
```

Pastikan Anda mengganti `<Jetson-IP>` dengan alamat IP lokal Jetson Anda.

### **Streaming dengan GStreamer dari Jetson ke Server RTMP**
Sekarang Anda bisa menggunakan GStreamer di Jetson untuk mengirim stream video ke server RTMP yang sudah disiapkan. <br>
Jika Anda menggunakan nama host `bf1.local`, Anda bisa mengonfigurasi GStreamer seperti ini:
```css
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! x264enc ! flvmux ! rtmpsink location='rtmp://bf1.local/stream'
```

Jika Anda lebih memilih menggunakan IP Jetson secara langsung, ganti `bf1.local` dengan alamat IP lokal Jetson Anda:
```css
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! x264enc ! flvmux ! rtmpsink location='rtmp://<Jetson-IP>/stream'
```

Dengan GStreamer yang dikonfigurasi ini, video dari kamera yang terhubung ke Jetson akan disalurkan ke server RTMP yang ada di jaringan lokal Anda.

### **Mengakses Stream dari Perangkat Lain**
Sekarang Anda dapat mengakses stream RTMP dari perangkat lain di jaringan lokal.

- **Menggunakan VLC**: Anda dapat membuka stream RTMP menggunakan VLC media player dengan URL:
```css
rtmp://bf1.local/stream
```

- **Menggunakan Browser atau Aplikasi Lain**: Anda juga bisa mengakses stream dengan aplikasi yang mendukung RTMP, seperti aplikasi pemutar video atau aplikasi streaming lainnya.

Jika Anda sudah menjalankan perintah GStreamer seperti berikut:
```css
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! x264enc ! flvmux ! rtmpsink location='rtmp://bf1.local/stream'
```

Namun Anda tidak melihat output atau log yang menunjukkan adanya masalah atau stream yang berjalan, ada beberapa cara untuk memeriksa apakah streaming Anda sudah berjalan dengan benar seperti berikut:

### **Memeriksa Status RTMP Server (NGINX)**
Anda perlu memastikan server RTMP yang Anda gunakan (misalnya, NGINX dengan modul RTMP) sudah berjalan dengan benar dan mendengarkan di port 1935.

- Cek status NGINX:
```css
sudo systemctl status nginx
```

- Pastikan server RTMP mendengarkan pada port 1935. Anda dapat memeriksa dengan perintah:
```css
sudo netstat -tuln | grep 1935
```

Ini akan menunjukkan apakah port 1935 terbuka dan sedang digunakan oleh server RTMP.

### **Memeriksa URL Stream di VLC atau Aplikasi Lain**
Setelah stream dikirim ke `rtmp://bf1.local/stream, Anda bisa memeriksa apakah stream tersebut dapat diakses dengan aplikasi seperti VLC.

- Buka VLC dan pilih "Media" > "Open Network Stream" dan masukkan URL RTMP:
```css
rtmp://bf1.local/stream
```
Jika stream berhasil, VLC akan mulai menampilkan video yang dipancarkan dari Jetson.

<br>

## **ROS Gazebo**
[ROS Gazebo](https://gazebosim.org/home) adalah tool open-source 2D/3D simulator robot yang memungkinkan kita untuk mengembangkan, memeriksa dan memvalidasi sistem robotik di lingkungan virtual sebelum mewujudkannya di dunia nyata. Disini kami akan menunjukkan langkah-langkah instalasi Ros Gazebo untuk simulasi robot. Operating System yang kami gunakan adalah [Ubuntu 18](https://releases.ubuntu.com/18.04/).

**Install Visual Studio Code** <br>
Langkah pertama adalah melakukan penginstalan Visual Studio Code jika kamu belum melakukannya, ini menjadi alat yang akan membantumu dalam proses pemrograman nanti. Kamu dapat melihat panduan penginstalan Visual Studio Code pada OS Ubuntu 18 dengan menekan tombol dibawah ini <br>

[Penginstalan VSC di Ubuntu 18](https://www.ubuntu18.com/install-visual-studio-code-ubuntu-18/){ .md-button } 

<br> **Install ROS melodic** <br>
Setelah itu kita akan masuk ke tahap selanjutnya yaitu penginstalan ROS Melodic. ROS Melodic adalah versi ROS yang dirilis pada tahun 2018 yang terutama dimaksudkan untuk operating system ubuntu 18. Untuk Petunjuk penginstalannya dapat dilihat melalui tombol dibawah ini. <br>

[Penginstalan ROS Melodic](http://wiki.ros.org/melodic/Installation/Ubuntu){ .md-button }

<br> **Penginstalan IceCream CPP** <br>
Icecream CPP adalah tool debugging yang akan mempermudah proses print dan inspeksi variable ketika runtime. Sebelum memulai instalasi IceCream CPP, kita harus terlebih dahulu menginstall cmake versi 3.16 ke atas agar IceCream CPP dapat digunakan. <br>
Untuk menginstall cmake versi terbaru dapat dilakukan melalui tombol di bawah ini. <br>

[CMake Versi Terbaru](https://github.com/Kitware/CMake/releases/){ .md-button } <br>

Jika sudah, maka kita dapat lanjut ke tahap penginstalan IceCream CPP melalui tombol ini yang akan membawamu ke dalam github penginstalan IneCream CPP. File didalam github ini dapat didownload dalam bentuk zip dan sebagainya, lalu ikuti Langkah instalasi di bawahnya.<br>

[IceCream CPP](https://github.com/renatoGarcia/icecream-cpp?tab=readme-ov-file#install){ .md-button }

### **Dependencies yang diperlukan**
Langkah terakhir adalah menginstall ROS Dependencies yang diperlukan, dibawah adalah seluruh command yang diperlikan untuk menginstall dependencies agar ROS Gazebo dapat digunakan.

!!! note
    Sesuaikan dengan jennis ros yang digunakan, disini kami menyarankan menggunakan ROS Melodic.

```css
sudo apt install git
sudo apt install ros-noetic-sound-play
sudo apt install ros-noetic-openni2-launch
sudo apt install ros-noetic-joy
sudo apt install ros-noetic-rtabmap
sudo apt install ros-noetic-rtabmap-ros
sudo apt install ros-noetic-navigation
sudo apt install ros-noetic-move-base
sudo apt install ros-noetic-robot-state-publisher
sudo apt install ros-noetic-robot-localization
sudo apt install ros-noetic-navfn
sudo apt install ros-noetic-amcl
sudo apt install ros-noetic-diagnostic-updater
sudo apt install ros-noetic-xacro
sudo apt install ros-noetic-depthimage-to-laserscan
sudo apt install ros-noetic-imu-filter-madgwick
sudo apt install ros-noetic-ros-controllers
sudo apt install ros-noetic-ros-control
sudo apt install ros-noetic-spacenav-node
```

!!! abstract "Optional"
    Setelah memasukkan perintah di atas, dibawah ini adalah perintah opsional yang dapat digunakan jika menggunakan Flashdrive/USB
    ```css
    sudo apt install libusb-1.0-0-dev
    sudo apt install libsdl-dev
    ```

```css
sudo apt install ros-noetic-gazebo-ros-pkgs
sudo apt install ros-noetic-gazebo-ros-control
```

Jika seluruh Langkah sudah dilakukan, maka ROS Gazebo sudah dapat digunakan untuk proyek robotmu!

### **Solidworks to Gazebo**
Jika kamu ingin tahu cara melakukan exporting file desain 3D robotmu dari program desain [SolidWorks](https://www.solidworks.com) agar dapat digunakan kedalam ROS Gazebo, kami sudah menyusun semua langkah yang diperlukan dan kamu dapat melihatnya melalui tombol dibawah ini: <br>

[Solidworks to ROS Gazebo](extrapages\urdf.md){.md-button .md-button--primary}