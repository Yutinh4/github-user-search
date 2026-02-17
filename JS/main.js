const colorIconDiv = document.querySelector(".color-icon");
let icon = document.querySelector("header i");
let theamWord = document.querySelector(".color-icon span");
const locStor_Theam_StrongKey = "theam";
const repoArea = document.querySelector(".repos-area");

if (localStorage.getItem(locStor_Theam_StrongKey)) {
    let localTheam = JSON.parse(localStorage.getItem(locStor_Theam_StrongKey));
    document.body.classList.add(localTheam.theamColor);
    icon.classList.add(localTheam.theamIcon);
    theamWord.textContent = localTheam.wordOfTheam;
}


function changeColorTheam() {
    let isDark = document.body.classList.contains("dark");
    document.body.classList.toggle("light", isDark);
    document.body.classList.toggle("dark", !isDark);
    icon.classList.toggle("fa-moon", isDark);
    icon.classList.toggle("fa-sun", !isDark);
    theamWord.textContent = isDark ? "dark" : "light";
    let iconClassName = icon.classList.contains("fa-sun") ? "fa-sun" : "fa-moon";
    let theamObj = {
        theamColor: document.body.classList.contains("dark") ? "dark" : "light"
        , theamIcon: iconClassName,
        wordOfTheam: theamWord.textContent
    };
    localStorage.setItem(locStor_Theam_StrongKey, JSON.stringify(theamObj));
}

colorIconDiv.addEventListener("click", changeColorTheam)

const submitBtn = document.querySelector("form input[type='submit']");
const userName = document.querySelector("form input[type='text']");
const form = document.querySelector("form");
const card = document.querySelector(".card");

function createLoadingPage() {
    const card = document.createElement("div");
    card.className = "loading-card";

    /* ===== profile ===== */
    const profile = document.createElement("div");
    profile.className = "profile";

    // loading animation
    const loading = document.createElement("div");
    loading.className = "loading";

    const dots = document.createElement("div");
    dots.className = "dots";

    for (let i = 0; i < 3; i++) {
        dots.appendChild(document.createElement("span"));
    }

    const loadingWord = document.createElement("div");
    loadingWord.className = "loading-word";
    loadingWord.textContent = "Loading...";

    loading.append(dots, loadingWord);

    // avatar
    const img = document.createElement("img");
    img.className = "hidden";

    // profile name
    const profileName = document.createElement("div");
    profileName.className = "profile-name";

    const h3 = document.createElement("h3");

    const p = document.createElement("p");
    const profileLink = document.createElement("a");
    profileLink.target = "_blank";
    p.appendChild(profileLink);

    const date = document.createElement("div");
    date.className = "date";

    profileName.append(h3, p, date);
    profile.append(loading, img, profileName);

    /* ===== description ===== */
    const desc = document.createElement("div");
    desc.className = "desc";

    /* ===== stats ===== */
    const profileInfo = document.createElement("div");
    profileInfo.className = "profile-info";

    function createStat(title) {
        const box = document.createElement("div");
        const label = document.createElement("span");
        const value = document.createElement("span");

        label.textContent = title;
        box.append(label, value);
        return box;
    }

    profileInfo.append(
        createStat("Repos"),
        createStat("Followers"),
        createStat("Following")
    );

    /* ===== more info ===== */
    const moreInfo = document.createElement("div");
    moreInfo.className = "more-info";

    const ul = document.createElement("ul");

    function createInfoItem(iconClass) {
        const li = document.createElement("li");
        const icon = document.createElement("i");
        icon.className = iconClass;

        const span = document.createElement("span");
        li.append(icon, span);
        return { li, span };
    }

    const location = createInfoItem("fa-solid fa-location-dot");
    const blog = createInfoItem("fa-solid fa-chain");
    const twitter = createInfoItem("fa-brands fa-twitter");
    const company = createInfoItem("fa-solid fa-building");

    ul.append(location.li, blog.li, twitter.li, company.li);
    moreInfo.appendChild(ul);

    card.append(profile, desc, profileInfo, moreInfo);

    /* ===== references (مهم جدًا) ===== */
    card._refs = {
        img,
        h3,
        profileLink,
        date,
        desc,
        stats: profileInfo.querySelectorAll("div span:nth-child(2)"),
        location: location.span,
        blog: blog.span,
        twitter: twitter.span,
        company: company.span,
        loading
    };

    repoArea.appendChild(card);
    return card;
}


