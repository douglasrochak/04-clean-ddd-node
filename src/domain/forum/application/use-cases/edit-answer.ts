import { Answer } from "../../enterprise/entities"
import { AnswersRepository } from "../repositories/answers-repository"

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export default class EditAnswerUseCase {
  constructor(private repo: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.repo.findById(answerId)

    if (!answer) throw new Error("Answer not found")

    if (answer.authorId.toString() !== authorId) throw new Error("Not allowed")

    answer.content = content

    await this.repo.save(answer)

    return { answer }
  }
}
