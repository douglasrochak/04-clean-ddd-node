import { Answer } from "../../enterprise/entities"
import { AnswersRepository } from "../repositories/answers-repository"

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export default class FetchQuestionAnswersUseCase {
  constructor(private repo: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.repo.findManyByQuestionId(questionId, { page })

    return { answers }
  }
}
