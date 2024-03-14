import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import CreateQuestionUseCase from "./create-question"

describe("Create Question", () => {
  let repo: MemoryQuestionsRepo
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new CreateQuestionUseCase(repo)
  })

  it("should be able to create an question", async () => {
    const result = await sut.execute({
      authorId: "fake-author-id",
      title: "Question 1",
      content: "Question content",
    })

    expect(result.isRight()).toEqual(true)
    expect(repo.items[0].id).toEqual(result.value?.question.id)
  })
})
