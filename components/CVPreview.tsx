
import React from 'react';
import type { CVData } from '../types';

interface CVPreviewProps {
  cvData: CVData;
  id?: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    options.day = 'numeric';
  }
  return date.toLocaleDateString('en-US', options);
};

const CVPreview: React.FC<CVPreviewProps> = ({ cvData, id }) => {
  const { personalDetails, summary, workExperience, education, skills, academicWritings, conferencePresentations, bookPublishings, programmesOrganised } = cvData;

  return (
    <div id={id} className="bg-white shadow-lg rounded-lg p-8 md:p-12 text-sm text-gray-700 leading-relaxed font-serif">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center mb-10 gap-6 sm:gap-8">
        {personalDetails.photo && (
            <img src={personalDetails.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-md flex-shrink-0" />
        )}
        <div className={`text-center sm:text-left ${!personalDetails.photo && 'w-full'}`}>
            <h1 className="text-4xl font-bold tracking-wider text-gray-800 uppercase">{personalDetails.fullName}</h1>
            <h2 className="text-xl font-semibold text-blue-700 tracking-wide mt-1">{personalDetails.jobTitle}</h2>
            <div className="flex justify-center sm:justify-start items-center gap-x-4 gap-y-1 text-xs mt-4 flex-wrap">
              <span>{personalDetails.email}</span>
              <span className="hidden sm:inline">|</span>
              <span>{personalDetails.phone}</span>
              <span className="hidden sm:inline">|</span>
              <span>{personalDetails.address}</span>
              <span className="hidden sm:inline">|</span>
              <span>{personalDetails.linkedin}</span>
            </div>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Summary</h3>
        <p>{summary}</p>
      </section>

      {/* Work Experience */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Experience</h3>
        <div className="space-y-6">
          {workExperience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-md font-bold text-gray-900">{exp.jobTitle}</h4>
                <p className="text-xs font-medium text-gray-600">{formatDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              <p className="text-md font-semibold text-blue-700">{exp.company}</p>
              <p className="mt-2 text-sm whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Education</h3>
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-md font-bold text-gray-900">{edu.institution}</h4>
                <p className="text-xs font-medium text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
              <p className="text-md font-semibold text-blue-700">{edu.degree}</p>
              <p className="mt-1 text-sm">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            skill.name && <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>
          ))}
        </div>
      </section>

      {/* Academic Writing */}
      {academicWritings && academicWritings.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Publications</h3>
          <div className="space-y-4">
            {academicWritings.map(writing => (
              <div key={writing.id}>
                <p className="font-semibold text-gray-900">{writing.title}</p>
                <p className="text-sm italic">{writing.journal}, {writing.year}. DOI: {writing.doi}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Conference Presentations */}
      {conferencePresentations && conferencePresentations.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Conferences</h3>
          <div className="space-y-4">
            {conferencePresentations.map(conf => (
              <div key={conf.id}>
                <div className="flex justify-between items-baseline">
                  {conf.role === 'presenter' ? (
                     <p className="font-semibold text-gray-900">'{conf.title}'</p>
                  ) : (
                    <p className="font-semibold text-gray-900">Attended as Delegate</p>
                  )}
                  <p className="text-xs font-medium text-gray-600">{formatDate(conf.date)}</p>
                </div>
                <p className="text-sm italic">{conf.conferenceName}, {conf.location}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Programmes Organised */}
      {programmesOrganised && programmesOrganised.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Programmes Organised</h3>
          <div className="space-y-4">
            {programmesOrganised.map(prog => (
              <div key={prog.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-md font-bold text-gray-900">{prog.programmeName}</h4>
                  <p className="text-xs font-medium text-gray-600">{formatDate(prog.date)}</p>
                </div>
                <p className="text-md font-semibold text-blue-700">{prog.role}</p>
                <p className="text-sm italic">{prog.organisation}, {prog.location}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Book Publishings */}
      {bookPublishings && bookPublishings.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-3 uppercase tracking-wider">Books</h3>
          <div className="space-y-4">
            {bookPublishings.map(book => (
              <div key={book.id}>
                <p className="font-semibold text-gray-900">{book.title} ({book.year})</p>
                <p className="text-sm italic">{book.publisher}. ISBN: {book.isbn}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CVPreview;
