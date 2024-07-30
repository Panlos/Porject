"use client";
import { useState, useEffect } from "react";

const ExerciseIdeas = () => {
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);


    useEffect(() => {
        const loadExercises = async () => {
            const exerciseIdeas = await fetchExercises();
            setExercises(exerciseIdeas);
        };
    }, [])//should be loading just on mount might have to change to what is searched



    return (
        <div>
            <label>Choose a muscle group to begin search</label>
            <div></div>
            <select id="muscles" name="muscles" className="text-black">
                    <option value="abdominals">Abdominals</option>
                    <option value="abductors">Abductors</option>
                    <option value="adductors">Adductors</option>
                    <option value="biceps">Biceps</option>
                    <option value="calves">Calves</option>
                    <option value="chest">Chest</option>
                    <option value="forearms">Forearms</option>
                    <option value="glutes">Glutes</option>
                    <option value="hamstrings">Hamstrings</option>
                    <option value="lats">Lats</option>
                    <option value="lower_back">Lower_back</option>
                    <option value="middle_back">Middle_back</option>
                    <option value="neck">Neck</option>
                    <option value="quadriceps">Quadriceps</option>
                    <option value="traps">Traps</option>
                    <option value="triceps">Triceps</option>
            </select>
        </div>
    )

}
async function fetchExercises(){
    const response = await fetch("https://api.api-ninjas.com/v1/exercises?muscle=biceps")
    if(!response.ok){
        throw new Error("Network not responding :( ");
    }
    const data = await response.json();
    return data || [];
}

export default ExerciseIdeas;
