import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export default class DeleteAnswerCommentUseCase {
  constructor(private repo: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.repo.findById(answerCommentId)
    if (!answerComment) throw new Error("Answer comment not found")

    if (answerComment.authorId.toString() !== authorId)
      throw new Error("Not allowed")

    await this.repo.delete(answerComment)

    return { answerComment }
  }
}
