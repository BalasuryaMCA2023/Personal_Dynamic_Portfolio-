import React from 'react';

const EducationCard = ({ education }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm bg-white dark:bg-gray-800">
      <h3 className="text-xl font-semibold">{education.degree}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300"> University Name: {education.institution}</p>
      <p>{education.fieldOfStudy}</p>  
      <p>Year: {education.graduationYear}</p>
      {education.grade && <p>Grade: {education.grade}</p>}
      {education.description && <p className="mt-2">{education.description}</p>}
    </div>
  );
};

export default EducationCard;