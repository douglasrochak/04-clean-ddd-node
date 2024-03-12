import { MemoryAnswersRepo } from "test/memory-answers-repo"
import { makeAnswer } from "test/factories/make-answer"
import EditAnswerUseCase from "./edit-answer"
import { UniqueEntityID } from "@/core/entities"

describe("edit answer use case", () => {
  let repo: MemoryAnswersRepo
  let sut: EditAnswerUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new EditAnswerUseCase(repo)
  })

  it("should be able to edit a answer", async () => {
    const ID = "answer-id"
    const CONTENT = "Test Content"

    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID(ID)
    )
    await repo.create(newAnswer)

    await sut.execute({
      answerId: ID,
      authorId: "author-id",
      content: CONTENT,
    })

    expect(repo.items[0]).toEqual(
      expect.objectContaining({
        content: CONTENT,
      })
    )
  })

  it("should not be able to edit a answer with different authorId", async () => {
    const ID = "answer-id"
    const CONTENT = "Test Content"

    const newAnswer = makeAnswer(
      { content: "Answer content" },
      new UniqueEntityID(ID)
    )
    await repo.create(newAnswer)

    await expect(() => {
      return sut.execute({
        answerId: ID,
        authorId: "author-id",
        content: CONTENT,
      })
    }).rejects.toBeInstanceOf(Error)

    expect(repo.items[0]).toEqual(
      expect.objectContaining({
        content: "Answer content",
      })
    )
  })
})
