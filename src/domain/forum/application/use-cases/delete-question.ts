import { QuestionsRepository } from "../repositories/questions-repository"

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

export default class DeleteQuestionUseCase {
  constructor(private repo: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.repo.findById(questionId)

    if (!question) throw new Error("Question not found")

    if (question.authorId.toString() !== authorId)
      throw new Error("Not allowed")

    await this.repo.delete(question)
  }
}
