import { UniqueEntityID } from "@/core/entities"
import { AnswersRepository } from "../repositories/answers-repository"
import { Answer } from "../../enterprise/entities"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export default class AnswerQuestionUseCase {
  constructor(private repo: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.repo.create(answer)

    return answer
  }
}
