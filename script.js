let currentSubject = "";
const quizContainer = document.getElementById('quiz-container');
const resultBox = document.getElementById('quizResult');
const submitBtn = document.getElementById('submitBtn');
const retryBtn = document.getElementById('retryBtn');

function startQuiz() {
  let subject = document.getElementById('subjectSelect').value;
  if (!subject) {
    alert("කරුණාකර විෂය තෝරන්න!");
    return;
  }
  currentSubject = subject;
  loadQuiz(subject);
  submitBtn.style.display = "inline-block";
  retryBtn.style.display = "none";
  resultBox.textContent = "";
}

function loadQuiz(subject) {
  quizContainer.innerHTML = '';
  let subjectQuizzes = quizzes[subject];
  
  subjectQuizzes.forEach((q, index) => {
    let div = document.createElement('div');
    div.classList.add('quiz-card');
    div.innerHTML = `<p><strong>ප්‍රශ්නය ${index+1} of ${subjectQuizzes.length}:</strong> ${q.question}</p>`;
    q.options.forEach((opt, i) => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}">
          ${opt}
        </label><br>`;
    });
    quizContainer.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;
  let subjectQuizzes = quizzes[currentSubject];
  
  subjectQuizzes.forEach((q, index) => {
    let answer = document.querySelector(`input[name="q${index}"]:checked`);
    if(answer && parseInt(answer.value) === q.answer) score++;
  });

  let percentage = (score / subjectQuizzes.length) * 100;
  resultBox.textContent = `ඔබේ ලකුණු: ${score} / ${subjectQuizzes.length} (${percentage.toFixed(0)}%)`;

  if (percentage >= 50) {
    resultBox.style.color = "green";
    resultBox.textContent += " ✅ ඔබ उत्तීර්ණයි!";
  } else {
    resultBox.style.color = "red";
    resultBox.textContent += " ❌ නැවත උත්සාහ කරන්න.";
  }

  submitBtn.style.display = "none";
  retryBtn.style.display = "inline-block";
}

function retryQuiz() {
  loadQuiz(currentSubject);
  resultBox.textContent = "";
  submitBtn.style.display = "inline-block";
  retryBtn.style.display = "none";
}
