<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Belajar Spreadsheet Interaktif</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chosen Palette: Calm Neutrals -->
    <!-- Application Structure Plan: The application is designed as an interactive mock-up of a spreadsheet UI. Users click on different static elements (menus, toolbar, cells), which triggers a modal window displaying detailed information about that element. This structure was chosen because it provides a hands-on, contextual learning experience, directly linking the visual component to its function, which is more effective for software training than a passive text document. The new update makes almost every UI element clickable. The core logic now uses a hardcoded data array to provide explanations for all UI components, making the app feel complete and comprehensive without relying on an external API. -->
    <!-- Visualization & Content Choices: The primary 'visualization' is the interactive diagram of the spreadsheet UI itself, built with HTML and Tailwind CSS. The main interaction is the user clicking on labeled hotspots. Goal: To inform and teach. A modal is used to present detailed text from the hardcoded data array. Justification: This method is highly engaging and intuitive for a tutorial application. The manual approach ensures consistent and reliable explanations for every part of the UI. Library/Method: Vanilla JavaScript for event handling and DOM manipulation. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8f9fa;
        }
        .spreadsheet-grid {
            display: grid;
            grid-template-columns: 50px repeat(10, minmax(100px, 1fr));
        }
        .grid-cell, .col-header, .row-header {
            border: 1px solid #dee2e6;
            padding: 4px 8px;
            text-align: center;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .col-header {
            background-color: #f1f3f4;
            font-weight: 500;
            cursor: pointer;
        }
        .row-header {
            background-color: #f1f3f4;
            font-weight: 500;
            cursor: pointer;
        }
        .grid-cell {
            text-align: left;
            cursor: pointer;
        }
        .interactive-area {
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .interactive-area:hover {
            background-color: #e9ecef;
        }
         .modal {
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .toolbar-icon-group {
            display: flex;
            align-items: center;
            border-right: 1px solid #e2e8f0;
            padding: 0 8px;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800 p-4 md:p-8">

    <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Top menu bar -->
        <div class="bg-white flex justify-between items-center px-4 py-2 border-b-2">
            <div class="flex items-center space-x-2">
                <span class="text-2xl text-green-600 font-bold interactive-area" data-target="file-icon">📄</span>
                <span class="font-semibold text-gray-800 interactive-area" data-target="file-name">Untitled spreadsheet</span>
                <span class="text-gray-400 interactive-area" data-target="star-icon">⭐</span>
            </div>
            <div class="flex items-center space-x-2">
                <button data-target="collaboration" class="bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-full shadow hover:bg-blue-600 transition interactive-area">Bagikan</button>
                <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white interactive-area" data-target="profile-icon" src="https://placehold.co/32x32/FFC107/FFFFFF?text=A" alt="User A">
            </div>
        </div>
        
        <!-- Menu Bar -->
        <div class="bg-white px-4 py-2 flex items-center space-x-4 text-sm border-b">
            <span data-target="file-menu" class="interactive-area rounded px-2 py-1">File</span>
            <span data-target="edit-menu" class="interactive-area rounded px-2 py-1">Edit</span>
            <span data-target="view-menu" class="interactive-area rounded px-2 py-1">Sisipkan</span>
            <span data-target="insert-menu" class="interactive-area rounded px-2 py-1">Format</span>
            <span data-target="format-menu" class="interactive-area rounded px-2 py-1">Data</span>
            <span data-target="data-menu" class="interactive-area rounded px-2 py-1">Alat</span>
        </div>
        
        <!-- Toolbar with specific icons -->
        <div class="bg-gray-100 px-4 py-2 flex items-center text-sm border-b overflow-x-auto">
            <div class="flex items-center space-x-2 mr-3">
                <span data-target="undo-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Urungkan (Undo)">↩️</span>
                <span data-target="redo-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Ulangi (Redo)">↪️</span>
            </div>
            <div class="toolbar-icon-group space-x-2 mr-3">
                <span data-target="print-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Cetak (Print)">🖨️</span>
                <span data-target="paint-format-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Format Painter">🖌️</span>
            </div>
             <div class="toolbar-icon-group space-x-2 mr-3">
                <span data-target="zoom-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Zoom">🔍</span>
                <span data-target="font-type-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area">Inter</span>
                <span data-target="font-size-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area">10</span>
             </div>
             <div class="toolbar-icon-group space-x-2 mr-3">
                <span data-target="bold-icon" class="p-1.5 rounded hover:bg-gray-200 font-bold interactive-area" title="Tebal (Bold)">B</span>
                <span data-target="italic-icon" class="p-1.5 rounded hover:bg-gray-200 italic interactive-area" title="Miring (Italic)">I</span>
                <span data-target="underline-icon" class="p-1.5 rounded hover:bg-gray-200 underline interactive-area" title="Garis bawah (Underline)">U</span>
                <span data-target="text-color-icon" class="p-1.5 rounded hover:bg-gray-200 relative interactive-area" title="Warna Teks">
                    A<div class="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500"></div>
                </span>
                <span data-target="fill-color-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Warna Isi (Fill Color)">🎨</span>
             </div>
              <div class="toolbar-icon-group space-x-2 mr-3">
                <span data-target="border-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Garis Tepi (Borders)">🖼️</span>
                <span data-target="merge-cells-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Gabungkan Sel (Merge Cells)">➕</span>
             </div>
               <div class="toolbar-icon-group space-x-2 mr-3">
                 <span data-target="align-icon" class="p-1.5 rounded hover:bg-gray-200 interactive-area" title="Perataan (Align)">☰</span>
                 <span data-target="functions-icon" class="p-1.5 rounded hover:bg-gray-200 font-bold interactive-area" title="Fungsi">Σ</span>
             </div>
        </div>

        <!-- Name Box & Formula Bar -->
        <div class="flex items-center border-b">
            <div data-target="name-box" class="w-24 p-2 text-center bg-gray-50 border-r interactive-area">
                <span class="font-mono">A1</span>
            </div>
            <div data-target="formula-bar" class="flex-1 p-2 bg-white interactive-area">
                <span class="font-mono text-gray-500 italic">fx</span>
            </div>
        </div>

        <!-- Grid -->
        <div class="overflow-auto" data-target="grid">
            <div class="spreadsheet-grid">
                <!-- Headers -->
                <div class="grid-cell bg-gray-100 interactive-area" data-target="grid-container"></div>
                <div class="col-header interactive-area" data-target="column">A</div>
                <div class="col-header interactive-area" data-target="column">B</div>
                <div class="col-header interactive-area" data-target="column">C</div>
                <div class="col-header interactive-area" data-target="column">D</div>
                <div class="col-header interactive-area" data-target="column">E</div>
                <div class="col-header interactive-area" data-target="column">F</div>
                <div class="col-header interactive-area" data-target="column">G</div>
                <div class="col-header interactive-area" data-target="column">H</div>
                <div class="col-header interactive-area" data-target="column">I</div>
                <div class="col-header interactive-area" data-target="column">J</div>
                
                <!-- Row 1 -->
                <div class="row-header interactive-area" data-target="row">1</div>
                <div class="grid-cell interactive-area" data-target="cell">Data Penjualan</div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                
                <!-- Row 2 -->
                 <div class="row-header interactive-area" data-target="row">2</div>
                <div class="grid-cell interactive-area" data-target="cell">Januari</div><div class="grid-cell interactive-area" data-target="cell">150</div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                
                 <!-- Row 3 -->
                <div class="row-header interactive-area" data-target="row">3</div>
                <div class="grid-cell interactive-area" data-target="cell">Februari</div><div class="grid-cell interactive-area" data-target="cell">175</div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>
                <div class="grid-cell interactive-area" data-target="cell"></div><div class="grid-cell interactive-area" data-target="cell"></div>

                <!-- More rows for visual effect -->
                <script>
                    const spreadsheetGrid = document.querySelector('.spreadsheet-grid');
                    for(let i = 4; i <= 15; i++) {
                        const rowHeader = document.createElement('div');
                        rowHeader.className = 'row-header interactive-area';
                        rowHeader.setAttribute('data-target', 'row');
                        rowHeader.textContent = i;
                        spreadsheetGrid.appendChild(rowHeader);
                        for(let j = 0; j < 10; j++) {
                            const cell = document.createElement('div');
                            cell.className = 'grid-cell interactive-area';
                            cell.setAttribute('data-target', 'cell');
                            spreadsheetGrid.appendChild(cell);
                        }
                    }
                </script>
            </div>
        </div>

        <!-- Sheet Tabs -->
         <div data-target="sheet-tabs" class="bg-gray-100 px-4 py-1 flex items-center space-x-2 text-sm border-t interactive-area">
            <span class="rounded px-3 py-1 bg-white border-b-2 border-green-500 text-green-600 font-semibold interactive-area" data-target="sheet-tabs">Sheet1</span>
            <span class="rounded px-3 py-1 hover:bg-gray-200 interactive-area" data-target="sheet-tabs">Data 2024</span>
            <span class="text-xl font-light text-gray-600 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center interactive-area" data-target="add-sheet-button">+</span>
        </div>
    </div>

    <!-- Info Modal -->
    <div id="info-modal" class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 opacity-0 invisible" aria-hidden="true">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col transform scale-95 transition-transform duration-300">
            <div class="p-6 border-b flex justify-between items-center">
                <h2 id="modal-title" class="text-xl font-bold text-gray-800"></h2>
                <button id="close-modal" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <div id="modal-content" class="p-6 overflow-y-auto text-gray-700 leading-relaxed">
            </div>
        </div>
    </div>
    
<script>
    const infoData = {
        'file-menu': {
            title: 'Menu "File"',
            content: `<p>Ini adalah pusat kendali untuk semua yang berhubungan dengan file Anda. Di sini Anda bisa:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Buat Salinan:</b> Menduplikasi spreadsheet Anda, berguna jika ingin bereksperimen tanpa merusak data asli.</li>
                    <li><b>Impor:</b> Memasukkan data dari file lain seperti Excel (.xlsx) atau CSV.</li>
                    <li><b>Unduh:</b> Menyimpan file ke komputer dalam berbagai format (Excel, PDF, dll.).</li>
                    <li><b>Bagikan:</b> Mengundang orang lain untuk melihat atau mengedit file bersama-sama.</li>
                    <li><b>Riwayat Versi:</b> Melihat semua perubahan yang pernah dibuat dan mengembalikan ke versi sebelumnya jika terjadi kesalahan.</li>
                </ul>`
        },
        'edit-menu': {
            title: 'Menu "Edit"',
            content: `<p>Semua alat untuk memodifikasi isi sel ada di sini. Beberapa fitur utamanya:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Potong, Salin, Tempel:</b> Fungsi dasar untuk memindahkan dan menyalin data.</li>
                    <li><b>Tempel Khusus (Paste Special):</b> Fitur canggih untuk menempel hanya nilainya, hanya formatnya, atau hanya rumusnya saja. Sangat berguna agar tidak merusak tata letak tabel.</li>
                    <li><b>Cari dan Ganti:</b> Menemukan teks atau angka tertentu dan menggantinya dengan yang lain secara otomatis di seluruh lembar.</li>
                </ul>`
        },
        'view-menu': {
            title: 'Menu "Sisipkan"',
            content: `<p>Menu ini mengontrol apa yang Anda lihat di layar untuk membantu Anda fokus.</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Bekukan (Freeze Panes):</b> Mengunci baris atau kolom (biasanya judul) agar tetap terlihat saat Anda menggulir ke bawah atau ke samping.</li>
                    <li><b>Sembunyikan Garis Kisi:</b> Menghilangkan garis-garis sel agar tampilan lebih bersih seperti dokumen biasa.</li>
                    <li><b>Tampilkan Formula:</b> Menampilkan semua rumus di dalam sel, bukan hasilnya. Berguna untuk memeriksa pekerjaan.</li>
                    <li><b>Zoom:</b> Memperbesar atau memperkecil tampilan.</li>
                </ul>`
        },
        'insert-menu': {
            title: 'Menu "Format"',
            content: `<p>Gunakan menu ini untuk menambahkan elemen baru ke dalam spreadsheet Anda.</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Sisipkan Grafik:</b> Membuat visualisasi data seperti diagram batang, garis, atau lingkaran untuk mempermudah analisis.</li>
                    <li><b>Sisipkan Gambar:</b> Menambahkan gambar ke dalam sel atau di atas sel.</li>
                    <li><b>Sisipkan Kotak Centang:</b> Membuat daftar tugas atau checklist interaktif.</li>
                    <li><b>Sisipkan Sparkline:</b> Membuat grafik kecil di dalam satu sel untuk menunjukkan tren data secara ringkas.</li>
                </ul>`
        },
        'format-menu': {
            title: 'Menu "Data"',
            content: `<p>Ubah tampilan data Anda agar lebih mudah dibaca dan menarik secara visual.</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Format Angka:</b> Mengubah angka menjadi format mata uang, persentase, tanggal, dll.</li>
                    <li><b>Format Bersyarat:</b> Mengubah warna sel secara otomatis berdasarkan aturannya. Contoh: buat sel menjadi merah jika nilainya di bawah target.</li>
                    <li><b>Rotasi Teks:</b> Memutar teks di dalam sel, biasanya digunakan untuk judul kolom yang panjang.</li>
                    <li><b>Perataan:</b> Mengatur posisi teks (kiri, tengah, kanan, atas, bawah).</li>
                </ul>`
        },
        'data-menu': {
            title: 'Menu "Alat"',
            content: `<p>Ini adalah menu untuk para analis data! Semua alat untuk mengelola dan menganalisis data ada di sini.</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Urutkan Rentang:</b> Mengurutkan data berdasarkan abjad (A-Z) or angka (terkecil ke terbesar).</li>
                    <li><b>Buat Filter:</b> Menyaring data untuk menampilkan baris yang memenuhi kriteria tertentu saja.</li>
                    <li><b>Validasi Data:</b> Mencegah kesalahan input dengan membatasi data yang bisa dimasukkan ke dalam sel (misalnya, harus berupa email atau angka antara 1-100).</li>
                </ul>`
        },
        'file-icon': {
            title: 'Ikon Dokumen',
            content: `<p>Ikon ini menandakan bahwa Anda sedang bekerja di Google Sheets. Mengkliknya akan membawa Anda ke halaman utama Google Sheets, di mana Anda dapat melihat semua file yang telah Anda buat atau dibagikan kepada Anda.</p>`
        },
        'file-name': {
            title: 'Judul Dokumen',
            content: `<p>Ini adalah nama file spreadsheet Anda saat ini. Untuk mengubahnya, cukup klik pada judul ini dan ketikkan nama baru yang Anda inginkan. Nama file akan otomatis disimpan saat Anda mengetik.</p>`
        },
        'star-icon': {
            title: 'Ikon Bintang',
            content: `<p>Mengklik ikon bintang ini akan menandai file spreadsheet ini sebagai "Favorit" atau "Berbintang". File yang diberi bintang akan lebih mudah ditemukan karena akan muncul di bagian khusus di halaman utama Google Drive Anda.</p>`
        },
        'profile-icon': {
            title: 'Ikon Profil',
            content: `<p>Ikon ini menampilkan foto profil pengguna yang sedang masuk atau mengedit file. Dalam mode kolaborasi, Anda akan melihat ikon profil orang lain yang sedang membuka file yang sama, memungkinkan Anda untuk melihat siapa saja yang sedang bekerja dan berinteraksi secara real-time.</p>`
        },
        'collaboration': {
            title: 'Tombol Bagikan',
            content: `<p>Tombol ini adalah inti dari fitur kolaborasi di Google Sheets. Mengkliknya akan membuka jendela di mana Anda dapat:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li>Mengundang orang lain dengan alamat email mereka.</li>
                    <li>Mengatur hak akses, seperti apakah mereka hanya bisa melihat, mengomentari, atau mengedit.</li>
                    <li>Membuat tautan yang bisa dibagikan kepada siapa pun.</li>
                </ul>`
        },
        'toolbar': {
            title: 'Toolbar (Bilah Alat)',
            content: `<p>Ini adalah kumpulan tombol pintas untuk fungsi yang paling sering digunakan dari menu di atas. Toolbar memungkinkan Anda untuk bekerja lebih cepat tanpa harus membuka menu setiap saat. Di sini Anda bisa dengan cepat mengubah font, menebalkan teks, memberi warna sel, menambahkan border, dan banyak lagi.</p>`
        },
        'undo-icon': {
            title: 'Ikon Undo',
            content: `<p>Ikon ini berfungsi untuk mengembalikan tindakan terakhir yang Anda lakukan. Jika Anda tidak sengaja menghapus sesuatu atau membuat kesalahan, cukup klik ikon ini untuk membatalkannya.</p>`
        },
        'redo-icon': {
            title: 'Ikon Redo',
            content: `<p>Ikon ini berfungsi untuk mengulangi tindakan yang baru saja Anda batalkan dengan Undo. Sangat berguna jika Anda berubah pikiran setelah membatalkan suatu tindakan.</p>`
        },
        'print-icon': {
            title: 'Ikon Cetak',
            content: `<p>Mengklik ikon ini akan membuka jendela pratinjau cetak, memungkinkan Anda untuk mengatur dan mencetak lembar kerja Anda.</p>`
        },
        'paint-format-icon': {
            title: 'Ikon Format Painter',
            content: `<p>Ikon ini adalah alat ajaib untuk menyalin format dari satu sel dan menempelkannya ke sel lain tanpa menyalin isinya. Klik pada sel yang memiliki format yang Anda suka, klik ikon ini, lalu klik pada sel lain yang ingin Anda format.</p>`
        },
        'zoom-icon': {
            title: 'Ikon Zoom',
            content: `<p>Ikon ini memungkinkan Anda memperbesar atau memperkecil tampilan lembar kerja Anda agar lebih nyaman dilihat.</p>`
        },
        'font-type-icon': {
            title: 'Ikon Jenis Font',
            content: `<p>Dengan mengklik ikon ini, Anda dapat mengubah jenis font (misalnya, dari Arial ke Times New Roman) dari teks yang Anda pilih.</p>`
        },
        'font-size-icon': {
            title: 'Ikon Ukuran Font',
            content: `<p>Gunakan ikon ini untuk mengubah ukuran teks (misalnya, dari 10 ke 14) di dalam sel.</p>`
        },
        'bold-icon': {
            title: 'Ikon Bold (Tebal)',
            content: `<p>Klik ikon ini untuk membuat teks yang dipilih menjadi tebal. Pintasan keyboard-nya adalah <b>Ctrl+B</b>.</p>`
        },
        'italic-icon': {
            title: 'Ikon Italic (Miring)',
            content: `<p>Klik ikon ini untuk membuat teks yang dipilih menjadi miring. Pintasan keyboard-nya adalah <b>Ctrl+I</b>.</p>`
        },
        'underline-icon': {
            title: 'Ikon Underline (Garis Bawah)',
            content: `<p>Klik ikon ini untuk memberikan garis bawah pada teks yang dipilih. Pintasan keyboard-nya adalah <b>Ctrl+U</b>.</p>`
        },
        'text-color-icon': {
            title: 'Ikon Warna Teks',
            content: `<p>Ikon ini berfungsi untuk mengganti warna dari teks yang Anda pilih.</p>`
        },
        'fill-color-icon': {
            title: 'Ikon Warna Isi (Fill Color)',
            content: `<p>Gunakan ikon ini untuk mengisi warna latar belakang dari sel yang Anda pilih. Misalnya, mewarnai sel dengan warna kuning untuk menyorotnya.</p>`
        },
        'border-icon': {
            title: 'Ikon Garis Tepi (Borders)',
            content: `<p>Klik ikon ini untuk menambahkan garis di sekeliling sel atau sekelompok sel. Ini berguna untuk membuat tabel yang lebih terstruktur dan rapi.</p>`
        },
        'merge-cells-icon': {
            title: 'Ikon Gabungkan Sel (Merge Cells)',
            content: `<p>Ikon ini memungkinkan Anda untuk menggabungkan dua atau lebih sel yang berdekatan menjadi satu sel yang lebih besar. Sering digunakan untuk membuat judul tabel yang memanjang.</p>`
        },
        'align-icon': {
            title: 'Ikon Perataan (Align)',
            content: `<p>Ikon ini berfungsi untuk mengatur perataan teks di dalam sel, seperti rata kiri, tengah, atau kanan.</p>`
        },
        'functions-icon': {
            title: 'Ikon Fungsi',
            content: `<p>Ikon sigma (&Sigma;) ini adalah tombol pintas untuk formula-formula umum seperti SUM (menjumlahkan), AVERAGE (mencari rata-rata), dan MAX (mencari nilai tertinggi). Menghemat waktu Anda saat ingin melakukan perhitungan dasar.</p>`
        },
        'name-box': {
            title: 'Kotak Nama (Name Box)',
            content: `<p>Kotak ini menunjukkan alamat atau "nama" dari sel yang sedang Anda pilih (misalnya, A1, B5, C10). Anda juga bisa mengetikkan alamat sel di sini dan menekan Enter untuk langsung melompat ke sel tersebut. Fitur lanjutannya adalah menamai sebuah rentang sel (misalnya, menamai A1:A10 sebagai "Penjualan_Januari") agar lebih mudah digunakan dalam formula.</p>`
        },
        'formula-bar': {
            title: 'Baris Formula (Formula Bar)',
            content: `<p>Ini adalah tempat Anda melihat, mengetik, dan mengedit isi sebenarnya dari sebuah sel. Jika sebuah sel berisi angka atau teks, baris ini akan menampilkannya. Jika sel berisi formula (misalnya, =SUM(A1:A10)), sel itu sendiri akan menampilkan hasilnya (misalnya, 550), tetapi baris formula akan menunjukkan formula aslinya. Ini adalah area kerja utama Anda saat berurusan dengan rumus.</p>`
        },
        'grid': {
            title: 'Grid (Jaringan Sel)',
            content: `<p>Ini adalah area kerja utama spreadsheet, yang terdiri dari:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Kolom:</b> Lajur vertikal yang diidentifikasi dengan huruf (A, B, C, ...).</li>
                    <li><b>Baris:</b> Lajur horizontal yang diidentifikasi dengan angka (1, 2, 3, ...).</li>
                    <li><b>Sel:</b> Pertemuan antara kolom dan baris (misalnya, sel C5 adalah pertemuan kolom C dan baris 5). Setiap sel adalah tempat Anda memasukkan data, teks, atau formula.</li>
                </ul>`
        },
        'column': {
            title: 'Kolom',
            content: `<p>Kolom adalah lajur vertikal yang diidentifikasi dengan huruf (A, B, C, dst.). Mengklik sebuah huruf pada header kolom akan memilih semua sel di dalam kolom tersebut. Ini berguna untuk menerapkan format yang sama atau melakukan operasi pada seluruh kolom sekaligus.</p>`
        },
        'row': {
            title: 'Baris',
            content: `<p>Baris adalah lajur horizontal yang diidentifikasi dengan angka (1, 2, 3, dst.). Mengklik sebuah angka pada header baris akan memilih semua sel di dalam baris tersebut. Ini berguna untuk mengelola data per baris, seperti menghapus atau menyalin satu baris penuh.</p>`
        },
        'cell': {
            title: 'Sel',
            content: `<p>Sel adalah kotak individu di mana baris dan kolom bertemu. Ini adalah unit dasar dari spreadsheet di mana Anda dapat memasukkan data, teks, angka, atau formula. Setiap sel memiliki alamat unik, misalnya A1, B5, atau C10, yang digunakan untuk mengidentifikasinya dalam formula dan referensi.</p>`
        },
        'sheet-tabs': {
            title: 'Tab Lembar (Sheet Tabs)',
            content: `<p>Spreadsheet bisa memiliki beberapa lembar kerja atau "sheet" di dalam satu file, seperti halaman dalam sebuah buku. Tab ini memungkinkan Anda untuk:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><b>Menambah sheet baru</b> dengan mengklik tombol (+).</li>
                    <li><b>Beralih antar sheet</b> dengan mengklik namanya.</li>
                    <li><b>Mengganti nama, menduplikasi, atau menghapus sheet</b> dengan mengklik panah kecil di samping nama sheet.</li>
                </ul>
                <p class="mt-2">Ini sangat berguna untuk mengorganisir data, misalnya memisahkan data penjualan setiap bulan ke dalam sheet yang berbeda.</p>`
        },
        'add-sheet-button': {
            title: 'Tombol Tambah Sheet (+)',
            content: `<p>Tombol ini memungkinkan Anda untuk dengan cepat menambahkan lembar kerja (sheet) baru ke dalam spreadsheet Anda. Anda dapat menggunakan sheet baru ini untuk mengorganisir data yang berbeda di dalam satu file, menjaga semuanya tetap rapi dan terstruktur.</p>`
        }
    };

    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');
    const interactiveAreas = document.querySelectorAll('.interactive-area');

    interactiveAreas.forEach(area => {
        area.addEventListener('click', (event) => {
            const targetId = event.currentTarget.dataset.target;

            if (targetId && infoData[targetId]) {
                const data = infoData[targetId];
                modalTitle.textContent = data.title;
                modalContent.innerHTML = data.content;
                modal.classList.remove('opacity-0', 'invisible');
                modal.setAttribute('aria-hidden', 'false');
                modal.querySelector('div').classList.remove('scale-95');
                modal.querySelector('div').classList.add('scale-100');
            }
        });
    });

    const closeInfoModal = () => {
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
             modal.classList.add('invisible');
             modal.setAttribute('aria-hidden', 'true');
        }, 300);
    };

    closeModalBtn.addEventListener('click', closeInfoModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeInfoModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('invisible')) {
            closeInfoModal();
        }
    });
</script>

</body>
</html>
