import UniqueEntityID from "../../core/entities/unique-entity-id"
import { Answer, Student } from "../entities"
import { AnswersRepository } from "../repositories/answers-repository"

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
