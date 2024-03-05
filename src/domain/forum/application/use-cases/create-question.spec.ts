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
    const { question } = await sut.execute({
      authorId: "fake-author-id",
      title: "Question 1",
      content: "Question content",
    })

    expect(question.title).toEqual("Question 1")
    expect(repo.items[0].id).toEqual(question.id)
  })
})
