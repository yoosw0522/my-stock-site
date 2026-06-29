/* =========================================================
   StockHub - script.js
   웹프로그래밍기초 기말 과제
   * 수업(9~12장)에서 배운 문법/메서드만 사용 *
     - 객체/배열/반복문/함수/콜백 (9장)
     - DOM, setInterval, new Date, 이벤트 (10장)
     - jQuery: ready, css/attr/text/html, addClass/removeClass,
       on/click, val, preventDefault/return false, animate, append (11~12장)
   ========================================================= */

$(document).ready(function () {

  /* =====================================================
     0. 종목 데이터 (배열 + 객체 - 9장) / market: 국내·해외
     ===================================================== */
  let stocks = [
    { id: "samsung",  name: "삼성전자",     ticker: "005930", price: "339,000원",   change: "2.34%", up: true,  market: "국내", tags: ["반도체", "대형주"], sector: "반도체 / 전자",   country: "한국 (KOSPI)", logo: "images/logos/samsung.png" },
    { id: "sk",       name: "SK하이닉스",   ticker: "000660", price: "2,700,000원", change: "3.10%", up: true,  market: "국내", tags: ["반도체", "메모리"], sector: "반도체 / 메모리", country: "한국 (KOSPI)", logo: "images/logos/skhynix.png" },
    { id: "sem",      name: "삼성전기",     ticker: "009150", price: "1,996,000원", change: "1.20%", up: false, market: "국내", tags: ["전자부품", "MLCC"], sector: "전자부품 / MLCC", country: "한국 (KOSPI)", logo: "images/logos/samsung.png" },
    { id: "hanmi",    name: "한미반도체",   ticker: "042700", price: "260,500원",   change: "5.42%", up: true,  market: "국내", tags: ["반도체", "장비"],   sector: "반도체 / 장비",   country: "한국 (KOSPI)", logo: "images/logos/hanmi.png" },
    { id: "hyundai",  name: "현대차",       ticker: "005380", price: "481,500원",   change: "0.85%", up: true,  market: "국내", tags: ["자동차", "완성차"], sector: "자동차 / 완성차", country: "한국 (KOSPI)", logo: "images/logos/hyundai.png" },
    { id: "skhold",   name: "SK",           ticker: "034730", price: "816,000원",   change: "0.60%", up: false, market: "국내", tags: ["지주회사", "대형주"], sector: "지주회사",      country: "한국 (KOSPI)", logo: "images/logos/skhold.png" },
    { id: "lg",       name: "LG전자",       ticker: "066570", price: "196,200원",   change: "1.95%", up: true,  market: "국내", tags: ["가전", "전자"],     sector: "가전 / 전자",     country: "한국 (KOSPI)", logo: "images/logos/lg.png" },
    { id: "cheil",    name: "삼성물산",     ticker: "028260", price: "500,000원",   change: "0.40%", up: true,  market: "국내", tags: ["상사", "건설"],     sector: "상사 / 건설",     country: "한국 (KOSPI)", logo: "images/logos/samsung.png" },
    { id: "naver",    name: "NAVER",        ticker: "035420", price: "196,400원",   change: "0.75%", up: false, market: "국내", tags: ["인터넷", "IT"],     sector: "인터넷 / IT",     country: "한국 (KOSPI)", logo: "images/logos/naver.png" },
    { id: "hyosung",  name: "효성중공업",   ticker: "298040", price: "3,119,000원", change: "4.20%", up: true,  market: "국내", tags: ["중공업", "전력"],   sector: "중공업 / 전력",   country: "한국 (KOSPI)", logo: "images/logos/hyosung.png" },
    { id: "tesla",    name: "테슬라",       ticker: "TSLA",   price: "$379.71",     change: "2.10%", up: true,  market: "해외", tags: ["전기차", "해외"],   sector: "전기차 / 자동차", country: "미국 (NASDAQ)", logo: "images/logos/tesla.png" },
    { id: "apple",    name: "애플",         ticker: "AAPL",   price: "$283.78",     change: "0.68%", up: true,  market: "해외", tags: ["기술", "해외"],     sector: "기술 / IT",       country: "미국 (NASDAQ)", logo: "images/logos/apple.png" },
    { id: "micron",   name: "마이크론",     ticker: "MU",     price: "$1,132.33",   change: "6.30%", up: true,  market: "해외", tags: ["반도체", "해외"],   sector: "반도체 / 메모리", country: "미국 (NASDAQ)", logo: "images/logos/micron.png" },
    { id: "nvidia",   name: "엔비디아",     ticker: "NVDA",   price: "$192.53",     change: "1.10%", up: false, market: "해외", tags: ["반도체", "해외"],   sector: "반도체 / GPU",    country: "미국 (NASDAQ)", logo: "images/logos/nvidia.png" },
    { id: "spacex",   name: "스페이스엑스", ticker: "SpaceX", price: "$153.23",     change: "3.50%", up: true,  market: "해외", tags: ["우주", "해외"],     sector: "우주 / 항공",     country: "미국 (비상장)", logo: "images/logos/spacex.png" }
  ];

  /* 뉴스 데이터 (옛날 뉴스 + 신규 뉴스, 날짜순으로 섞음) */
  let news = [
    { id: "n1", cat: "🔥 HOT", hot: true,  date: "2026.06.29", title: "코스피 8,411선 돌파… 외국인·기관 동반 매수",
      summary: "코스피가 152.34p(+1.85%) 상승하며 8,411.21로 마감했습니다. 외국인과 기관의 동반 매수세가 지수 상승을 이끌었습니다.",
      detail: "2026년 6월 29일, 코스피가 152.34포인트(+1.85%) 상승하며 8,411.21로 마감했습니다. 외국인과 기관이 동반 순매수에 나서며 지수 상승을 이끌었고, 코스닥도 1% 이상 오르며 동반 강세를 보였습니다." },
    { id: "n2", cat: "반도체", hot: false, date: "2026.06.28", title: "반도체주 강세… 한미반도체·마이크론 급등",
      summary: "한미반도체(+5.42%)와 마이크론(+6.30%)이 급등하며 반도체 업종 강세를 주도했습니다.",
      detail: "AI 메모리 수요 회복 기대 속에 한미반도체가 5.42%, 마이크론이 6.30% 급등하며 반도체 업종 강세를 주도했습니다. 관련 장비주에도 매수세가 이어졌습니다." },
    { id: "n3", cat: "글로벌", hot: false, date: "2026.06.27", title: "테슬라·애플 동반 상승, 빅테크 강세",
      summary: "테슬라가 $379.71로 2.10% 상승했고, 애플도 $283.78로 0.68% 오르며 빅테크가 강세를 보였습니다.",
      detail: "미국 빅테크가 동반 강세를 보였습니다. 테슬라는 $379.71로 2.10%, 애플은 $283.78로 0.68% 상승했고, 나스닥도 0.75% 오르며 위험자산 선호 심리가 살아났습니다." },
    { id: "n4", cat: "코스피", hot: false, date: "2026.05.16", title: "[지난뉴스] 코스피 7,493선 폭락… 외국인 대규모 매도",
      summary: "코스피가 488.23p(-6.12%) 급락하며 7,493.18로 마감했습니다. 외국인의 대규모 매도가 하락을 주도했습니다.",
      detail: "2026년 5월 16일, 코스피가 488.23포인트(-6.12%) 급락하며 7,493.18로 마감했습니다. 외국인 투자자의 대규모 매도세가 하락을 주도했으며, 코스닥도 5% 이상 급락했습니다." },
    { id: "n5", cat: "반도체", hot: false, date: "2026.05.16", title: "[지난뉴스] 삼성전자·SK하이닉스 동반 급락",
      summary: "삼성전자(-8.61%)와 SK하이닉스(-7.66%)가 동반 급락하며 코스피 하락을 주도했습니다.",
      detail: "반도체 업황 우려가 부각되며 삼성전자가 8.61%, SK하이닉스가 7.66% 하락해 코스피 낙폭을 키웠습니다." },
    { id: "n6", cat: "글로벌", hot: false, date: "2026.05.15", title: "[지난뉴스] 테슬라 4.75% 하락, 애플은 소폭 상승",
      summary: "테슬라가 4.75% 하락한 반면 애플은 0.68% 상승하며 차별화된 흐름을 보였습니다.",
      detail: "같은 빅테크지만 흐름이 갈렸습니다. 테슬라가 4.75% 하락한 반면, 애플은 0.68% 상승하며 상대적으로 견조한 모습을 보였습니다." }
  ];


  /* =====================================================
     0-1. 숫자 포맷 함수 (배운 것만: for/if/Math/문자열)
     ===================================================== */
  function addComma(numStr) {
    let result = "";
    let count = 0;
    for (let i = numStr.length - 1; i >= 0; i--) {
      result = numStr.charAt(i) + result;
      count = count + 1;
      if (count % 3 === 0 && i !== 0) { result = "," + result; }
    }
    return result;
  }
  function formatPrice(value, decimals) {
    let factor = 1;
    for (let i = 0; i < decimals; i++) { factor = factor * 10; }
    let rounded = Math.round(value * factor) / factor;
    let intPart = Math.floor(rounded);
    let text = addComma("" + intPart);
    if (decimals > 0) {
      let deci = Math.round((rounded - intPart) * factor);
      let deciStr = "" + deci;
      while (deciStr.length < decimals) { deciStr = "0" + deciStr; }
      text = text + "." + deciStr;
    }
    return text;
  }


  /* =====================================================
     1. 종목 카드 + 상세 모달을 배열로 생성 (12장: 문서 객체 생성/추가)
     ===================================================== */
  function buildCard(s, rank) {
    let tagClass = s.up ? "up-tag" : "down-tag";
    let arrow = s.up ? "▲" : "▼";
    return '<div class="portfolio-card js-open-modal" data-modal="#stock-' + s.id + '" data-market="' + s.market + '">' +
      '<div class="card-image has-logo">' +
        '<img class="logo-img" src="' + s.logo + '" alt="' + s.name + ' 로고">' +
        '<span class="rank-badge">#' + rank + '</span>' +
        '<button class="like-btn">♡</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-info"><h3>' + s.name + '</h3><span class="ticker">' + s.ticker + '</span></div>' +
        '<div class="price-info"><p class="big-price">' + s.price + '</p>' +
          '<span class="' + tagClass + '">' + arrow + ' ' + s.change + '</span></div>' +
        '<div class="card-tags"><span class="tag">' + s.tags[0] + '</span><span class="tag">' + s.tags[1] + '</span></div>' +
      '</div>' +
      '<div class="card-hint">👆 클릭하여 상세보기</div>' +
    '</div>';
  }
  function buildModal(s) {
    let tagClass = s.up ? "up-tag" : "down-tag";
    let arrow = s.up ? "▲" : "▼";
    return '<div id="stock-' + s.id + '" class="modal">' +
      '<div class="modal-overlay"></div>' +
      '<div class="modal-content">' +
        '<div class="modal-close">✕</div>' +
        '<img class="modal-logo" src="' + s.logo + '" alt="' + s.name + '">' +
        '<h2>' + s.name + ' (' + s.ticker + ')</h2>' +
        '<p class="modal-price">' + s.price + ' <span class="' + tagClass + '">' + arrow + ' ' + s.change + '</span></p>' +
        '<div class="modal-info">' +
          '<div><strong>업종</strong> ' + s.sector + '</div>' +
          '<div><strong>국가</strong> ' + s.country + '</div>' +
          '<div><strong>구분</strong> ' + s.market + ' 주식</div>' +
        '</div>' +
        '<div class="modal-btn close-modal">목록으로 돌아가기</div>' +
      '</div>' +
    '</div>';
  }

  let cardHtml = "";
  let stockModalHtml = "";
  for (let i = 0; i < stocks.length; i++) {
    cardHtml = cardHtml + buildCard(stocks[i], i + 1);
    stockModalHtml = stockModalHtml + buildModal(stocks[i]);
  }
  $("#portfolioGrid").html(cardHtml);
  $("#modalArea").html(stockModalHtml);


  /* =====================================================
     1-2. 뉴스 목록 + 뉴스 모달 생성 (배열 + append)
     ===================================================== */
  function buildNewsItem(n) {
    let hotClass = n.hot ? " hot" : "";
    return '<a href="#' + n.id + '" class="news-item js-open-modal" data-modal="#' + n.id + '">' +
      '<span class="news-category' + hotClass + '">' + n.cat + '</span>' +
      '<h3>' + n.title + '</h3>' +
      '<p>' + n.summary + '</p>' +
      '<span class="date">📅 ' + n.date + '</span>' +
    '</a>';
  }
  function buildNewsModal(n) {
    let hotClass = n.hot ? " hot" : "";
    return '<div id="' + n.id + '" class="modal">' +
      '<div class="modal-overlay"></div>' +
      '<div class="modal-content">' +
        '<div class="modal-close">✕</div>' +
        '<span class="news-category' + hotClass + '">' + n.cat + '</span>' +
        '<h2>' + n.title + '</h2>' +
        '<p style="text-align:left;line-height:1.8;">' + n.detail + '</p>' +
        '<p class="date" style="text-align:left;color:#8b95a1;margin-top:8px;">📅 ' + n.date + '</p>' +
        '<div class="modal-btn close-modal">목록으로</div>' +
      '</div>' +
    '</div>';
  }

  let newsHtml = "";
  let newsModalHtml = "";
  for (let i = 0; i < news.length; i++) {
    newsHtml = newsHtml + buildNewsItem(news[i]);
    newsModalHtml = newsModalHtml + buildNewsModal(news[i]);
  }
  $("#newsList").html(newsHtml);
  $("#modalArea").append(newsModalHtml);


  /* =====================================================
     1-3. 오늘의 추천 종목 슬라이더
        - 실습 0609(슬라이드쇼: setInterval 로 자동 전환)
        - 12장·실습 0623(슬라이더: ← → 버튼, 인덱스 이동)
        - 실습 0616(.hover: 마우스 올리면 멈춤)
     ===================================================== */
  let featIndex = 0;
  let featTimer = null;

  // 아래 점(dot) 생성
  let dotsHtml = "";
  for (let i = 0; i < stocks.length; i++) { dotsHtml = dotsHtml + '<span class="dot" data-i="' + i + '"></span>'; }
  $("#featDots").html(dotsHtml);

  function showFeatured(i) {
    let s = stocks[i];
    let tagClass = s.up ? "up-tag" : "down-tag";
    let arrow = s.up ? "▲" : "▼";
    let html = '<img class="featured-logo" src="' + s.logo + '" alt="' + s.name + '">' +
      '<div class="featured-info">' +
        '<span class="featured-rank">⭐ 오늘의 추천 #' + (i + 1) + '</span>' +
        '<h3>' + s.name + ' <span class="ticker">' + s.ticker + '</span></h3>' +
        '<p class="featured-price">' + s.price + ' <span class="' + tagClass + '">' + arrow + ' ' + s.change + '</span></p>' +
        '<span class="featured-market">' + s.market + ' 주식 · ' + s.sector + '</span>' +
      '</div>';
    $("#featuredSlide").html(html);
    $("#featDots .dot").removeClass("active");
    $($("#featDots .dot")[i]).addClass("active");
  }
  function nextFeatured() { featIndex = (featIndex + 1) % stocks.length; showFeatured(featIndex); }
  function prevFeatured() { featIndex = (featIndex - 1 + stocks.length) % stocks.length; showFeatured(featIndex); }
  function startFeat() { featTimer = setInterval(nextFeatured, 3000); }
  function stopFeat() { clearInterval(featTimer); }

  showFeatured(0);
  startFeat();
  $("#featNext").on("click", nextFeatured);
  $("#featPrev").on("click", prevFeatured);
  $("#featDots .dot").on("click", function () {
    featIndex = Number($(this).attr("data-i"));
    showFeatured(featIndex);
  });
  // 마우스를 올리면 자동 전환 멈춤, 벗어나면 다시 시작 (0616 .hover 실습)
  $("#featured").hover(stopFeat, startFeat);
  // 추천 슬라이드를 클릭하면 해당 종목 상세 모달
  $("#featuredSlide").on("click", function () { openModal("#stock-" + stocks[featIndex].id); });


  /* =====================================================
     2. 실시간 시계 (10장: setInterval + Date)
     ===================================================== */
  function two(n) { if (n < 10) { return "0" + n; } else { return "" + n; } }
  function updateClock() {
    let now = new Date();
    let text = now.getFullYear() + "." + two(now.getMonth() + 1) + "." + two(now.getDate()) +
               " " + two(now.getHours()) + ":" + two(now.getMinutes()) + ":" + two(now.getSeconds());
    $("#liveBadge").text("🔴 LIVE · " + text);
  }
  updateClock();
  setInterval(updateClock, 1000);


  /* =====================================================
     3. 다크모드 (11장: addClass/removeClass)
     ===================================================== */
  let darkMode = false;
  $("#themeToggle").on("click", function () {
    darkMode = !darkMode;
    if (darkMode) { $("body").addClass("dark-mode"); $(this).text("☀️"); }
    else { $("body").removeClass("dark-mode"); $(this).text("🌙"); }
  });


  /* =====================================================
     4. 통계 카운트업 (setInterval 로 직접 증가)
     ===================================================== */
  let statEls = $(".stat h3");
  for (let i = 0; i < statEls.length; i++) { countUp($(statEls[i])); }
  function countUp(el) {
    let target = Number(el.attr("data-count"));
    let suffix = el.attr("data-suffix");
    let current = 0;
    let step = target / 40;
    let timer = setInterval(function () {
      current = current + step;
      if (current >= target) { current = target; clearInterval(timer); }
      if (target % 1 === 0) { el.text(addComma("" + Math.floor(current)) + suffix); }
      else { el.text((Math.round(current * 10) / 10) + suffix); }
    }, 30);
  }


  /* =====================================================
     5. 실시간 시세 변동 (setInterval + Math.random)
     ===================================================== */
  let priceEls = $(".js-price");
  for (let i = 0; i < priceEls.length; i++) {
    let el = $(priceEls[i]);
    let raw = el.text().replace(/[^0-9.]/g, ""); // 숫자/점만 남김 (11장 정규식)
    el.attr("data-base", raw);
  }
  setInterval(function () {
    for (let i = 0; i < priceEls.length; i++) {
      let el = $(priceEls[i]);
      let base = Number(el.attr("data-base"));
      let rate = (Math.random() * 2.4 - 1.2) / 100;
      let next = base * (1 + rate);
      el.attr("data-base", next);

      let prefix = el.attr("data-prefix"); if (!prefix) { prefix = ""; }
      let suffix = el.attr("data-suffix"); if (!suffix) { suffix = ""; }
      let decimals = Number(el.attr("data-decimals")); if (!decimals) { decimals = 0; }

      el.text(prefix + formatPrice(next, decimals) + suffix);
      if (next >= base) { el.removeClass("flash-down"); el.addClass("flash-up"); }
      else { el.removeClass("flash-up"); el.addClass("flash-down"); }
    }
  }, 2500);


  /* =====================================================
     6. 종목 검색 + 국내/해외 필터 (11장: on/val/text/css)
     ===================================================== */
  let currentMarket = "전체";
  function applyFilter() {
    let keyword = $("#stockSearch").val().toLowerCase();
    let cards = $(".portfolio-card");
    let visible = 0;
    for (let i = 0; i < cards.length; i++) {
      let card = $(cards[i]);
      let name = card.find("h3").text().toLowerCase();
      let ticker = card.find(".ticker").text().toLowerCase();
      let tags = card.find(".card-tags").text().toLowerCase();
      let market = card.attr("data-market");

      let okSearch = (name.indexOf(keyword) > -1 || ticker.indexOf(keyword) > -1 || tags.indexOf(keyword) > -1);
      let liked = (card.find(".like-btn").text() === "♥");
      let okMarket;
      if (currentMarket === "전체") { okMarket = true; }
      else if (currentMarket === "관심") { okMarket = liked; }
      else { okMarket = (market === currentMarket); }

      if (okSearch && okMarket) { card.css("display", ""); visible = visible + 1; }
      else { card.css("display", "none"); }
    }
    if (visible === 0) { $("#noResult").css("display", "block"); }
    else { $("#noResult").css("display", "none"); }
  }
  $("#stockSearch").on("keyup", applyFilter);
  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    currentMarket = $(this).attr("data-filter");
    applyFilter();
  });


  /* =====================================================
     6-2. 관심종목 개수 표시 (for 반복문 + text)
     ===================================================== */
  function updateLikeCount() {
    let count = 0;
    let hearts = $(".like-btn");
    for (let i = 0; i < hearts.length; i++) {
      if ($(hearts[i]).text() === "♥") { count = count + 1; }
    }
    $("#likeCount").text("♥ " + count);
  }
  updateLikeCount();

  /* =====================================================
     6-3. 카드 마우스 오버 효과 (.hover - 실습 0616/0609)
     ===================================================== */
  $(".portfolio-card").hover(
    function () { $(this).addClass("hovering"); },
    function () { $(this).removeClass("hovering"); }
  );

  /* =====================================================
     6-4. 실시간 인기 검색어 (setInterval + text - 실습 0602/0609)
     ===================================================== */
  let hotIndex = 0;
  function rotateHot() {
    let s = stocks[hotIndex];
    let arrow = s.up ? "▲" : "▼";
    let tagClass = s.up ? "up-tag" : "down-tag";
    $("#hotKeyword").html('🔥 실시간 인기 검색어: <strong>' + s.name + '</strong> ' +
      '<span class="' + tagClass + '">' + arrow + ' ' + s.change + '</span>');
    hotIndex = (hotIndex + 1) % stocks.length;
  }
  rotateHot();
  setInterval(rotateHot, 2000);


  /* =====================================================
     7. 관심종목 ♥ 토글 (addClass + return false)
     ===================================================== */
  $(".like-btn").on("click", function () {
    if ($(this).text() === "♡") { $(this).text("♥"); $(this).addClass("liked"); }
    else { $(this).text("♡"); $(this).removeClass("liked"); }
    updateLikeCount();   // 관심종목 개수 갱신
    applyFilter();       // '관심' 필터가 켜져 있으면 즉시 반영
    return false;        // 카드 클릭(모달)으로 전달되지 않게 (11장)
  });


  /* =====================================================
     8. 모달 열기/닫기 (addClass/removeClass + keyCode)
     ===================================================== */
  function openModal(id) {
    $(".modal").removeClass("is-open");
    $(id).addClass("is-open");
    $("body").css("overflow", "hidden");
  }
  function closeModal() {
    $(".modal").removeClass("is-open");
    $("body").css("overflow", "");
  }
  $(".js-open-modal").on("click", function (event) {
    event.preventDefault();
    openModal($(this).attr("data-modal"));
  });
  $(".modal-overlay, .modal-close, .close-modal").on("click", function () {
    closeModal();
  });
  $(document).on("keydown", function (event) {
    if (event.keyCode === 27) { closeModal(); } // ESC (12장 keyCode)
  });


  /* =====================================================
     9. 회원가입 (9장 객체 + 11장 유효성검사/val)
     ===================================================== */
  let users = {};
  let currentUser = null;

  $("#signupSubmit").on("click", function (event) {
    event.preventDefault();
    let id = $("#signupId").val();
    let pw = $("#signupPw").val();
    let pw2 = $("#signupPw2").val();

    if (id.length < 3) { showMsg("#signupMsg", "아이디는 3자 이상 입력해주세요.", false); return; }
    if (users[id]) { showMsg("#signupMsg", "이미 사용 중인 아이디입니다.", false); return; }
    if (pw.length < 4) { showMsg("#signupMsg", "비밀번호는 4자 이상 입력해주세요.", false); return; }
    if (pw !== pw2) { showMsg("#signupMsg", "비밀번호가 일치하지 않습니다.", false); return; }

    users[id] = pw;
    showMsg("#signupMsg", "가입 완료! 로그인 해주세요 🎉", true);
    setTimeout(function () {
      $("#signupId").val(""); $("#signupPw").val(""); $("#signupPw2").val("");
      $("#signupMsg").css("display", "none");
      openModal("#login");
      $("#loginId").val(id);
    }, 1100);
  });


  /* =====================================================
     10. 로그인 + 로그인 상태 표시 (users 객체와 대조)
     ===================================================== */
  $("#loginSubmit").on("click", function (event) {
    event.preventDefault();
    let id = $("#loginId").val();
    let pw = $("#loginPw").val();

    if (id === "") { showMsg("#loginMsg", "아이디를 입력해주세요.", false); return; }
    if (pw === "") { showMsg("#loginMsg", "비밀번호를 입력해주세요.", false); return; }
    if (!users[id]) { showMsg("#loginMsg", "가입되지 않은 아이디입니다. 회원가입을 먼저 해주세요.", false); return; }
    if (users[id] !== pw) { showMsg("#loginMsg", "비밀번호가 일치하지 않습니다.", false); return; }

    showMsg("#loginMsg", id + "님 환영합니다! 로그인 성공 ✅", true);
    setTimeout(function () {
      setLogin(id);
      closeModal();
      $("#loginId").val(""); $("#loginPw").val("");
      $("#loginMsg").css("display", "none");
    }, 1000);
  });

  $("#logoutBtn").on("click", function () { setLogout(); });

  function setLogin(id) {
    currentUser = id;
    $("#userName").text(id + "님");
    $("#loginBtn").css("display", "none");
    $("#userBox").css("display", "flex");
  }
  function setLogout() {
    currentUser = null;
    $("#userBox").css("display", "none");
    $("#loginBtn").css("display", "inline-block");
  }
  function showMsg(target, text, ok) {
    let color = ok ? "#1aae6f" : "#f04452";
    $(target).text(text);
    $(target).css("color", color);
    $(target).css("display", "block");
  }

  /* =====================================================
     10-2. Enter 키 입력 + 포커스 이동 (실습 12장: keyCode / focus)
        - Enter(keyCode 13) 누르면 다음 칸으로 포커스, 마지막이면 제출
     ===================================================== */
  $("#loginId").on("keydown", function (event) { if (event.keyCode === 13) { $("#loginPw").focus(); } });
  $("#loginPw").on("keydown", function (event) { if (event.keyCode === 13) { $("#loginSubmit").click(); } });
  $("#signupId").on("keydown", function (event) { if (event.keyCode === 13) { $("#signupPw").focus(); } });
  $("#signupPw").on("keydown", function (event) { if (event.keyCode === 13) { $("#signupPw2").focus(); } });
  $("#signupPw2").on("keydown", function (event) { if (event.keyCode === 13) { $("#signupSubmit").click(); } });


  /* =====================================================
     11. 스크롤 등장 + 헤더 그림자 + 메뉴 강조 (12장 scroll/scrollTop)
     ===================================================== */
  function revealOnScroll() {
    let winBottom = $(window).scrollTop() + $(window).height();
    let items = $(".reveal");
    for (let i = 0; i < items.length; i++) {
      let item = $(items[i]);
      if (winBottom > item.offset().top + 60) { item.addClass("active"); }
    }
  }
  revealOnScroll();

  let sectionEls = $("section[id]");
  $(window).on("scroll", function () {
    revealOnScroll();

    let scroll = $(window).scrollTop();
    if (scroll > 10) { $("header").addClass("scrolled"); }
    else { $("header").removeClass("scrolled"); }

    let current = "";
    for (let i = 0; i < sectionEls.length; i++) {
      let sec = $(sectionEls[i]);
      if (scroll >= sec.offset().top - 120) { current = sec.attr("id"); }
    }
    $(".menu a").removeClass("active");
    if (current !== "") { $('.menu a[href="#' + current + '"]').addClass("active"); }

    if (scroll > 400) { $("#topBtn").css("display", "block"); }
    else { $("#topBtn").css("display", "none"); }
  });


  /* =====================================================
     12. 맨 위로 가기 + 부드러운 스크롤 (11장 animate)
     ===================================================== */
  $("#topBtn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  let sectionIds = ["#home", "#market", "#portfolio", "#news", "#contact"];
  $(".menu a, .logo, .hero-buttons a, .footer-col a").on("click", function (event) {
    let href = $(this).attr("href");
    if (sectionIds.indexOf(href) > -1) {
      let target = $(href);
      if (target.length > 0) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: target.offset().top - 70 }, 500);
      }
    }
  });

});
