
import React from 'react';
import type { CVData, WorkExperience, Education, Skill, AcademicWriting, ConferencePresentation, BookPublishing, ProgrammeOrganised } from '../types';
import Section from './Section';
import TextInput from './TextInput';
import TextArea from './TextArea';
import IconButton from './IconButton';
import ImageUpload from './ImageUpload';
import { PlusIcon, TrashIcon } from '../constants';

interface CVFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData }) => {
  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [name]: value },
    }));
  };
  
  const handlePhotoChange = (photoAsBase64: string) => {
    setCvData(prev => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, photo: photoAsBase64 },
    }));
  };

  const handlePhotoRemove = () => {
    setCvData(prev => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, photo: '' },
    }));
  };
  
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvData(prev => ({ ...prev, summary: e.target.value }));
  };

  const handleArrayChange = <T extends { id: number }>(
    section: keyof CVData,
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCvData(prev => {
      const newArray = [...(prev[section] as T[])];
      newArray[index] = { ...newArray[index], [name]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = <T,>(section: keyof CVData, newItem: T) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...(prev[section] as T[]), newItem],
    }));
  };

  const removeArrayItem = (section: keyof CVData, id: number) => {
    setCvData(prev => ({
      ...prev,
      [section]: (prev[section] as { id: number }[]).filter(item => item.id !== id),
    }));
  };

  const addWorkExperience = () => {
    addArrayItem<WorkExperience>('workExperience', {
      id: Date.now(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };
  
  const addEducation = () => {
    addArrayItem<Education>('education', {
      id: Date.now(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const addSkill = () => {
    addArrayItem<Skill>('skills', { id: Date.now(), name: '' });
  };

  const addAcademicWriting = () => {
    addArrayItem<AcademicWriting>('academicWritings', {
      id: Date.now(),
      title: '',
      journal: '',
      year: '',
      doi: '',
    });
  };
  
  const addConferencePresentation = () => {
    addArrayItem<ConferencePresentation>('conferencePresentations', {
      id: Date.now(),
      title: '',
      conferenceName: '',
      location: '',
      date: '',
      role: 'presenter',
    });
  };
  
  const addBookPublishing = () => {
    addArrayItem<BookPublishing>('bookPublishings', {
      id: Date.now(),
      title: '',
      publisher: '',
      year: '',
      isbn: '',
    });
  };

  const addProgrammeOrganised = () => {
    addArrayItem<ProgrammeOrganised>('programmesOrganised', {
        id: Date.now(),
        programmeName: '',
        organisation: '',
        location: '',
        date: '',
        role: '',
    });
  };

  return (
    <div className="space-y-6">
      <Section title="Personal Details">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <ImageUpload 
              photo={cvData.personalDetails.photo}
              onPhotoChange={handlePhotoChange}
              onPhotoRemove={handlePhotoRemove}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            <TextInput label="Full Name" name="fullName" value={cvData.personalDetails.fullName} onChange={handlePersonalDetailsChange} />
            <TextInput label="Job Title" name="jobTitle" value={cvData.personalDetails.jobTitle} onChange={handlePersonalDetailsChange} />
            <TextInput label="Email" name="email" type="email" value={cvData.personalDetails.email} onChange={handlePersonalDetailsChange} />
            <TextInput label="Phone" name="phone" type="tel" value={cvData.personalDetails.phone} onChange={handlePersonalDetailsChange} />
            <TextInput label="Address" name="address" value={cvData.personalDetails.address} className="sm:col-span-2" onChange={handlePersonalDetailsChange} />
            <TextInput label="LinkedIn" name="linkedin" value={cvData.personalDetails.linkedin} className="sm:col-span-2" onChange={handlePersonalDetailsChange} />
          </div>
        </div>
      </Section>
      
      <Section title="Professional Summary">
        <TextArea label="Summary" name="summary" value={cvData.summary} onChange={handleSummaryChange} rows={5} placeholder="Write a short summary about your professional background..."/>
      </Section>

      <Section title="Work Experience">
        <div className="space-y-4">
          {cvData.workExperience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-lg bg-white relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleArrayChange('workExperience', index, e)} />
                <TextInput label="Company" name="company" value={exp.company} onChange={(e) => handleArrayChange('workExperience', index, e)} />
                <TextInput label="Start Date" name="startDate" type="date" value={exp.startDate} onChange={(e) => handleArrayChange('workExperience', index, e)} />
                <TextInput label="End Date" name="endDate" type="date" value={exp.endDate} onChange={(e) => handleArrayChange('workExperience', index, e)} />
              </div>
              <TextArea label="Description" name="description" value={exp.description} onChange={(e) => handleArrayChange('workExperience', index, e)} className="mt-4" rows={4} placeholder="Describe your responsibilities and achievements..."/>
              <div className="absolute top-2 right-2">
                 <IconButton onClick={() => removeArrayItem('workExperience', exp.id)} aria-label="Remove experience">
                    <TrashIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button onClick={addWorkExperience} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon /> Add Experience
          </button>
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-4">
          {cvData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-lg bg-white relative">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextInput label="Institution" name="institution" value={edu.institution} onChange={(e) => handleArrayChange('education', index, e)} />
                  <TextInput label="Degree" name="degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} />
                  <TextInput label="Start Date" name="startDate" type="date" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, e)} />
                  <TextInput label="End Date" name="endDate" type="date" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, e)} />
                </div>
              <TextArea label="Description" name="description" value={edu.description} onChange={(e) => handleArrayChange('education', index, e)} className="mt-4" rows={3} placeholder="Optional: mention honors, clubs, etc."/>
               <div className="absolute top-2 right-2">
                 <IconButton onClick={() => removeArrayItem('education', edu.id)} aria-label="Remove education">
                    <TrashIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
         <div className="mt-4">
          <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon /> Add Education
          </button>
        </div>
      </Section>

      <Section title="Skills">
        <div className="space-y-2">
          {cvData.skills.map((skill, index) => (
            <div key={skill.id} className="flex items-center gap-2">
               <TextInput label={`Skill ${index + 1}`} name="name" value={skill.name} onChange={(e) => handleArrayChange('skills', index, e)} className="flex-grow" hideLabel />
               <IconButton onClick={() => removeArrayItem('skills', skill.id)} aria-label="Remove skill">
                  <TrashIcon />
               </IconButton>
            </div>
          ))}
        </div>
         <div className="mt-4">
          <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon /> Add Skill
          </button>
        </div>
      </Section>

      <Section title="Academic Writing">
        <div className="space-y-4">
          {cvData.academicWritings.map((writing, index) => (
            <div key={writing.id} className="p-4 border rounded-lg bg-white relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput label="Title" name="title" value={writing.title} onChange={(e) => handleArrayChange('academicWritings', index, e)} />
                <TextInput label="Journal / Publication" name="journal" value={writing.journal} onChange={(e) => handleArrayChange('academicWritings', index, e)} />
                <TextInput label="Year" name="year" value={writing.year} onChange={(e) => handleArrayChange('academicWritings', index, e)} />
                <TextInput label="DOI / Link" name="doi" value={writing.doi} onChange={(e) => handleArrayChange('academicWritings', index, e)} />
              </div>
              <div className="absolute top-2 right-2">
                <IconButton onClick={() => removeArrayItem('academicWritings', writing.id)} aria-label="Remove writing">
                  <TrashIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button onClick={addAcademicWriting} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon /> Add Publication
          </button>
        </div>
      </Section>
      
      <Section title="Conference Presentations">
          <div className="space-y-4">
              {cvData.conferencePresentations.map((conf, index) => (
                  <div key={conf.id} className="p-4 border rounded-lg bg-white relative">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                              <label htmlFor={`role-${conf.id}`} className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                              <select
                                  id={`role-${conf.id}`}
                                  name="role"
                                  value={conf.role}
                                  onChange={(e) => handleArrayChange('conferencePresentations', index, e)}
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              >
                                  <option value="presenter">Presenter</option>
                                  <option value="delegate">Delegate</option>
                              </select>
                          </div>
                          {conf.role === 'presenter' && (
                            <TextInput label="Presentation Title" name="title" value={conf.title} onChange={(e) => handleArrayChange('conferencePresentations', index, e)} />
                          )}
                          <TextInput label="Conference Name" name="conferenceName" value={conf.conferenceName} onChange={(e) => handleArrayChange('conferencePresentations', index, e)} />
                          <TextInput label="Location" name="location" value={conf.location} onChange={(e) => handleArrayChange('conferencePresentations', index, e)} />
                          <TextInput label="Date" name="date" type="date" value={conf.date} onChange={(e) => handleArrayChange('conferencePresentations', index, e)} />
                      </div>
                      <div className="absolute top-2 right-2">
                          <IconButton onClick={() => removeArrayItem('conferencePresentations', conf.id)} aria-label="Remove presentation">
                              <TrashIcon />
                          </IconButton>
                      </div>
                  </div>
              ))}
          </div>
          <div className="mt-4">
              <button onClick={addConferencePresentation} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PlusIcon /> Add Presentation
              </button>
          </div>
      </Section>

      <Section title="Programmes Organised">
        <div className="space-y-4">
            {cvData.programmesOrganised.map((prog, index) => (
                <div key={prog.id} className="p-4 border rounded-lg bg-white relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput label="Programme Name" name="programmeName" value={prog.programmeName} onChange={(e) => handleArrayChange('programmesOrganised', index, e)} />
                        <TextInput label="Organisation" name="organisation" value={prog.organisation} onChange={(e) => handleArrayChange('programmesOrganised', index, e)} />
                        <TextInput label="Your Role" name="role" value={prog.role} onChange={(e) => handleArrayChange('programmesOrganised', index, e)} />
                        <TextInput label="Location" name="location" value={prog.location} onChange={(e) => handleArrayChange('programmesOrganised', index, e)} />
                        <TextInput label="Date" name="date" type="date" value={prog.date} onChange={(e) => handleArrayChange('programmesOrganised', index, e)} className="sm:col-span-2" />
                    </div>
                    <div className="absolute top-2 right-2">
                        <IconButton onClick={() => removeArrayItem('programmesOrganised', prog.id)} aria-label="Remove programme">
                            <TrashIcon />
                        </IconButton>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-4">
            <button onClick={addProgrammeOrganised} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon /> Add Programme
            </button>
        </div>
      </Section>

      <Section title="Book Publishing">
          <div className="space-y-4">
              {cvData.bookPublishings.map((book, index) => (
                  <div key={book.id} className="p-4 border rounded-lg bg-white relative">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <TextInput label="Book Title" name="title" value={book.title} onChange={(e) => handleArrayChange('bookPublishings', index, e)} />
                          <TextInput label="Publisher" name="publisher" value={book.publisher} onChange={(e) => handleArrayChange('bookPublishings', index, e)} />
                          <TextInput label="Year" name="year" value={book.year} onChange={(e) => handleArrayChange('bookPublishings', index, e)} />
                          <TextInput label="ISBN" name="isbn" value={book.isbn} onChange={(e) => handleArrayChange('bookPublishings', index, e)} />
                      </div>
                      <div className="absolute top-2 right-2">
                          <IconButton onClick={() => removeArrayItem('bookPublishings', book.id)} aria-label="Remove book">
                              <TrashIcon />
                          </IconButton>
                      </div>
                  </div>
              ))}
          </div>
          <div className="mt-4">
              <button onClick={addBookPublishing} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PlusIcon /> Add Book
              </button>
          </div>
      </Section>
    </div>
  );
};

export default CVForm;
