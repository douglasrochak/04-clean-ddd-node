import { UniqueEntityID } from "@/core/entities"
import { Question } from "../../enterprise/entities"
import { QuestionsRepository } from "../repositories/questions-repository"
import { Either, right } from "@/core/either"

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

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

    return right({ question })
  }
}
