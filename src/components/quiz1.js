
import React, { useState,useEffect } from 'react';
import { Button,Container,ProgressBar} from 'react-bootstrap';
import { Radio, RadioGroup} from 'react-radio-group'
import axios from 'axios';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const Quiz =({handleAnswer,timer,onClickResetButton, handleNextQuestion,showAnswers,currentIndex,data:{question ,correct_answer,answers}})=>{

	
	return(


    <div className="container Quiz">
			  <div className="row br" style={{borderRadius:"10px"}}>
				  <div className="col-md-4 tab1">
					  <p className="text1"> Quiz</p>
					 
					  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
						  Lorem Ipsum has been the industry's standard dummy</p>
						 

					  <ProgressBar striped variant="success" className="prgbar" animated now={currentIndex *5}/>
						  <label>{currentIndex}/20</label>

						  <p>Time Remaining :{timer}</p>
						 
				  </div>
				  <div className="col-md-8 tab2 ">
					<p className="text-center text2"> Questions </p> 

					<div className="question_box">
					<h3 className="text-left Question" dangerouslySetInnerHTML={{ __html: question}}/>

					

					{answers.map ((answer) =>(


						<div className={`${correct_answer === answer ? 'text-success':'text-danger'} radio-button-background options`}>
    				  		 <Button onClick={()=>handleAnswer(answer)}  className="radio-button btn23"   /> &nbsp;{answer}
 					  	</div>		   
                    ))}
   												
					
					</div>
					<Button type ="submit"className="Submit btn2" onClick={()=>{handleNextQuestion();onClickResetButton()}}>Sumbit</Button>
				  </div>
			  </div>
			 
		  </div>
)}
export default Quiz