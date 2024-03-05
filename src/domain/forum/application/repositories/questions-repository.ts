import { Question } from "../../enterprise/entities"

export interface QuestionsRepository {
  create(question: Question): Promise<void>
}
