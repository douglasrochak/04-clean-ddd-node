import { AnswerComment } from "../../enterprise/entities"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export default class FetchAnswerCommentsUseCase {
  constructor(private repo: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.repo.findManyByAnswerId(answerId, {
      page,
    })

    return { answerComments }
  }
}
