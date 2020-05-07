const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestionSpan2=document.querySelector(".total-question2");
const percentage=document.querySelector(".percentage");
const question=document.querySelector(".question");
const  op1=document.querySelector(".option1");
const  op2=document.querySelector(".option2");
const  op3=document.querySelector(".option3");
const  op4=document.querySelector(".option4");
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;

/* questions options & answers */

questions=[{
    q:"Which group of microorganism does Coronavirus belong to?",
    options:["Fungi", "Bacteria", "Nematodes", "Viruses"],
    answer:3
},
    
{
    q:"Coronavirus was first detected in?",
    options:["Belgium", "Kenya", "China", "Brazil"],
    answer:2
},
    {
        q:"Coronavirus has a _____  genome?",
        options:["DDA", "DNA", "RNA", "RDA"],
        answer:2
    },
    {
        q:"Symptoms of Coronavirus disease include the following except?",
        options:["fever", "dry cough", "breathlessness", "back ache"],
        answer:3
    },
    {
        q:"The first epicenter of the Coronavirus disease was?",
        options:["Wuhan", "New York", "Lagos", "Toronto"],
        answer:0
    },
]

/*set questions and options and question number */
    totalQuestionSpan.innerHTML=questions.length;
    function load(){
        questionNumberSpan.innerHTML=index+1;
            question.innerHTML=questions[questionIndex].q;
            op1.innerHTML=questions[questionIndex].options[0];
            op2.innerHTML=questions[questionIndex].options[1];
            op3.innerHTML=questions[questionIndex].options[2];
            op4.innerHTML=questions[questionIndex].options[3];
            index++;
    }

    

    function check(element){
    if(element.id==questions[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerTracker("correct")
        score++;
        console.log("score:"+score)
        }
        else{
        element.classList.add("wrong")
        updateAnswerTracker("wrong")

        }

        disabledOptions()
    }

    function disabledOptions(){
        for(let i=0; i<options.length; i++) {
        options[i].classList.add("disabled");
        if(options[i].id==questions[questionIndex].answer){
        options[i].classList.add("correct");
        }
       }
    }
    
    function enableOptions(){
        for(let i=0; i<options.length; i++) {
            options[i].classList.remove("disabled", "correct", "wrong");
        }
    }

    function validate(){
        if(!options[0].classList.contains("disabled")){
            alert("Please select one option")
        }
        else{
            enableOptions();
            randomQuestion();
        }
    }
    function next(){
        validate();
    }

    function randomQuestion(){
        let randomNumber=Math.floor(Math.random()*questions.length);
        let hitDuplicate=0;
        if(index==questions.length){
            quizOver();
        }
        else{
        if(myArray.length>0){
            for(let i=0; i<myArray.length; i++){
                if(myArray[i]==randomNumber){
                    hitDuplicate=1;
                    break;
                }
            }
            if(hitDuplicate==1){
                randomQuestion();
            }
            else{
                questionIndex=randomNumber;
                load();
                myArr.push(questionIndex);
            }
        }
        if(myArray.length==0){
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
        }
        myArray.push(randomNumber);
        
        }
    }
    function answerTracker(){
        for(let i=0; i<questions.length; i++){
            const div=document.createElement("div")
            answerTrackerContainer.appendChild(div);
        }
    }
    function updateAnswerTracker(classNam){
        answerTrackerContainer.children[index-1].classList.add(classNam);

    }

    function quizOver(){
        document.querySelector(".quiz-over").classList.add("show");
        correctAnswerSpan.innerHTML=score;
        totalQuestionSpan2.innerHTML=questions.length;
        percentage.innerHTML=(score/questions.length)*100 + "%";
    }

    function tryAgain (){
        window.location.reload();
    }
    window.onload=function(){
        randomQuestion()
        answerTracker();
    }