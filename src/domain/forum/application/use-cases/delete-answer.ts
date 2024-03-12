import { AnswersRepository } from "../repositories/answers-repository"

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

export default class DeleteAnswerUseCase {
  constructor(private repo: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.repo.findById(answerId)

    if (!answer) throw new Error("Answer not found")

    if (answer.authorId.toString() !== authorId) throw new Error("Not allowed")

    await this.repo.delete(answer)
  }
}
