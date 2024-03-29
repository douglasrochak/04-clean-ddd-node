import { UniqueEntityID } from "@/core/entities"
import { AnswerComment } from "../../enterprise/entities"
import { AnswersRepository } from "../repositories/answers-repository"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

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
    if (!answer) return left(new ResourceNotFoundError())

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepo.create(answerComment)

    return right({ answerComment })
  }
}
