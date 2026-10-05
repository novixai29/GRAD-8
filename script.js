/* =========================================================
   GRAD-008 — FINAL EXAMINATION

   غيّر بيانات الزبون من هذا القسم فقط
========================================================= */

const GRADUATION = {

  /* =========================
     بيانات الخريج
  ========================= */

  graduateName:
    "مريم حسن",

  degree:
    "بكالوريوس علوم الحاسوب",

  faculty:
    "كلية علوم الحاسوب والرياضيات",

  department:
    "علوم الحاسوب",

  university:
    "جامعة الموصل",

  classYear:
    "دفعة ٢٠٢٧",


  /* =========================
     الامتحان
  ========================= */

  examId:
    "EX-2027-008",

  questions: [

    {
      text:
        "هل اكتملت سنوات الدراسة؟",

      correct:
        "yes"
    },

    {
      text:
        "هل تم استكمال جميع المتطلبات الأكاديمية؟",

      correct:
        "yes"
    },

    {
      text:
        "هل تم اجتياز الاختبارات النهائية؟",

      correct:
        "yes"
    }

  ],


  /* =========================
     الرسالة
  ========================= */

  tagline:
    "انتهى الامتحان الأخير وننتظركم لمشاركتنا فرحة التخرج",


  /* =========================
     التاريخ
  ========================= */

  startAt:
    "2027-07-15T18:00:00+03:00",

  endAt:
    "2027-07-15T21:00:00+03:00",

  timeZone:
    "Asia/Baghdad",


  /* =========================
     المكان
  ========================= */

  venue:
    "قاعة الاحتفال الكبرى",

  address:
    "الموصل، نينوى",

  city:
    "الموصل",

  country:
    "العراق",


  /* =========================
     الروابط
  ========================= */

  mapsUrl:
    "",

  shareUrl:
    ""

};


/* =========================================================
   ELEMENTS
========================================================= */

const questionsContainer =
  document.getElementById(
    "questions"
  );

const questionProgress =
  document.getElementById(
    "questionProgress"
  );

const examProgressBar =
  document.getElementById(
    "examProgressBar"
  );

const graduationAnswer =
  document.getElementById(
    "graduationAnswer"
  );

const submitButton =
  document.getElementById(
    "submitButton"
  );

const examMessage =
  document.getElementById(
    "examMessage"
  );

const examStatus =
  document.getElementById(
    "examStatus"
  );

const gradingSection =
  document.getElementById(
    "gradingSection"
  );

const gradingCircle =
  document.getElementById(
    "gradingCircle"
  );

const gradingPercent =
  document.getElementById(
    "gradingPercent"
  );

const gradingTitle =
  document.getElementById(
    "gradingTitle"
  );

const gradingText =
  document.getElementById(
    "gradingText"
  );

const resultSection =
  document.getElementById(
    "resultSection"
  );

const mapsButton =
  document.getElementById(
    "mapsButton"
  );

const shareButton =
  document.getElementById(
    "shareButton"
  );

const shareFeedback =
  document.getElementById(
    "shareFeedback"
  );

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   STATE
========================================================= */

const answers = {};

let finalAnswerSelected =
  false;

let submissionStarted =
  false;

let countdownTimer =
  null;


/* =========================================================
   GRADING CIRCLE
========================================================= */

const gradingRadius =
  48;

const gradingCircumference =
  2 *
  Math.PI *
  gradingRadius;


gradingCircle.style.strokeDasharray =
  `${gradingCircumference}`;


gradingCircle.style.strokeDashoffset =
  `${gradingCircumference}`;


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initialize
);


function initialize() {

  applyData();

  buildQuestions();

  setupFinalAnswer();

  setupSubmit();

  setupDate();

  setupMaps();

  setupShare();

  updateExamProgress();

  updateCountdown();


  countdownTimer =
    window.setInterval(
      updateCountdown,
      1000
    );

}


/* =========================================================
   DATA
========================================================= */

