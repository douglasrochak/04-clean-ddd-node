import { UniqueEntityID } from "@/core/entities"
import { Question } from "../../enterprise/entities"
import { QuestionsRepository } from "../repositories/questions-repository"

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export default class CreateQuestionUseCase {
  constructor(private repo: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.repo.create(question)

    return { question }
  }
}
