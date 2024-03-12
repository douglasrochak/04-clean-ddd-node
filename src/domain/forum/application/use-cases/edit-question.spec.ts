import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import { makeQuestion } from "test/factories/make-question"
import EditQuestionUseCase from "./edit-question"
import { UniqueEntityID } from "@/core/entities"

describe("edit question use case", () => {
  let repo: MemoryQuestionsRepo
  let sut: EditQuestionUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new EditQuestionUseCase(repo)
  })

  it("should be able to edit a question", async () => {
    const ID = "question-id"
    const TITLE = "Test Question"
    const CONTENT = "Test Content"

    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID(ID)
    )
    await repo.create(newQuestion)

    await sut.execute({
      questionId: ID,
      authorId: "author-id",
      title: TITLE,
      content: CONTENT,
    })

    expect(repo.items[0]).toEqual(
      expect.objectContaining({
        title: TITLE,
      })
    )
  })

  it("should not be able to edit a question with different authorId", async () => {
    const ID = "question-id"
    const TITLE = "Test Question"
    const CONTENT = "Test Content"

    const newQuestion = makeQuestion(
      { title: "Question title" },
      new UniqueEntityID(ID)
    )
    await repo.create(newQuestion)

    await expect(() => {
      return sut.execute({
        questionId: ID,
        authorId: "author-id",
        title: TITLE,
        content: CONTENT,
      })
    }).rejects.toBeInstanceOf(Error)
    expect(repo.items[0]).toEqual(
      expect.objectContaining({
        title: "Question title",
      })
    )
  })
})
