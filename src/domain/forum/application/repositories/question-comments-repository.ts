import { QuestionComment } from "../../enterprise/entities"

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
