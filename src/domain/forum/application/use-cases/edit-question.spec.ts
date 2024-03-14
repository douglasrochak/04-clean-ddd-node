import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import { makeQuestion } from "test/factories/make-question"
import EditQuestionUseCase from "./edit-question"
import { UniqueEntityID } from "@/core/entities"
import { NotAllowedError } from "./errors/not-allowed"

describe("Edit Question Use Case", () => {
  let repo: MemoryQuestionsRepo
  let sut: EditQuestionUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new EditQuestionUseCase(repo)
  })

  it("Should be able to edit a question", async () => {
    const ID = "question-id"
    const TITLE = "Test Question"
    const CONTENT = "Test Content"

    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID(ID)
    )
    await repo.create(newQuestion)

    const result = await sut.execute({
      questionId: ID,
      authorId: "author-id",
      title: TITLE,
      content: CONTENT,
    })

    expect(result.isRight()).toBe(true)
    expect(repo.items[0]).toEqual(
      expect.objectContaining({
        title: TITLE,
      })
    )
  })

  it("Should not be able to edit a question with different authorId", async () => {
    const ID = "question-id"
    const TITLE = "Test Question"
    const CONTENT = "Test Content"

    const newQuestion = makeQuestion(
      { title: "Question title" },
      new UniqueEntityID(ID)
    )
    await repo.create(newQuestion)

    const result = await sut.execute({
      questionId: ID,
      authorId: "author-id",
      title: TITLE,
      content: CONTENT,
    })
    expect(repo.items[0]).toEqual(
      expect.objectContaining({
        title: "Question title",
      })
    )
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