function fillGitHubCard(card, data) {
    const r = card._refs;

    r.loading.remove();

    // avatar
    r.img.src = data.avatar_url;
    r.img.classList.remove("hidden");

    // name & profile
    r.h3.textContent = data.name || data.login;
    r.profileLink.href = data.html_url;
    r.profileLink.textContent = data.login;

    // date
    r.date.textContent = `Joined ${data.created_at.slice(0, 10)}`;

    // bio
    r.desc.textContent = data.bio || "";

    // stats
    r.stats[0].textContent = data.public_repos;
    r.stats[1].textContent = data.followers;
    r.stats[2].textContent = data.following;

    // more info
    r.location.textContent = data.location || "Not Available";

    if (data.blog) {
        const a = document.createElement("a");
        a.href = data.blog;
        a.target = "_blank";
        a.textContent = data.blog;
        r.blog.appendChild(a);
    } else {
        r.blog.textContent = "Not Available"
    }

    if (data.twitter_username) {
        const a = document.createElement("a");
        a.href = `https://twitter.com/${data.twitter_username}`;
        a.target = "_blank";
        a.textContent = data.twitter_username;
        r.twitter.appendChild(a);
    } else {
        r.twitter.textContent = "Not Available"
    }

    r.company.textContent = data.company || "—";
}

function showSweetAlert() {
    const sweetAlertDiv = document.createElement("div");
    sweetAlertDiv.className = "sweet-alert";

    const errorIcon = document.createElement("i");
    errorIcon.className = "fa-solid fa-circle-exclamation";
    const erorTitle = document.createElement("div");
    erorTitle.className = "error-title";
    erorTitle.textContent = "Input filed cannot be empty...";
    const okBtn = document.createElement("div");
    okBtn.className = "btn";
    okBtn.textContent = "ok";

    sweetAlertDiv.append(errorIcon, erorTitle, okBtn);

    repoArea.appendChild(sweetAlertDiv);
    if (okBtn) okBtn.addEventListener("click", hideSweetAlert);
}


function hideSweetAlert() {
    const sweetAlertDiv = document.querySelector(".sweet-alert");
    if (sweetAlertDiv) sweetAlertDiv.remove();
}

function hideWrongMsg() {
    const retry = document.querySelector(".retry");
    if (retry) {
        const wp = document.querySelector(".wrong-page");
        if (wp) wp.remove();
        userName.value = ""; // <-- تصحيح المتغير هنا
    }
}

// ==== إصلاحات وتحسينات ====

/* --- apiErrorMsg: صححت cityInput -> userName --- */
function apiErrorMsg(msg) {
    const existing = document.querySelector(".wrong-page");
    if (existing) existing.remove();

    const wrongContainer = document.createElement("div");
    wrongContainer.className = "wrong-page";

    const errorIcon = document.createElement("i");
    errorIcon.className = "fa-solid fa-ban";
    wrongContainer.appendChild(errorIcon);

    const h1 = document.createElement("h1");
    h1.textContent = msg;
    wrongContainer.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = "We couldn't connect to the server (API error). please try again in few moments.";
    wrongContainer.appendChild(p);

    const retryDiv = document.createElement("div");
    retryDiv.className = "retry";
    const retryIcon = document.createElement("i");
    retryIcon.className = "fa-solid fa-arrows-rotate";
    retryDiv.appendChild(retryIcon);
    const retryWord = document.createElement("div");
    retryWord.textContent = "Retry";
    retryDiv.appendChild(retryWord);
    wrongContainer.appendChild(retryDiv);
    repoArea.appendChild(wrongContainer);

    retryDiv.addEventListener("click", () => {
        wrongContainer.remove();
        userName.value = "";
    });

}

function removeLoading() {
    const loadingPage = document.querySelector(".loading-card");
    if (loadingPage) loadingPage.remove();
}


/* --- getRepo: يستخدم createLoadingPage ثم يملأ الكارد أو يعرض الخطأ --- */
async function getRepo(username) {
    // تنظيف بطاقات سابقة
    const prev = repoArea.querySelectorAll(".loading-card, .card, .sweet-alert");
    prev.forEach(n => n.remove());

    // create & append loading
    const card = createLoadingPage(); // هذه تضيف البطاقة للـ repoArea داخلياً
    // disable submit to avoid double requests
    if (submitBtn) submitBtn.disabled = true;

    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
        if (!response.ok) {
            if (response.status === 404) {
                removeLoading();
                // user not found
                apiErrorMsg("User not found");
                removeLoading();
                apiErrorMsg(`Server error (${response.status})`);
            }
            return;
        }
        const data = await response.json();
        fillGitHubCard(card, data);
        // Optional: mark card as final (add class)
        card.classList.remove("loading-card");
        card.classList.add("card");
    } catch (error) {
        console.error(error);
        removeLoading();
        apiErrorMsg("Network error or blocked request.");
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
}

/* --- check: الآن ينادي getRepo بدل createLoadingPage فقط --- */
function check() {
    const value = userName.value.trim();
    if (!value) {
        showSweetAlert();
    } else {
        hideWrongMsg();
        hideSweetAlert();
        // نعرّض العملية للـ API
        getRepo(value);
    }
}

/* --- submit handler يبقى كما هو لكن الآن يعمل --- */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    check();
});

