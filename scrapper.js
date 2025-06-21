(async () => {
  if (typeof XLSX === 'undefined') {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    document.body.appendChild(s);
    await new Promise(r => s.onload = r);
  }

  function scrapeHeader() {
    return [...document.querySelectorAll('.ssc-table-header-title')]
      .map(el => el.textContent.trim());
  }

  function scrapePage() {
    return [...document.querySelectorAll('.ssc-table-body .ssc-table-row')].map(row =>
      [...row.querySelectorAll('.td-content, .sensitive-wrap-content')]
        .map(cell => cell.innerText.trim().replace(/\n/g, ' '))
    );
  }

  function isNextDisabled() {
    const btn = document.querySelector('.pager-next.pager-step');
    return btn?.classList.contains('pager-step-disabled');
  }

  function clickNext() {
    const btn = document.querySelector('.pager-next.pager-step');
    if (!btn || btn.classList.contains('pager-step-disabled')) return false;
    btn.click();
    return true;
  }

  async function waitForTableChange(prevFirstRowText) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        const firstRow = document.querySelector('.ssc-table-body .ssc-table-row');
        const newText = firstRow?.innerText.trim();
        if (newText && newText !== prevFirstRowText) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  }

  const allData = [];
  allData.push(scrapeHeader());

  let page = 1;
  while (true) {
    console.log(`📄 Mengambil data halaman ${page++}`);
    const currentData = scrapePage();
    allData.push(...currentData);

    if (isNextDisabled()) break; // <-- setelah scraping baru cek disable

    const firstRow = document.querySelector('.ssc-table-body .ssc-table-row');
    const prevText = firstRow?.innerText.trim() ?? "";

    clickNext();
    await waitForTableChange(prevText);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(allData);
  XLSX.utils.book_append_sheet(wb, ws, 'SPX');
  XLSX.writeFile(wb, 'data_spx_full.xlsx');

  console.log('✅ Semua data berhasil di-export!');
})();
