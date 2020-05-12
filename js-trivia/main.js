const question = document.getElementById('question');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
function api() {
    fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
    .then(response => {
        return response.json();
    })
    .then(questions => {
        console.log(questions.results);
            category.textContent = questions.results[0].category;
            difficulty.textContent = questions.results[0].difficulty;
            question.textContent = questions.results[0].question;
    })
    .catch(err => {
        console.error(err);
    });
}