import { MemoryAnswersRepo } from "test/memory-answers-repo"
import AnswerQuestionUseCase from "./answer-question"

describe("Answer Question Use Case", () => {
  let repo: MemoryAnswersRepo
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new AnswerQuestionUseCase(repo)
  })

  it("should be able to create an question", async () => {
    const { answer } = await sut.execute({
      instructorId: "fake-instructor-id",
      questionId: "fake-question-id",
      content: "Answer content",
    })

    expect(answer.content).toEqual("Answer content")
    expect(repo.items[0].id).toEqual(answer.id)
  })
})
