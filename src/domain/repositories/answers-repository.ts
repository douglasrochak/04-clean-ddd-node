import { Answer } from "../entities"

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
