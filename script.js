let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;

let questions = quiz.sort(function () {
    return 0.5 - Math.random();
});

let totalQuestions = questions.length;
$(function (){ 
    //timer code starts from here

    let totalTime = 200;    //200 seconds for timer
    let min = 0;
    let sec = 0;
    let counter = 0;

    let timer = setInterval(function () {
        counter ++;
        min = Math.floor((totalTime - counter) / 60); //calculating min
        sec = totalTime - min * 60 - counter;

        $(".timerBox span").text(min + ":" + sec);

        // console.log("min = " + min);
        // console.log("sec = " + sec);
        if(counter == totalTime)
        {
            alert("Time's Up. Press OK to show the result.");
            result();
            clearInterval(timer);
        }
    }, 1000);   //timer set for 1 seconds interval

    //timer code end 

    //print question
    printQuestion(index);
});

//function to print question start

function printQuestion(i)
{
   // console.log(questions[0]);

    $(".questionBox").text(questions[i].question);
    $(".optionBox span").eq(0).text(questions[i].option[0]);
    $(".optionBox span").eq(1).text(questions[i].option[1]);
    $(".optionBox span").eq(2).text(questions[i].option[2]);
    $(".optionBox span").eq(3).text(questions[i].option[3]);
}
//function to print question end

//function to chk answer start

function checkAnswer(option){
    attempt++;
    let optionClicked = $(option).data("opt");
    console.log(questions[index]);
    if(optionClicked == questions[index].answer){
        $(option).addClass("right");
        score++;
    }
    else
    {
        $(option).addClass("wrong");
        wrong++;
    }

    $(".scoreBox span").text(score);

    $(".optionBox span").attr("onclick","");

    //function to chk answer end

}

// function for the next question start
function next(){
    //console.log("ShowNext")
    if(index >= questions.length - 1)
    {
        showResult(0);
        return;
    }

    index++;

    $(".optionBox span").removeClass();
    $(".optionBox span").attr("onclick","checkAnswer(this)");

    printQuestion(index);
}
// function for the next question end

//function for result start
function showResult(j){
    if(j == 1 && index < questions.length - 1 && !confirm("Quiz has not finished yet.Press Ok to Skip Quiz & get your final result."))
    {
        return;
    }
    result();
}

//function for result end

//time out

function result(){
    $("#questionScreen").hide();
    $("#resultScreen").show();

    $("#totalQuestion").text(totalQuestions);
    $("#attemptQuestion").text(attempt);
    $("#correctAnswers").text(score);
    $("#wrongAnswers").text(wrong);
}