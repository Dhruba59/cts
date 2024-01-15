'use client';

import SubjectEntryForm from '@/features/subject-management/subject-entry';
import { useParams } from 'next/navigation';
import React from 'react'

const StudyEditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [ subjectId, nationalIdType ] = id.split('_');
  const idProps = {
    subjectId,
    nationalIdType
  }
  return (
    <>
      <SubjectEntryForm ids={idProps}/>
    </>
  )
}

export default StudyEditPage;