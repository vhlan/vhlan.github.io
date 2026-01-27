let scanDirectoryHandle;
let storageDirectoryHandle;
let videoTasks = []; // Hasil scan folder (sementara)
let processedData = []; // Data permanen dari IndexedDB
let currentProcessingIndex = null;
let db;

// Inisialisasi IndexedDB (Versi 2 untuk memastikan store terbuat)
const dbRequest = indexedDB.open("VideoManagerDB", 2);

dbRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("processedVideos")) {
        db.createObjectStore("processedVideos", { keyPath: "id", autoIncrement: true });
    }
};

dbRequest.onsuccess = (e) => {
    db = e.target.result;
    console.log("Database Ready");
    loadSettingsFromDB();
    loadProcessedDataFromDB();
};

dbRequest.onerror = () => console.error("IndexedDB failed to open");

// --- FUNGSI DATABASE ---

async function loadSettingsFromDB() {
    if (!db) return;
    const tx = db.transaction("settings", "readonly");
    const store = tx.objectStore("settings");
    const request = store.get("current");

    request.onsuccess = () => {
        const settings = request.result;
        if (settings) {
            document.getElementById('extInput').value = settings.extensions || ".mp4, .mkv, .webm, .avi, .mov";
            document.getElementById('scanPathDisplay').innerText = settings.scanName || "Belum dipilih";
            document.getElementById('storePathDisplay').innerText = settings.storeName || "Belum dipilih";
        }
    };
}

async function saveSettings() {
    if (!db) return;
    const extensions = document.getElementById('extInput').value;
    const settings = {
        id: "current",
        extensions: extensions,
        scanName: scanDirectoryHandle ? scanDirectoryHandle.name : document.getElementById('scanPathDisplay').innerText,
        storeName: storageDirectoryHandle ? storageDirectoryHandle.name : document.getElementById('storePathDisplay').innerText
    };

    const tx = db.transaction("settings", "readwrite");
    const store = tx.objectStore("settings");
    const request = store.put(settings);

    request.onsuccess = () => {
        alert("Pengaturan Berhasil Disimpan!");
        closeSettings();
    };
}

async function loadProcessedDataFromDB() {
    if (!db) return;
    const tx = db.transaction("processedVideos", "readonly");
    const store = tx.objectStore("processedVideos");
    const request = store.getAll();

    request.onsuccess = () => {
        processedData = request.result;
        renderScanResults();
    };
}

// --- FUNGSI FOLDER ---

document.getElementById('btnScanDir').addEventListener('click', async () => {
    try {
        scanDirectoryHandle = await window.showDirectoryPicker();
        document.getElementById('scanPathDisplay').innerText = scanDirectoryHandle.name;
    } catch (e) {}
});

document.getElementById('btnStoreDir').addEventListener('click', async () => {
    try {
        storageDirectoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
        document.getElementById('storePathDisplay').innerText = storageDirectoryHandle.name;
    } catch (e) {}
});

async function cariSemuaVideo(directoryHandle) {
    const hasilPencarian = [];
    const extRaw = document.getElementById('extInput').value;
    const ekstensiVideo = extRaw.split(',').map(e => e.trim().toLowerCase());

    async function scan(handle, path = "") {
        for await (const entry of handle.values()) {
            const currentPath = path + "/" + entry.name;
            if (entry.kind === 'file') {
                const isVideo = ekstensiVideo.some(ext => entry.name.toLowerCase().endsWith(ext));
                if (isVideo) {
                    hasilPencarian.push({
                        name: entry.name,
                        handle: entry,
                        parentHandle: handle,
                        path: currentPath
                    });
                }
            } else if (entry.kind === 'directory') {
                await scan(entry, currentPath);
            }
        }
    }
    await scan(directoryHandle);
    return hasilPencarian;
}

document.getElementById('btnStartScan').addEventListener('click', async () => {
    if (!scanDirectoryHandle) return alert("Buka Pengaturan dan pilih folder scanning lagi!");
    videoTasks = await cariSemuaVideo(scanDirectoryHandle);
    renderScanResults();
});

function renderScanResults() {
    const tbody = document.getElementById('scanTableBody');
    tbody.innerHTML = "";
    
    // Tampilkan tugas yang baru di-scan (Pending)
    videoTasks.forEach((task, index) => {
        const isDone = processedData.some(p => p.name === task.name);
        if(!isDone) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${task.name}</td><td>-</td><td>-</td><td><button class="btn btn-primary" onclick="openProcessModal(${index})">Process</button></td>`;
            tbody.appendChild(tr);
        }
    });

    // Tampilkan data yang sudah dipindahkan (Tersimpan di DB)
    processedData.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${p.name}</td><td><a href="${p.url}" target="_blank">URL</a></td><td>${p.category}</td><td><b style="color:#28a745">MOVED</b></td>`;
        tbody.appendChild(tr);
    });
}

