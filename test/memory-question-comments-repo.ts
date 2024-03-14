import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities"

export class MemoryQuestionCommentsRepo implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)
    if (!questionComment) return null
    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    )

    this.items.splice(questionIndex, 1)
  }
}