function applyData() {

  const fields = {

    graduateName:
      GRADUATION.graduateName,

    degree:
      GRADUATION.degree,

    faculty:
      GRADUATION.faculty,

    university:
      GRADUATION.university,

    classYear:
      GRADUATION.classYear,

    examId:
      GRADUATION.examId,

    venue:
      GRADUATION.venue,

    tagline:
      GRADUATION.tagline

  };


  Object.entries(fields)
    .forEach(
      ([field, value]) => {

        document
          .querySelectorAll(
            `[data-field="${field}"]`
          )
          .forEach(
            element => {

              element.textContent =
                value || "—";

            }
          );

      }
    );


  document.title =
    `${GRADUATION.graduateName} — الامتحان الأخير`;


  const ogTitle =
    document.querySelector(
      'meta[property="og:title"]'
    );


  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );


  if (ogTitle) {

    ogTitle.setAttribute(
      "content",
      `${GRADUATION.graduateName} — دعوة حفل التخرج`
    );

  }


  if (ogDescription) {

    ogDescription.setAttribute(
      "content",
      GRADUATION.tagline
    );

  }

}


/* =========================================================
   QUESTIONS
========================================================= */

function buildQuestions() {

  questionsContainer.innerHTML =
    "";


  GRADUATION.questions.forEach(
    (question, index) => {

      const article =
        document.createElement(
          "article"
        );


      article.className =
        "question";


      article.innerHTML = `
        <div class="question-number">
          ${toArabicDigits(index + 1).padStart(2, "٠")}
        </div>

        <div class="question-content">

          <span>
            السؤال ${toArabicDigits(index + 1)}
          </span>

          <h3>
            ${escapeHTML(question.text)}
          </h3>

          <div
            class="answer-group"
            data-question="${index}"
          >

            <button
              type="button"
              class="answer-option"
              data-value="yes"
              aria-pressed="false"
            >
              <span>
                نعم
              </span>

              <i class="answer-radio"></i>
            </button>

            <button
              type="button"
              class="answer-option"
              data-value="no"
              aria-pressed="false"
            >
              <span>
                لا
              </span>

              <i class="answer-radio"></i>
            </button>

          </div>

        </div>
      `;


      questionsContainer.appendChild(
        article
      );

    }
  );


  questionsContainer
    .querySelectorAll(
      ".answer-group"
    )
    .forEach(
      group => {

        group.addEventListener(
          "click",
          handleAnswerClick
        );

      }
    );

}


/* =========================================================
   ANSWERS
========================================================= */

function handleAnswerClick(
  event
) {

  const button =
    event.target.closest(
      ".answer-option"
    );


  if (
    !button ||
    submissionStarted
  ) {

    return;

  }


  const group =
    button.closest(
      ".answer-group"
    );


  const questionIndex =
    Number(
      group.dataset.question
    );


  const selectedValue =
    button.dataset.value;


  group
    .querySelectorAll(
      ".answer-option"
    )
    .forEach(
      option => {

        option.classList.remove(
          "is-selected",
          "is-wrong"
        );


        option.setAttribute(
          "aria-pressed",
          "false"
        );

      }
    );


  button.classList.add(
    "is-selected"
  );


  button.setAttribute(
    "aria-pressed",
    "true"
  );


  answers[questionIndex] =
    selectedValue;


  if (
    selectedValue !==
    GRADUATION.questions[
      questionIndex
    ].correct
  ) {

    button.classList.add(
      "is-wrong"
    );


    showExamMessage(
      "راجع هذه الإجابة وحاول مرة أخرى",
      "error"
    );

  } else {

    showExamMessage(
      "تم تسجيل الإجابة",
      "success"
    );

  }


  updateExamProgress();

}


/* =========================================================
   FINAL ANSWER
========================================================= */

function setupFinalAnswer() {

  graduationAnswer.addEventListener(
    "click",
    () => {

      if (submissionStarted) {
        return;
      }


      finalAnswerSelected =
        !finalAnswerSelected;


      graduationAnswer
        .classList.toggle(
          "is-selected",
          finalAnswerSelected
        );


      graduationAnswer.setAttribute(
        "aria-pressed",
        String(
          finalAnswerSelected
        )
      );


      updateExamProgress();

    }
  );

}


/* =========================================================
   PROGRESS
========================================================= */

function updateExamProgress() {

  let correctCount =
    0;


  GRADUATION.questions
    .forEach(
      (question, index) => {

        if (
          answers[index] ===
          question.correct
        ) {

          correctCount++;

        }

      }
    );


  if (finalAnswerSelected) {

    correctCount++;

  }


  const total =
    GRADUATION.questions.length +
    1;


  questionProgress.textContent =
    `${toArabicDigits(correctCount)} / ${toArabicDigits(total)}`;


  const percent =
    (
      correctCount /
      total
    ) *
    100;


  examProgressBar.style.width =
    `${percent}%`;


  const allCorrect =
    correctCount ===
    total;


  submitButton.disabled =
    !allCorrect;


  if (allCorrect) {

    showExamMessage(
      "اكتملت جميع الإجابات ويمكنك الآن تسليم النموذج",
      "success"
    );

  }

}


