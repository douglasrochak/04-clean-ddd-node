import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities"

export class MemoryQuestionCommentsRepo implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
