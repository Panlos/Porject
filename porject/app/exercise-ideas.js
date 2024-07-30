"use client";
import { useState, useEffect } from "react";

const ExerciseIdeas = () => {
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadExerciseIdeas = async () => {
            try {
                const exerciseIdeas = await fetchExerciseIdeas();
                console.log("Fetched Exercise Ideas:", exerciseIdeas); // Log the fetched data
                setExercises(exerciseIdeas);
            } catch (error) {
                console.error("Error fetching exercise ideas:", error);
            }
        };
        loadExerciseIdeas();
    }, []); // Load data once on component mount

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredExercises = exercises.filter(
        (exercise) =>
            exercise.category &&
            exercise.category.name &&
            exercise.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl mb-4">Exercise Category Test to see what the data looks like</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by category..."
                className="text-black mb-4 p-2 border rounded"
            />
            <ul className="space-y-8">
                {filteredExercises.map((exercise) => (
                    <li key={exercise.id} className="text-center">
                        <h3 className="text-xl mb-2">{exercise.name}</h3>
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: exercise.description }}></p>
                        {exercise.images && exercise.images.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-lg mb-2">Images</h4>
                                {exercise.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.image}
                                        alt={exercise.name}
                                        className="w-48 h-48 object-cover mx-auto mb-2"
                                    />
                                ))}
                            </div>
                        )}
                        {exercise.videos && exercise.videos.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-lg mb-2">Videos</h4>
                                {exercise.videos.map((video, index) => (
                                    <video key={index} controls className="w-48 h-48 mx-auto mb-2">
                                        <source src={video.video} type="video/mp4" />
                                    </video>
                                ))}
                            </div>
                        )}
                        {exercise.comments && exercise.comments.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-lg mb-2">Comments</h4>
                                {exercise.comments.map((comment, index) => (
                                    <p key={index}>{comment.comment}</p>
                                ))}
                            </div>
                        )}
                        {exercise.description && exercise.description.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-lg mb-2">description</h4>
                                {exercise.description.map((description, index) => (
                                    <p key={index}>{description.description}</p>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

async function fetchExerciseIdeas() {
    const response = await fetch('https://wger.de/api/v2/exercisebaseinfo/');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results || []; // Access the correct field in the response
}

export default ExerciseIdeas;
