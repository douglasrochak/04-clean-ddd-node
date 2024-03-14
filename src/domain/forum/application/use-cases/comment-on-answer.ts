import { UniqueEntityID } from "@/core/entities"
import { AnswerComment } from "../../enterprise/entities"
import { AnswersRepository } from "../repositories/answers-repository"
import { AnswerCommentsRepository } from "../repositories/awswer-comments-repository"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export default class CommentOnAnswerUseCase {
  constructor(
    private answersRepo: AnswersRepository,
    private answerCommentsRepo: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepo.findById(answerId)
    if (!answer) throw new Error("Answer not found.")

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepo.create(answerComment)

    return { answerComment }
  }
}
