import { UniqueEntityID } from "@/core/entities"
import { QuestionComment } from "../../enterprise/entities"
import { QuestionsRepository } from "../repositories/questions-repository"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export default class CommentOnQuestionUseCase {
  constructor(
    private questionsRepo: QuestionsRepository,
    private questionCommentsRepo: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepo.findById(questionId)
    if (!question) throw new Error("Question not found.")

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepo.create(questionComment)

    return { questionComment }
  }
}
