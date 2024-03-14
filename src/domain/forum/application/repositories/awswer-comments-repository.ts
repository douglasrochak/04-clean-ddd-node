import { AnswerComment } from "../../enterprise/entities"

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
