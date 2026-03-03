const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.getElementById('global-nav');

if (navToggle && globalNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    //“現在メニューが開かれているかどうか” を true / false の形で取得
    //getAttribute は HTMLタグの「属性（attribute）」の値を読み取るためのメソッド

    //aria-expandedを、true/falseで切り替え
    navToggle.setAttribute('aria-expanded', String(!expanded));
    //expanded を反転させてaria-expanded の値としてセットする

    //メニューの開閉(クラスの付け外し)
    globalNav.classList.toggle('is-open');

    //ボタン自体にも状態クラスをつける
    navToggle.classList.toggle('is-open');
  });
}

//アコーディオンメニュー
const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {

      header.classList.toggle("active");

      const content = header.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }

  });
});

//ナビゲーションスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const section = document.querySelector(targetId);
    if (!section) return;

    e.preventDefault();

    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;

    const title = section.querySelector(".section-title");

    let targetPosition;

    if (title) {

      const titleRect = title.getBoundingClientRect();
      const scrollTop = window.pageYOffset;

      const paddingTop = parseFloat(getComputedStyle(title).paddingTop);

      targetPosition = scrollTop + titleRect.top - headerHeight + paddingTop;

    } else {

      targetPosition = section.offsetTop - headerHeight;

    }

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });
});

// メニューリンクを押したらドロワーを閉じる
document.querySelectorAll('.global-nav a').forEach(link => {
  link.addEventListener('click', () => {

    globalNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');

  });
});