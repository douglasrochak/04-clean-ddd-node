import { MemoryAnswersRepo } from "test/memory-answers-repository"
import AnswerQuestionUseCase from "./answer-question"

describe("Answer Question Use Case", () => {
  let repo: MemoryAnswersRepo
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new AnswerQuestionUseCase(repo)
  })

  it("should be able to create an question", async () => {
    const result = await sut.execute({
      instructorId: "fake-instructor-id",
      questionId: "fake-question-id",
      content: "Answer content",
    })

    expect(result.isRight()).toEqual(true)
    expect(repo.items[0].id).toEqual(result.value?.answer.id)
  })
})
