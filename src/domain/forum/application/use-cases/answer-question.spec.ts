import AnswerQuestionUseCase from "./answer-question"
import { AnswersRepository } from "../repositories/answers-repository"

const fakeAnswersRepository: AnswersRepository = {
  create: async () => {
    return
  },
}

test("Create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const content = "New answer"
  const answer = await answerQuestion.execute({
    content,
    instructorId: "1",
    questionId: "1",
  })

  expect(answer.content).toEqual(content)
})
