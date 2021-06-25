import React, { useState,useEffect,useRef } from 'react';
import { Button,Container,ProgressBar,Spinner} from 'react-bootstrap';
import { Radio, RadioGroup} from 'react-radio-group'
import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './components/quiz1'
import pic from './pic.png'


const API_URL='https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple';

function App(){

    const[questions,setQuestions]=useState([]); 
    const[currentIndex,setCurrentIndex]=useState(0)
    const[score,setScore]=useState(0)
    const [showAnswers,setShowAnswers]=useState(false)
    const intervalRef=useRef(null);
    const [timer,setTimer]=useState('00:10:00')
    function getTimeRemaining(endtime){
        const total =Date.parse(endtime) - Date.parse(new Date())
        const seconds =Math.floor ((total/1000)%60);
        const minutes =Math.floor((total/1000/60)%60)
        const hours=Math.floor ((total/1000*60*60)%24)
        const days =Math.floor(total/(1000*60*60*24))

        return{
            total,days,hours,minutes,seconds
        }    

    }
    function startTimer(deadline){
        let { total,days,hours,minutes,seconds} = getTimeRemaining(deadline)
        if(total>=0){
            setTimer(
                (hours >9 ? hours :'0' +hours) + ':' +
                (minutes >9 ? minutes :'0' +minutes) + ':' +
                (seconds >9 ? seconds :'0' +seconds) 
            )
        }else{
            clearInterval(intervalRef.current)
        }

    }

    function clearTimer (endtime){
        setTimer('00:00:20');
        if(intervalRef.current)clearInterval(intervalRef.current)
        const id =setInterval(()=>{
            startTimer(endtime);
        },1000)
        intervalRef.current=id;
    }

    function getDeadlineTime(){
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds()+20)
        return deadline;
    }

    useEffect(()=>
    {
        clearTimer(getDeadlineTime());
        return() => { if(intervalRef.current)clearInterval(intervalRef.current)}
    },[])

    function onClickResetButton(){
        if(intervalRef.current)clearInterval(intervalRef.current)
        clearTimer(getDeadlineTime())
    }
    

    useEffect(() =>{
        fetch(API_URL)
        .then((res)=>res.json())
        .then((data)=>{
            const questions = data.results.map((question) =>
            ({
                ...question,
                answers:[
                    question.correct_answer,
                ...question.incorrect_answers
            ].sort(()=> Math.random() - 0.5),
            }))

            setQuestions(questions);
          
        })
    },[])

    const handleAnswer=(answer) =>{

        if(!showAnswers){
        
        if (answer === questions[currentIndex].correct_answer){
            setScore(score + 1);
        }else{
            setScore(score - 0.5)
        }

      

        //const newIndex =currentIndex +1
        //setCurrentIndex(newIndex);

       // const newIndex =currentIndex +1
       // setCurrentIndex(newIndex);
    }
    setShowAnswers(true)
    }
    const handleNextQuestion =()=>{
        

        setCurrentIndex(currentIndex +1)
        setShowAnswers(false);
    }

    return ( 
        
        questions.length > 0 ? (
			<div className="he"> 
            {currentIndex >= questions.length ? (
        

        <div className="container Quiz tab1">
            <img src={pic} className="pic"></img>
        <div><p className="jumbtron text-center"><h1>Your score is <h1>{score}</h1></h1></p></div>
        </div>

        
    ):(
            
			
            <Quiz data={questions[currentIndex]} timer={timer} onClickResetButton={onClickResetButton}currentIndex={currentIndex} handleAnswer={handleAnswer} showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion} />
    )}
			</div>
        ):(
            <h1 className="text-center "><Spinner animation="border" /></h1>
        ))
        

    
}
export default App