// --- MODAL PROCESS & MOVE LOGIC ---

function openProcessModal(index) {
    currentProcessingIndex = index;
    document.getElementById('modalTitle').innerText = `Process: ${videoTasks[index].name}`;
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('processModal').style.display = 'flex';
}

function closeModal() { document.getElementById('processModal').style.display = 'none'; }

function goToStep2() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    loadDynamicDropdowns();
}

function toggleCategoryMethod() {
    const isNew = document.getElementById('categoryMethod').value === 'new';
    document.getElementById('existingCategoryGroup').style.display = isNew ? 'none' : 'block';
    document.getElementById('newCategoryGroup').style.display = isNew ? 'block' : 'none';
}

async function loadDynamicDropdowns() {
    const container = document.getElementById('dynamicDropdowns');
    container.innerHTML = "";
    if (!storageDirectoryHandle) return;
    await createDropdown(storageDirectoryHandle, container);
}

async function createDropdown(handle, container) {
    const folders = [];
    for await (const entry of handle.values()) if (entry.kind === 'directory') folders.push(entry);
    if (folders.length === 0) return;
    const select = document.createElement('select');
    select.innerHTML = '<option value="">-- Pilih Folder --</option>';
    folders.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.name;
        opt.innerText = f.name;
        select.appendChild(opt);
    });
    select.addEventListener('change', async () => {
        while (select.nextElementSibling) select.nextElementSibling.remove();
        if (select.value) {
            const nextHandle = await handle.getDirectoryHandle(select.value);
            await createDropdown(nextHandle, container);
        }
    });
    container.appendChild(select);
}

document.getElementById('btnFinalSave').addEventListener('click', async () => {
    if (!storageDirectoryHandle) return alert("Pilih folder penyimpanan di Pengaturan!");
    
    const task = videoTasks[currentProcessingIndex];
    const urlValue = document.getElementById('urlInput').value;
    const method = document.getElementById('categoryMethod').value;
    const statusLabel = document.getElementById('moveStatus');
    let targetHandle = storageDirectoryHandle;
    let finalPath = "";

    try {
        statusLabel.innerText = "Memproses pemindahan file...";
        
        // 1. Tentukan Folder Tujuan
        if (method === 'new') {
            const parts = document.getElementById('newCategoryInput').value.split('/').filter(p => p.trim() !== "");
            for (const part of parts) targetHandle = await targetHandle.getDirectoryHandle(part, { create: true });
            finalPath = parts.join('/');
        } else {
            const selects = document.getElementById('dynamicDropdowns').querySelectorAll('select');
            const paths = [];
            for (const s of selects) if (s.value) {
                targetHandle = await targetHandle.getDirectoryHandle(s.value);
                paths.push(s.value);
            }
            finalPath = paths.join('/');
        }

        // 2. Move File (Copy then Delete)
        const fileData = await task.handle.getFile();
        const newFileHandle = await targetHandle.getFileHandle(task.name, { create: true });
        const writable = await newFileHandle.createWritable();
        await writable.write(fileData);
        await writable.close();

        await task.parentHandle.removeEntry(task.name);

        // 3. Simpan ke IndexedDB
        const tx = db.transaction("processedVideos", "readwrite");
        const store = tx.objectStore("processedVideos");
        const entry = {
            name: task.name,
            url: urlValue,
            category: finalPath,
            timestamp: new Date().toISOString()
        };
        
        const request = store.add(entry);
        request.onsuccess = () => {
            alert("Berhasil dipindahkan & disimpan ke database!");
            loadProcessedDataFromDB(); // Muat ulang tabel
            closeModal();
        };
    } catch (err) {
        alert("Gagal: " + err.message);
        statusLabel.innerText = "";
    }
});

// --- TREE VIEW & EXPORT ---

window.renderTree = async function() {
    const container = document.getElementById('treeContainer');
    container.innerHTML = "Memuat...";
    if (!storageDirectoryHandle) return container.innerHTML = "Pilih folder penyimpanan di pengaturan.";
    async function build(handle, el) {
        for await (const entry of handle.values()) {
            const d = document.createElement('div');
            d.className = "tree-item";
            d.innerText = `${entry.kind === 'directory' ? '📁' : '📄'} ${entry.name}`;
            el.appendChild(d);
            if (entry.kind === 'directory') await build(entry, d);
        }
    }
    container.innerHTML = `<strong>Root: ${storageDirectoryHandle.name}</strong>`;
    await build(storageDirectoryHandle, container);
};

document.getElementById('btnExport').addEventListener('click', () => {
    if (processedData.length === 0) return alert("Tidak ada data untuk diekspor.");
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(processedData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "video_manager_data.json");
    dl.click();
});