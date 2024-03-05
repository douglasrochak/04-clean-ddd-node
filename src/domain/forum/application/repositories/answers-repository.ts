import { Answer } from "../../enterprise/entities"

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
