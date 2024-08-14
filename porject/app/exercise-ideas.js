"use client";
import { useState, useEffect } from "react";

const ExerciseIdeas = () => {
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState("abdominals");

    useEffect(() => {
        const loadExercises = async () => {
            const exerciseIdeas = await fetchExercises(searchTerm);
            setExercises(exerciseIdeas);
        };
        loadExercises();
    }, [searchTerm]); // Fetch exercises when searchTerm changes

    const handleMuscleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="min-h-screen bg-light-blue-100">
            <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4">
                <label className="block text-lg font-semibold mb-2">Choose a muscle group</label>
                <select
                    id="muscles"
                    name="muscles"
                    className="block w-full p-2 border border-gray-300 rounded-md text-black"
                    onChange={handleMuscleChange}
                >
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
            <div className="pt-24 mx-auto max-w-3xl px-4">
                <ul className="space-y-6">
                    {exercises.map((exercise) => (
                        <li key={exercise.name} className="bg-white p-6 rounded-md shadow-md">
                            <p className="text-xl font-semibold text-indigo-400">{exercise.name}</p>
                            <p className="text-gray-700"><strong>Type:</strong> {exercise.type}</p>
                            <p className="text-gray-700"><strong>Difficulty:</strong> {exercise.difficulty}</p>
                            <p className="text-gray-700"><strong>Instructions:</strong> {exercise.instructions}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

async function fetchExercises(muscle) {
    const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        headers: { 'X-Api-Key': 'u0YH1QPoCnaHo1Ry6cw/Ug==k5A7f9jL2viQEnNY' }
    });
    if (!response.ok) {
        throw new Error("Network not responding :(");
    }
    const data = await response.json();
    return data || [];
}

export default ExerciseIdeas;
