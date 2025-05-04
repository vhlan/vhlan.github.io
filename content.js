// // Dijalankan setiap kali user membuka halaman untuk mendaftarkan menu konteks
// document.addEventListener("contextmenu", event => {
//     if (event.target.tagName === "IMG") {
//         // Identifikasi elemen gambar yang diklik
//         chrome.runtime.sendMessage({ imageUrl: event.target.src });
//     }
// });

let typedText = '';  // Variabel untuk menyimpan teks yang diketik
let spreadsheetTab;  // Variabel untuk menyimpan referensi ke tab spreadsheet

// Fungsi utama untuk memantau setiap tombol yang ditekan
function monitorKeydownEvents() {
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();  // Mendapatkan tombol yang ditekan, konversi ke huruf kecil

    // Cek jika tombol yang ditekan adalah huruf atau backspace
    if (/^[a-z]$/.test(key)) {
      typedText += key;  // Tambahkan karakter ke typedText
    } else if (key === 'backspace') {
      // Jika backspace ditekan, hapus karakter terakhir
      typedText = typedText.slice(0, -1);
    }

    // Jika spasi atau enter ditekan setelah mengetik kata
    if (key === ' ' || key === 'enter') {
      // Cek apakah kata yang diketik adalah 'kosong'
      if (typedText === 'kosong') {
        // Tampilkan konfirmasi
        const confirmed = confirm('Barang Kosong? tambahkan ke Call Card!');
        // Reset typedText setelah konfirmasi
        typedText = '';

        // Jika pengguna mengklik OK pada konfirmasi
        if (confirmed) {
          const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1jvd2I41xD7Q_Au0Z5HGzhQXAQNuqzIFBN8I35xGF9gw/edit?gid=979182407#gid=979182407';

          // Jika tab spreadsheet sudah terbuka dan belum tertutup
          if (spreadsheetTab && !spreadsheetTab.closed) {
            spreadsheetTab.focus(); // Fokuskan ke tab yang sudah terbuka
          } else {
            // Jika tab belum terbuka atau sudah tertutup, buka tab baru
            spreadsheetTab = window.open(spreadsheetUrl, '_blank');
            spreadsheetTab.focus(); // Fokuskan ke tab baru
          }
        }
      } else {
        // Jika kata yang diketik bukan 'kosong', langsung reset typedText
        typedText = '';
      }
    }
  });
}

