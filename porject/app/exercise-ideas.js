"use client";
import { useState, useEffect } from "react";

const ExerciseIdeas = () => {
    const [categories, setCategories] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoryData = await fetchCategories();
                console.log("Fetched Categories:", categoryData); // Log the fetched data
                setCategories(categoryData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        loadCategories();
    }, []); // Load category data once on component mount

    useEffect(() => {
        const loadExercises = async () => {
            try {
                if (selectedCategoryId) {
                    const exerciseData = await fetchExercises(selectedCategoryId);
                    console.log("Fetched Exercises:", exerciseData); // Log the fetched data
                    setExercises(exerciseData);
                }
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };
        loadExercises();
    }, [selectedCategoryId]); // Load exercise data when selectedCategoryId changes

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Exercise Category Test to see what the data looks like</h2>
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="text-black"
            />
            <ul>
                {filteredCategories.map((category) => (
                    <li key={category.id} onClick={() => handleCategorySelect(category.id)}>
                        <p>{category.name}</p>
                    </li>
                ))}
            </ul>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        {exercise.category == selectedCategoryId ? <p>{exercise.name}</p> : <p>Not workign</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

/**
 * to display what I want
 * <p>{exercise.description}</p>
 * <h3>{exercise.name}</h3>
 * 
 * */
async function fetchCategories() {
    const response = await fetch('https://wger.de/api/v2/exercisecategory/');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results || []; // Access the correct field in the response
}

async function fetchExercises(categoryId) {
    const response = await fetch(`https://wger.de/api/v2/exercise/?limit=20&offset=20`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results || []; // Access the correct field in the response
}

export default ExerciseIdeas;
