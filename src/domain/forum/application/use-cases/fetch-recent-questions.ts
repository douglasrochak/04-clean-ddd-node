import { QuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities"

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export default class FetchRecentQuestionsUseCase {
  constructor(private repo: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.repo.findManyRecent({ page })

    return { questions }
  }
}
