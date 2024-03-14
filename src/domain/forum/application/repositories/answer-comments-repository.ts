import { AnswerComment } from "../../enterprise/entities"

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(questionComment: AnswerComment): Promise<void>
}
