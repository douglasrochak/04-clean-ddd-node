import { QuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities"

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export default class GetQuestionBySlugUseCase {
  constructor(private repo: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.repo.findBySlug(slug)

    if (!question) throw new Error("Question not found")

    return { question }
  }
}