/* =========================================================
   MESSAGE
========================================================= */

function showExamMessage(
  message,
  type = ""
) {

  examMessage.textContent =
    message;


  examMessage.classList.remove(
    "is-success",
    "is-error"
  );


  if (type) {

    examMessage.classList.add(
      `is-${type}`
    );

  }

}


/* =========================================================
   SUBMIT
========================================================= */

function setupSubmit() {

  submitButton.addEventListener(
    "click",
    submitExam
  );

}


function submitExam() {

  if (
    submitButton.disabled ||
    submissionStarted
  ) {

    return;

  }


  submissionStarted =
    true;


  submitButton.disabled =
    true;


  examStatus.textContent =
    "تم التسليم";


  gradingSection.hidden =
    false;


  if (reducedMotion) {

    setGradingProgress(
      100
    );


    showResult();


    return;

  }


  if (
    typeof gsap ===
    "undefined"
  ) {

    runFallbackGrading();


    return;

  }


  gradingSection.scrollIntoView({
    behavior: "smooth"
  });


  const state = {
    value: 0
  };


  const timeline =
    gsap.timeline();


  timeline

    .to(
      state,
      {

        value: 32,

        duration: 0.9,

        ease: "power1.inOut",

        onUpdate: () => {

          setGradingProgress(
            Math.round(
              state.value
            )
          );

        }

      }
    )

    .call(
      () => {

        gradingTitle.textContent =
          "جارٍ التصحيح";


        gradingText.textContent =
          "يتم الآن فحص الإجابات واعتماد الدرجة الأكاديمية";

      }
    )

    .to(
      state,
      {

        value: 72,

        duration: 1,

        ease: "power1.inOut",

        onUpdate: () => {

          setGradingProgress(
            Math.round(
              state.value
            )
          );

        }

      }
    )

    .call(
      () => {

        gradingTitle.textContent =
          "جارٍ اعتماد النتيجة";


        gradingText.textContent =
          "اكتملت عملية التصحيح ويتم إصدار النتيجة النهائية";

      }
    )

    .to(
      state,
      {

        value: 100,

        duration: 0.85,

        ease: "power1.inOut",

        onUpdate: () => {

          setGradingProgress(
            Math.round(
              state.value
            )
          );

        }

      }
    )

    .to(
      {},
      {
        duration: 0.25
      }
    )

    .call(
      showResult
    );

}


/* =========================================================
   FALLBACK GRADING
========================================================= */

function runFallbackGrading() {

  let value =
    0;


  const timer =
    window.setInterval(
      () => {

        value += 10;


        setGradingProgress(
          value
        );


        if (
          value >= 100
        ) {

          clearInterval(
            timer
          );


          showResult();

        }

      },
      120
    );

}


/* =========================================================
   GRADING PROGRESS
========================================================= */

function setGradingProgress(
  value
) {

  const safe =
    Math.max(
      0,
      Math.min(
        100,
        value
      )
    );


  const offset =
    gradingCircumference -
    (
      safe /
      100
    ) *
    gradingCircumference;


  gradingCircle.style.strokeDashoffset =
    `${offset}`;


  gradingPercent.textContent =
    `${toArabicDigits(safe)}٪`;

}


/* =========================================================
   RESULT
========================================================= */

