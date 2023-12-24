/* eslint-disable react/no-unescaped-entities */

import { Helmet } from "react-helmet-async";


const About = () => {
    return (
        <div className="about-container mx-auto max-w-screen-lg p-4 font-Montserrat">
          <Helmet>
        <title>Task Manager | About</title>
      </Helmet>
        <h1 className="text-3xl font-bold mb-4">About Taskify</h1>
        <p className="mb-4">
          Welcome to Taskify, your go-to task management application! Taskify is designed to help you stay organized
          and manage your tasks efficiently. Whether you're a professional, student, or anyone with a busy schedule,
          Taskify is here to simplify your life.
        </p>
  
        <h2 className="text-2xl font-bold mb-2">Key Features:</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Add Tasks: Easily add tasks with titles, descriptions, deadlines, and priorities.</li>
          <li>Update Tasks: Edit task details, change priorities, and mark tasks as completed.</li>
          <li>Delete Tasks: Remove tasks that are no longer needed.</li>
          <li>Drag and Drop: Effortlessly organize your tasks by dragging and dropping them between different status columns.</li>
        </ul>
  
        <h2 className="text-2xl font-bold mb-2">How to Use:</h2>
        <p className="mb-4">
          Start by adding your tasks to the "To-Do" column. As you work on tasks, move them to "Ongoing" and finally to
          "Completed" when finished. The drag-and-drop functionality makes it easy to manage your tasks and track your progress.
        </p>
  
        <p>
          Taskify is designed to be user-friendly and customizable to fit your workflow. Stay focused, stay organized,
          and let Taskify handle the rest!
        </p>
      </div>
    );
};

export default About;