// Mengecek nilai callCardMode dari chrome.storage.local
chrome.storage.local.get(['callCardMode'], function (result) {
  if (result.callCardMode === true) {
    // Hanya aktifkan pemantauan keydown jika callCardMode bernilai true
    monitorKeydownEvents();
  }
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "copyProductInfo") {
//       const trElement = document.activeElement.closest('tr.o_data_row');
//       if (trElement) {
//           const sku = trElement.querySelector('[name="default_code"]').innerText;
//           let itemName = trElement.querySelector('[name="name"]').innerText;
//           let price = trElement.querySelector('[name="lst_price"]').innerText;

//           // Pindahkan teks dalam kurung dari SKU ke depan itemName, jika ada
//           const bracketText = sku.match(/\(([^)]+)\)/);
//           if (bracketText) {
//               itemName = `${itemName} (${bracketText[1]})`;
//           }

//           // Ubah harga menjadi format "K"
//           price = price.replace(/,000$/, "K");

//           // Format hasil akhir
//           const resultText = `${itemName} - *${price}*`;

//           // Salin hasil akhir ke clipboard menggunakan Clipboard API
//           navigator.clipboard.writeText(resultText).then(() => {
//               console.log("Text copied to clipboard:", resultText);
//           }).catch((err) => {
//               console.error("Failed to copy text:", err);
//           });
//       }
//   }
// });
// content.js

// Variabel global untuk menyimpan SKU terakhir yang tercatat untuk stats
let lastRecordedStatsSKU = null;
let currentRow = null;

// Fungsi untuk update stats ke chrome.storage.local dengan key STATS_TAHUN_BULAN_TANGGAL
function updateStats(sku) {
  // Cek apakah SKU sama dengan terakhir yang tercatat; jika iya, jangan update
  if (lastRecordedStatsSKU === sku) {
    return;
  }
  // Update variabel global
  lastRecordedStatsSKU = sku;
  const now = new Date();
  const statsKey = `STATS_${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;

  chrome.storage.local.get([statsKey], function (data) {
    let statsData = data[statsKey] || [];
    // Cari apakah sku sudah ada
    const existing = statsData.find(item => item.sku === sku);
    if (existing) {
      existing.count += 1;
    } else {
      statsData.push({
        sku: sku,
        count: 1
      });
    }
    chrome.storage.local.set({ [statsKey]: statsData }, function () {
      console.log(`Stats updated for ${sku} in key ${statsKey}`);
    });
  });
}

// Cek apakah URL saat ini adalah yang diinginkan
if (window.location.href.startsWith("https://app-erp-dnbk.discountnotebook.id/")) {
  // Fungsi untuk mendeteksi elemen tr.o_data_row saat kursor bergerak
  document.addEventListener('mousemove', (event) => {
    const trElement = event.target.closest('tr.o_data_row');
    if (trElement) {
      currentRow = trElement; // Simpan baris saat ini
    }
  });

  // Deklarasikan secara global, pastikan deklarasi ini tidak terjadi ulang tiap event
  let currentCopy = "";

  // Mendengarkan penekanan tombol
  document.addEventListener('keydown', (event) => {
    // Shortcut pertama: Persis Ctrl + Q
    if (
      event.ctrlKey &&
      !event.altKey &&
      !event.shiftKey &&
      !event.metaKey &&
      (event.key === "q" || event.key === "Q")
    ) {
      event.preventDefault();

      if (currentRow) {
        chrome.storage.local.get(["activateStatus"], function (result) {
          if (result.activateStatus) {
            const sku = currentRow.querySelector('[name="default_code"]').innerText;
            let itemName = currentRow.querySelector('[name="name"]').innerText;
            let price = currentRow.querySelector('[name="lst_price"]').innerText;
            let stockItem = currentRow.querySelector('[name="qty_available"]').innerText;

            // Update stats (panggil fungsi updateStats)
            updateStats(sku);

            // Konversi stockItem ke angka
            stockItem = parseFloat(stockItem);

            // Pindahkan teks dalam kurung dari SKU ke depan itemName, jika ada
            const bracketText = sku.match(/\(([^)]+)\)/);
            if (bracketText) {
              itemName = `${itemName} (${bracketText[1]})`;
            }

            // Ubah harga menjadi format "K"
            price = price.replace(/,000$/, "K");

            // Tentukan hasil berdasarkan kondisi stockItem dan prefix SKU
            let resultText;
            if (sku.startsWith("KARBT-") && stockItem <= 1 && stockItem > 0) {
              resultText = `Stock sisa 1\nBaterai Merek KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi Baterai 1 Tahun`;
            } else if (sku.startsWith("KARBT-") && stockItem > 0) {
              resultText = `Baterai KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi Baterai 1 Tahun`;
            } else if (sku.startsWith("KARBT-") && stockItem <= 0) {
              resultText = `*Kosong* kak, harga terakhir\nBaterai Merek KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi Baterai 1 Tahun`;
            } else if (sku.startsWith("KARKB-") && stockItem <= 1 && stockItem > 0) {
              resultText = `Stock sisa 1\nKeyboard Merek KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi 6 Bulan`;
            } else if (sku.startsWith("KARKB-") && stockItem > 0) {
              resultText = `Keyboard Merek KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi 6 Bulan`;
            } else if (sku.startsWith("KARKB-") && stockItem <= 0) {
              resultText = `*Kosong* kak, harga terakhir\nKeyboard Merek KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi 6 Bulan`;
            } else if (sku.startsWith("KARCG") && stockItem <= 1 && stockItem > 0) {
              resultText = `Stock sisa 1\nAdaptor Merek KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi 2 Tahun`;
            } else if (sku.startsWith("KARCG") && stockItem > 0) {
              resultText = `Adaptor Merek KARSTENS untuk [${sku}] ${itemName} - *${price}*\nGaransi 2 Tahun`;
            } else if (sku.startsWith("KARCG") && stockItem <= 0) {
              resultText = `*Kosong* kak, harga terakhir\nAdaptor untuk [${sku}] ${itemName} - *${price}*\nGaransi 2 Tahun`;
            } else if (stockItem <= 1 && stockItem > 0) {
              resultText = `Stock sisa 1\n[${sku}] ${itemName} - *${price}*`;
              var textNotif = `Stok sisa satu! apakah tidak ada yang keep?`;
              showNotification(textNotif);
            } else if (stockItem <= 0) {
              resultText = `*Kosong* kak, harga terakhir\n[${sku}] ${itemName} - *${price}*`;
            } else {
              resultText = `[${sku}] ${itemName} - *${price}*`;
            }
            
            if (sku.startsWith("CG-") &&
                (itemName.toUpperCase().includes("SQUARE") ||
                 itemName.toUpperCase().includes("WALL") ||
                 itemName.toUpperCase().includes("MAGSAFE"))) {
              // jangan tambahkan apa2
            } else if (sku.startsWith("CG-") && stockItem > 0) {
              resultText += "\n*Harga tanpa Kabel Power*";
            }

            // Salin hasil akhir ke clipboard
            navigator.clipboard.writeText(resultText).catch((err) => {
              console.error("Failed to copy text:", err);
            });
            callNotification(sku);

            // Jika stok kosong, proses penyimpanan ke CallCard
            if (stockItem <= 0) {
              if (currentCopy === sku) {
                var textNotif = `SKU ${sku} sudah di Tambahkan!`;
                showNotification(textNotif);
                return;  // Jika aksi berulang, berhenti di sini (tidak count ulang karena updateStats sudah menangani duplikat)
              }
              currentCopy = sku;

              const now = new Date();
              const currentDateKey = `CallCard_${now.getFullYear()}_${String(
                now.getMonth() + 1
              ).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;

              chrome.storage.local.get([currentDateKey], function (data) {
                let callCardData = data[currentDateKey] || [];

                callCardData.push({
                  id: callCardData.length + 1,
                  sku: sku,
                });

                var textNotif = currentCopy + " Telah di Tambahkan di Call Card";
                showNotification(textNotif);

                chrome.storage.local.set({ [currentDateKey]: callCardData }, function () {
                  console.log(`SKU ${sku} disimpan ke ${currentDateKey}`);
                });
              });
            }
          } else {
            // Jika fitur tidak aktif, salin pesan gagal ke clipboard
            navigator.clipboard.writeText("Tools unavailable, please contact support muhahlaan@gmail.com").catch((err) => {
              console.error("Failed to copy text:", err);
            });
          }
        });
      } else {
        alert("No product row is currently selected!");
      }
    }

    // Shortcut kedua: Persis Ctrl + Alt + Q
    if (
      event.ctrlKey &&
      event.altKey &&
      !event.shiftKey &&
      !event.metaKey &&
      (event.key === 'q' || event.key === 'Q')
    ) {
      event.preventDefault();

      if (currentRow) {
        chrome.storage.local.get(["activateStatus"], function (result) {
          if (result.activateStatus) {
            const sku = currentRow.querySelector('[name="default_code"]').innerText;

            // Update stats untuk ctrl+alt+q
            updateStats(sku);

            // Cek apakah SKU berawalan "CG-"
            if (!sku.startsWith("CG-")) {
              alert("Produk ini tidak menggunakan kabel Power");
              return; // Hentikan eksekusi jika SKU tidak berawalan "CG-"
            }

            let itemName = currentRow.querySelector('[name="name"]').innerText;
            let priceCell = currentRow.querySelector('[name="lst_price"]');
            let price = priceCell.innerText;
            let stockItem = currentRow.querySelector('[name="qty_available"]').innerText;

            // Konversi stok ke angka
            stockItem = parseFloat(stockItem);

            // Pindahkan teks dalam kurung dari SKU ke depan itemName, jika ada
            const bracketText = sku.match(/\(([^)]+)\)/);
            if (bracketText) {
              itemName = `${itemName} (${bracketText[1]})`;
            }

            // Ambil harga asli dan ubah menjadi angka
            let originalPrice = parseFloat(price.replace(/,/g, ""));
            let increaseAmount = 10000;

            // Tambahkan Rp10,000 pada harga
            let newPrice = originalPrice + increaseAmount;
            let formattedPrice = newPrice.toLocaleString("id-ID", { minimumFractionDigits: 2 });

            // Tambahkan "+ KABEL POWER" pada itemName
            itemName = `${itemName} + KABEL POWER`;

            // Format hasil akhir
            let resultText;
            if (stockItem <= 1 && stockItem > 0) {
              resultText = `Stock sisa 1\n[${sku}] ${itemName} - *${formattedPrice}*`;
              var textNotif = `Stok sisa satu! apakah tidak ada yang keep?`;
              showNotification(textNotif);
            } else if (stockItem <= 0) {
              resultText = `*Kosong* kak, harga terakhir\n[${sku}] ${itemName} - *${formattedPrice}*`;
            } else {
              resultText = `[${sku}] ${itemName} - *${formattedPrice}*`;
            }

            // Salin hasil akhir ke clipboard
            navigator.clipboard.writeText(resultText).catch((err) => {
              console.error("Failed to copy text:", err);
            });
            callNotification(sku);

            // Jika stok kosong, cek dan tambahkan ke chrome.storage.local
            if (stockItem <= 0) {
              if (currentCopy === sku) {
                var textNotif = `SKU ${sku} sudah di Tambahkan!`;
                showNotification(textNotif);
                return;
              }
              currentCopy = sku;
              const now = new Date();
              const currentDateKey = `CallCard_${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;

              chrome.storage.local.get([currentDateKey], function (data) {
                let callCardData = data[currentDateKey] || [];

                callCardData.push({
                  id: callCardData.length + 1,
                  sku: sku
                });

                var textNotif = currentCopy + " Telah di Tambahkan di Call Card";
                showNotification(textNotif);

                chrome.storage.local.set({ [currentDateKey]: callCardData }, function () {
                  console.log(`SKU ${sku} disimpan ke ${currentDateKey}`);
                });
              });
            }
          } else {
            // Jika fitur tidak aktif, salin pesan gagal ke clipboard
            navigator.clipboard.writeText("Tools unavailable, please contact support muhahlaan@gmail.com").catch((err) => {
              console.error("Failed to copy text:", err);
            });
          }
        });
      } else {
        alert("No product row is currently selected for Ctrl + Alt + Q!");
      }
    }
  });
}

function getContrastYIQ(hexcolor) {
  if (!hexcolor) return '#f0f0f0'; // default text color jika warna tidak didefinisikan
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

// Global queue untuk notifikasi bubble
let notificationQueue = [];

// Fungsi untuk menampilkan notifikasi bubble dengan animasi
function showNotification(textNotif, bgColor = "#000000") { // gunakan nilai hex sebagai default
  // Cek apakah container sudah ada
  let container = document.getElementById("notification-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "notification-container";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.left = "20px";
    // Menggunakan column-reverse agar notifikasi baru muncul di bagian bawah
    container.style.display = "flex";
    container.style.flexDirection = "column-reverse";
    container.style.width = "25%";
    container.style.gap = "10px"; // jarak antar notifikasi
    container.style.zIndex = "1000";
    document.body.appendChild(container);
  }

  // Buat elemen notifikasi
  let notification = document.createElement("div");
  notification.innerText = textNotif;
  notification.style.backgroundColor = bgColor;
  // Panggil fungsi getContrastYIQ untuk menentukan warna teks
  notification.style.color = getContrastYIQ(bgColor);
  notification.style.padding = "10px 15px";
  notification.style.borderRadius = "8px";
  notification.style.fontSize = "12px";
  // Set properti untuk animasi
  notification.style.opacity = "1";
  notification.style.width = "100%";
  notification.style.transform = "translateY(0)";
  notification.style.transition = "opacity 0.5s ease, transform 0.5s ease";

  // Tambahkan notifikasi ke container dan ke queue
  container.appendChild(notification);
  notificationQueue.push(notification);
  playNotificationSound();
  // Jika notifikasi ini adalah yang pertama di queue, mulai proses penghapusan
  if (notificationQueue.length === 1) {
    scheduleNextRemoval();
  }
}

// Fungsi untuk menghapus notifikasi satu per satu secara berurutan
function scheduleNextRemoval() {
  if (notificationQueue.length === 0) return;
  // Delay sebelum memulai animasi penghilangan notifikasi (misal 3 detik)
  setTimeout(() => {
    // Ambil notifikasi terendah (karena container dengan column-reverse, yang pertama di queue adalah yang paling bawah)
    let notification = notificationQueue.shift();
    // Mulai animasi fade-out dan slide ke bawah
    notification.style.opacity = "0";
    notification.style.transform = "translateY(20px)";
    // Setelah animasi selesai, hapus notifikasi dari DOM
    notification.addEventListener("transitionend", function () {
      notification.remove();
      // Jika container kosong, hapus container juga
      let container = document.getElementById("notification-container");
      if (container && container.childElementCount === 0) {
        container.remove();
      }
      // Panggil kembali fungsi untuk menghapus notifikasi selanjutnya
      scheduleNextRemoval();
    }, { once: true });
  }, 3000);
}

// Fungsi callNotification yang mengambil data dari chrome.storage.local dan menampilkan notifikasi
function callNotification(sku) {
  chrome.storage.local.get("notes", function (result) {
    const notes = result.notes;
    if (!notes || !Array.isArray(notes)) return; // pastikan notes ada dan berupa array

    // Filter semua note dengan sku yang sesuai (tidak case sensitive)
    const matchingNotes = notes.filter(note => note.sku.toLowerCase() === sku.toLowerCase());
    if (matchingNotes.length === 0) return; // jika tidak ada yang cocok, keluar fungsi

    // Pisahkan antara alert dan bubble
    const alertNotes = matchingNotes.filter(note => note.notification === "alert");
    const bubbleNotes = matchingNotes.filter(note => note.notification !== "alert");

    // Gabungkan deskripsi untuk notifikasi alert jika ada lebih dari satu note
    if (alertNotes.length > 0) {
      let alertMessage = "";
      alertNotes.forEach((note, index) => {
        alertMessage += `[note ${index + 1}] ${note.description}\n`;
      });
      alert(alertMessage);
    }

    // Tampilkan bubble notification secara terpisah
    bubbleNotes.forEach(note => {
      // Pastikan note.color menggunakan format hex agar getContrastYIQ bekerja dengan benar
      showNotification(note.description, note.color || "#000000");
    });
  });
}

function playNotificationSound() {
  const audioUrl = chrome.runtime.getURL('sounds/notification.mp3');
  const audio = new Audio(audioUrl);
  audio.play().catch(error => {
    console.error("Error saat memainkan suara:", error);
  });
}

// Status apakah harga telah diubah
// let isPriceAdjusted = false;

// Fungsi untuk memantau perubahan pada elemen target
function observeContent(targetElement) {
  const handleContentChange = () => {
    // Muat status dari storage saat pertama kali dijalankan
    chrome.storage.local.get("isPriceAdjusted", (data) => {
      isPriceAdjusted = data.isPriceAdjusted || false;
      console.log("Status di content.js:", isPriceAdjusted);
      if (isPriceAdjusted) {
        togglePriceAdjustment(); // Langsung jalankan jika aktif
      }
    });
  };

  const observer = new MutationObserver((mutationsList) => {
    // if (!isPriceAdjusted) return; // Hindari reaksi saat mode nonaktif

    for (const mutation of mutationsList) {
      if (
        mutation.type === "childList" ||
        mutation.type === "characterData" ||
        mutation.type === "attributes"
      ) {
        handleContentChange();
        // Muat status dari storage saat pertama kali dijalankan
        chrome.storage.local.get("isPriceAdjusted", (data) => {
          isPriceAdjusted = data.isPriceAdjusted || false;
          console.log("Status di content.js:", isPriceAdjusted);
          if (isPriceAdjusted) {
            togglePriceAdjustment(); // Langsung jalankan jika aktif
          }
        });
        break; // Alert hanya sekali untuk setiap perubahan
      }
    }
  });

  const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  };

  observer.observe(targetElement, observerConfig);
}

// Fungsi untuk memantau kemunculan elemen .o_content
function watchForElement(selector, callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
          observer.disconnect(); // Hentikan pengamatan setelah elemen ditemukan
          callback(targetElement); // Jalankan callback dengan elemen yang ditemukan
          break;
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// function togglePriceAdjustment() {
//   const defaultCodeCells = document.querySelectorAll('td[name="default_code"]');

//   defaultCodeCells.forEach((cell) => {
//     const defaultCode = cell.textContent.trim();
//     let increaseAmount = 0;

//     // Menentukan jumlah kenaikan harga berdasarkan kode
// // Menentukan jumlah kenaikan harga berdasarkan kode
// if (defaultCode.startsWith("CG-")) {
//   increaseAmount = 75000; // Adaptor (CG-) = 75,000 IDR
// } else if (defaultCode.startsWith("ORBT-") || defaultCode.startsWith("BT-")) {
//   increaseAmount = 100000; // Battery (ORBT- DAN BT-) = 100,000 IDR
// } else if (defaultCode.startsWith("KARBT-") || defaultCode.startsWith("BT-")) {
//   increaseAmount = 100000; // Battery (ORBT- DAN BT-) = 100,000 IDR
// } else if (defaultCode.startsWith("KB-")) {
//   increaseAmount = 100000; // Keyboard (KB-) = 100,000 IDR
// } else if (defaultCode.startsWith("LCD-")) {
//   increaseAmount = 100000; // LCD (LCD-) = 100,000 IDR
// } else if (defaultCode.startsWith("SSD-")) {
//   increaseAmount = 75000; // SSD (SSD-) = 75,000 IDR
// } else if (defaultCode.startsWith("DDR-")) {
//   increaseAmount = 75000; // DDR (DDR-) = 75,000 IDR
// } else if (defaultCode.startsWith("MOS-")) {
//   increaseAmount = 5000; // Harga untuk MOS- tidak disebutkan, disesuaikan
// } else if (defaultCode.startsWith("KABEL")) {
//   increaseAmount = 10000; // KABEL = 10,000 IDR
// } else if (defaultCode.startsWith("FAN-")) {
//   increaseAmount = 50000; // Fan (FAN-) = 50,000 IDR
// } else if (defaultCode.startsWith("DVD-")) {
//   increaseAmount = 25000; // DVD (DVD-) = 25,000 IDR
// } else if (defaultCode.startsWith("HDD-")) {
//   increaseAmount = 75000; // HDD (HDD-) = 75,000 IDR
// } else {
//   increaseAmount = 0; // Default jika kode tidak terdaftar
// }


//     const priceCell = cell.parentElement.querySelector('td[name="lst_price"]');
//     if (priceCell) {
//       let originalPrice = parseFloat(priceCell.getAttribute("data-original-price"));
//       if (!originalPrice) {
//         originalPrice = parseFloat(priceCell.textContent.replace(/,/g, ""));
//         priceCell.setAttribute("data-original-price", originalPrice);
//       }

//       chrome.storage.local.get("isPriceAdjusted", (data) => {
//         isPriceAdjusted = data.isPriceAdjusted || false;

//         if (isPriceAdjusted) {
//           const newPrice = originalPrice + increaseAmount;
//           priceCell.textContent = newPrice.toLocaleString("id-ID", {
//             minimumFractionDigits: 2,
//           });
//           priceCell.style.backgroundColor = "#f0f8ff";
//         } else {
//           // Mengembalikan harga ke nilai asli saat mode nonaktif
//           priceCell.textContent = originalPrice.toLocaleString("id-ID", {
//             minimumFractionDigits: 2,
//           });
//           priceCell.style.backgroundColor = ""; // Menghapus perubahan latar belakang
//         }
//       });
//     }
//   });
// }

function togglePriceAdjustment() {
  const defaultCodeCells = document.querySelectorAll('td[name="default_code"]');

  // Ambil data UserPricelist dari chrome.storage.local
  chrome.storage.local.get(["settings"], (result) => {
    const settings = result.settings || [];
    const userPricelist = settings.length > 0 ? settings[0].UserPricelist : [];

    defaultCodeCells.forEach((cell) => {
      const defaultCode = cell.textContent.trim();
      let increaseAmount = 0;

      // Cek apakah defaultCode cocok dengan salah satu prefix di UserPricelist
      const matchedItem = userPricelist.find(item => defaultCode.startsWith(item.prefix));

      if (matchedItem) {
        increaseAmount = matchedItem.price;
      }

      const priceCell = cell.parentElement.querySelector('td[name="lst_price"]');
      if (priceCell) {
        let originalPrice = parseFloat(priceCell.getAttribute("data-original-price"));
        if (!originalPrice) {
          originalPrice = parseFloat(priceCell.textContent.replace(/,/g, ""));
          priceCell.setAttribute("data-original-price", originalPrice);
        }

        chrome.storage.local.get("isPriceAdjusted", (data) => {
          const isPriceAdjusted = data.isPriceAdjusted || false;

          if (isPriceAdjusted) {
            const newPrice = originalPrice + increaseAmount;
            priceCell.textContent = newPrice.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            });
            priceCell.style.backgroundColor = "#f0f8ff";
          } else {
            // Mengembalikan harga ke nilai asli saat mode nonaktif
            priceCell.textContent = originalPrice.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            });
            priceCell.style.backgroundColor = ""; // Menghapus perubahan latar belakang
          }
        });
      }
    });
  });
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.isPriceAdjusted !== undefined) {
    isPriceAdjusted = message.isPriceAdjusted;
    console.log(`User mode status diperbarui: ${isPriceAdjusted}`);
    togglePriceAdjustment();
    // Langsung panggil togglePriceAdjustment saat mode aktif
    // if (isPriceAdjusted) {
    //   togglePriceAdjustment();
    // }
  }
});


// Mulai memantau kemunculan elemen .o_content
watchForElement(".o_content", (targetElement) => {
  console.log("Elemen .o_content ditemukan, mulai memantau perubahan konten.");
  // Muat status dari storage saat pertama kali dijalankan
  chrome.storage.local.get("isPriceAdjusted", (data) => {
    isPriceAdjusted = data.isPriceAdjusted || false;
    console.log("Status di content.js:", isPriceAdjusted);
    if (isPriceAdjusted) {
      togglePriceAdjustment(); // Langsung jalankan jika aktif
    }
  });
  observeContent(targetElement);
});

(function () {
  const currentUrl = window.location.href;
  const targetUrl = "https://app-erp-dnbk.discountnotebook.id/web#cids=1&menu_id=179&action=311&model=product.product&view_type=list";

  if (currentUrl !== targetUrl) return;

  let notes = [];
  let currentIndex = 0;
  let interval = null;

  function renderNote(index) {
    if (!notes.length) return;
    const note = notes[index];
    const skuText = note.sku ? `[${note.sku}] ` : "";
    const noteElem = document.getElementById("note");
    if (noteElem) {
      noteElem.textContent = `${skuText}${note.description} - ${note.timestamp}`;
    }
  }

  function showNext() {
    if (!notes.length) return;
    currentIndex = (currentIndex + 1) % notes.length;
    renderNote(currentIndex);
    resetTimer();
  }

  function showPrev() {
    if (!notes.length) return;
    currentIndex = (currentIndex - 1 + notes.length) % notes.length;
    renderNote(currentIndex);
    resetTimer();
  }

  function resetTimer() {
    clearInterval(interval);
    interval = setInterval(showNext, 3000);
  }

  function injectTicker() {
    const style = document.createElement("style");
    style.textContent = `
      .ticker {
        background: #5f5289;
        display: flex;
        align-items: center;
        color: #ffffff;
        padding: 4px 10px;
      }
      .ticker button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        color: white;
        font-size: 16px;
        cursor: pointer;
      }
      .note-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 1;
        padding: 0 10px;
      }
      .ticker button:last-of-type {
        margin-right: 5px;
      }
    `;
    document.head.appendChild(style);

    const ticker = document.createElement("div");
    ticker.className = "ticker";

    const shrtcut = document.createElement("div");
    shrtcut.className = "shortcutkey";
    shrtcut.textContent = "CTRL+SHIFT+S";

    const btnPrev = document.createElement("button");
    btnPrev.textContent = "⬆️";
    btnPrev.addEventListener("click", showPrev);

    const btnNext = document.createElement("button");
    btnNext.textContent = "⬇️";
    btnNext.addEventListener("click", showNext);

    const noteText = document.createElement("div");
    noteText.id = "note";
    noteText.className = "note-text";

    ticker.appendChild(btnPrev);
    ticker.appendChild(btnNext);
    ticker.appendChild(noteText);
    ticker.appendChild(shrtcut);

    ticker.addEventListener("mouseenter", () => clearInterval(interval));
    ticker.addEventListener("mouseleave", () => {
      interval = setInterval(showNext, 5000);
    });

    const checkTarget = () => {
      const target = document.querySelector("header");
      if (target && !document.getElementById("note")) {
        target.prepend(ticker);
        renderNote(currentIndex);
        interval = setInterval(showNext, 3000);
      } else {
        setTimeout(checkTarget, 500);
      }
    };

    checkTarget();
  }

  // Pertama kali ambil notes dari storage
  chrome.storage.local.get("notes", (result) => {
    notes = result.notes || [];
    injectTicker();
  });

  // Listener: jika notes diubah dari ekstensi lain, update isi ticker
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.notes) {
      notes = changes.notes.newValue || [];
      currentIndex = 0;
      renderNote(currentIndex);
    }
  });

})();

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'S' || event.key === 's')) {
    const description = prompt('Masukkan catatan cepat:');
    if (!description) return; // kalau tidak diisi, batal

    const getFormattedTimestamp = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const newNote = {
      sku: '',
      color: '#101010',
      notification: '',
      description,
      status: 'Pending',
      timestamp: getFormattedTimestamp()
    };

    chrome.storage.local.get({ notes: [] }, function (result) {
      const notes = result.notes;
      notes.push(newNote);
      chrome.storage.local.set({ notes: notes }, function () {
        console.log('Catatan cepat ditambahkan:', newNote);
      });
    });
  }
});