function showResult() {

  gradingSection.hidden =
    true;


  resultSection.hidden =
    false;


  resultSection.scrollIntoView({

    behavior:
      reducedMotion
        ? "auto"
        : "smooth"

  });


  if (
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {

    return;

  }


  gsap.from(
    resultSection,
    {

      opacity: 0,

      y: 35,

      duration: 0.7,

      ease: "power2.out"

    }
  );


  gsap.from(
    ".result-stamp",
    {

      opacity: 0,

      scale: 1.5,

      rotation: -20,

      duration: 0.55,

      delay: 0.35,

      ease: "back.out(1.7)"

    }
  );

}


/* =========================================================
   DATE
========================================================= */

function setupDate() {

  const date =
    new Date(
      GRADUATION.startAt
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return;

  }


  const dateFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ-u-nu-arab",
      {

        weekday:
          "long",

        day:
          "numeric",

        month:
          "long",

        year:
          "numeric",

        timeZone:
          GRADUATION.timeZone

      }
    );


  const timeFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ-u-nu-arab",
      {

        hour:
          "numeric",

        minute:
          "2-digit",

        hour12:
          true,

        timeZone:
          GRADUATION.timeZone

      }
    );


  document.getElementById(
    "formattedDate"
  ).textContent =
    dateFormatter.format(
      date
    );


  document.getElementById(
    "formattedTime"
  ).textContent =
    timeFormatter.format(
      date
    );


  document.getElementById(
    "fullAddress"
  ).textContent =
    [
      GRADUATION.address,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join("، ");

}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

  const start =
    new Date(
      GRADUATION.startAt
    ).getTime();


  const end =
    new Date(
      GRADUATION.endAt
    ).getTime();


  const now =
    Date.now();


  if (
    Number.isNaN(start) ||
    Number.isNaN(end)
  ) {

    return;

  }


  if (
    now >= start
  ) {

    setCountdown(
      0,
      0,
      0,
      0
    );


    if (
      now >= end
    ) {

      clearInterval(
        countdownTimer
      );

    }


    return;

  }


  const difference =
    start -
    now;


  const days =
    Math.floor(
      difference /
      86400000
    );


  const hours =
    Math.floor(
      (
        difference %
        86400000
      ) /
      3600000
    );


  const minutes =
    Math.floor(
      (
        difference %
        3600000
      ) /
      60000
    );


  const seconds =
    Math.floor(
      (
        difference %
        60000
      ) /
      1000
    );


  setCountdown(
    days,
    hours,
    minutes,
    seconds
  );

}


function setCountdown(
  days,
  hours,
  minutes,
  seconds
) {

  document.getElementById(
    "days"
  ).textContent =
    toArabicDigits(
      pad(days)
    );


  document.getElementById(
    "hours"
  ).textContent =
    toArabicDigits(
      pad(hours)
    );


  document.getElementById(
    "minutes"
  ).textContent =
    toArabicDigits(
      pad(minutes)
    );


  document.getElementById(
    "seconds"
  ).textContent =
    toArabicDigits(
      pad(seconds)
    );

}


function pad(
  value
) {

  return String(value)
    .padStart(
      2,
      "0"
    );

}


/* =========================================================
   MAPS
========================================================= */

function setupMaps() {

  mapsButton.href =
    getMapsUrl();

}


function getMapsUrl() {

  if (
    GRADUATION.mapsUrl &&
    GRADUATION.mapsUrl.trim()
  ) {

    return GRADUATION.mapsUrl;

  }


  const query =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      query
    )
  );

}


/* =========================================================
   SHARE
========================================================= */

function setupShare() {

  shareButton.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const title =
    `${GRADUATION.graduateName} — دعوة التخرج`;


  const text =
    `تم اجتياز الامتحان الأخير بنجاح. ندعوكم لمشاركة ${GRADUATION.graduateName} فرحة التخرج — ${GRADUATION.classYear}.`;


  const url =
    getShareUrl();


  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title,
        text,
        url
      });


      showShareFeedback(
        "تمت مشاركة الدعوة بنجاح"
      );


      return;

    }


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        url
      );


      showShareFeedback(
        "تم نسخ رابط الدعوة"
      );


      return;

    }


    fallbackCopy(
      url
    );


    showShareFeedback(
      "تم نسخ رابط الدعوة"
    );

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
    ) {

      return;

    }


    fallbackCopy(
      url
    );


    showShareFeedback(
      "تم نسخ رابط الدعوة"
    );

  }

}


function getShareUrl() {

  if (
    GRADUATION.shareUrl &&
    GRADUATION.shareUrl.trim()
  ) {

    return GRADUATION.shareUrl;

  }


  return window.location.href;

}


function fallbackCopy(
  value
) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    value;


  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";


  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();


  document.execCommand(
    "copy"
  );


  textarea.remove();

}


function showShareFeedback(
  message
) {

  shareFeedback.textContent =
    message;


  clearTimeout(
    showShareFeedback.timer
  );


  showShareFeedback.timer =
    setTimeout(
      () => {

        shareFeedback.textContent =
          "";

      },
      3500
    );

}


/* =========================================================
   UTILITIES
========================================================= */

function toArabicDigits(
  value
) {

  const digits =
    "٠١٢٣٤٥٦٧٨٩";


  return String(value)
    .replace(
      /\d/g,
      digit =>
        digits[
          Number(digit)
        ]
    );

}


function escapeHTML(
  value = ""
) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}
