import { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export default class DeleteQuestionCommentUseCase {
  constructor(private repo: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.repo.findById(questionCommentId)
    if (!questionComment) throw new Error("Question comment not found")

    if (questionComment.authorId.toString() !== authorId)
      throw new Error("Not allowed")

    await this.repo.delete(questionComment)

    return { questionComment }
  }
}
