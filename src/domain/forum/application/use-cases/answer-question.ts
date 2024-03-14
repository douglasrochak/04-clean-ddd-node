import { UniqueEntityID } from "@/core/entities"
import { AnswersRepository } from "../repositories/answers-repository"
import { Answer } from "../../enterprise/entities"
import { Either, right } from "@/core/either"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>

export default class AnswerQuestionUseCase {
  constructor(private repo: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.repo.create(answer)

    return right({ answer })
  }
}
