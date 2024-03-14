import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/awswer-comments-repository"
import { AnswerComment } from "@/domain/forum/enterprise/entities"

export class MemoryAnswerCommentsRepo implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
