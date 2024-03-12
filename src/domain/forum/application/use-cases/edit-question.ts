import { Question } from "../../enterprise/entities"
import { QuestionsRepository } from "../repositories/questions-repository"

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export default class EditQuestionUseCase {
  constructor(private repo: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.repo.findById(questionId)

    if (!question) throw new Error("Question not found")

    if (question.authorId.toString() !== authorId)
      throw new Error("Not allowed")

    question.title = title
    question.content = content

    await this.repo.save(question)

    return { question }
  }
}
