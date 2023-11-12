
export interface Training {
    trainingId: number;
    trainingName: string;
    passMarks: number;
    preScreen: boolean;
    active: boolean;
    trainingMaterialTbs: TrainingMaterial[];
    trainingQuizTbs: TrainingQuiz[];
    userTrainingTbs: UserTraining[];
}

export interface TrainingQuiz {
    trainingQuizId: number;
    trainingId: number;
    trainingQuiz: string;
    displayOrder: number;
    choiceType: boolean;
    active: boolean;
}

export interface UserTraining {
    userTrainingId: number;
    userId: number;
    trainingId: number;
    status: string | null;
    quizAttendDate: string | null;
    attempted: number;
    totalObtainedMarks: number | null;
    overriddenBy: number | null;
    siteStudyId: number;
    active: boolean | null;
}
export interface TrainingMaterial {
    materialId: number;
    trainingId: number;
    displayOrder: number;
    fileName: string | null;
    filePath: string | null;
}

export interface TrainingQuizAnswerGiven {
    trainingQuizAnswerGivenId: number;
    trainingQuizId: number;
    answerGivenId: number;
    attempted: number;
    userId: number;
}

export interface TrainingQuizAnswer {
    trainingQuizAnswerId: number;
    trainingQuizId: number;
    trainingQuizAnswer: string;
    correctAnswer: boolean;
    correctAnswerMark: number;
    displayOrder: number;
    active: boolean;
}