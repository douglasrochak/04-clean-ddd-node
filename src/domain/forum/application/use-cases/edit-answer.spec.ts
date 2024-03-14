import { MemoryAnswersRepo } from "test/memory-answers-repo"
import { makeAnswer } from "test/factories/make-answer"
import EditAnswerUseCase from "./edit-answer"
import { UniqueEntityID } from "@/core/entities"
import { NotAllowedError } from "./errors/not-allowed"

describe("Edit Answer Use Case", () => {
  let repo: MemoryAnswersRepo
  let sut: EditAnswerUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new EditAnswerUseCase(repo)
  })

  it("Should be able to edit a answer", async () => {
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

  it("Should not be able to edit a answer with different authorId", async () => {
    const ID = "answer-id"
    const CONTENT = "Test Content"

    const newAnswer = makeAnswer(
      { content: "Answer content" },
      new UniqueEntityID(ID)
    )
    await repo.create(newAnswer)

    const result = await sut.execute({
      answerId: ID,
      authorId: "author-id",
      content: CONTENT,
    })

    expect(repo.items[0]).toEqual(
      expect.objectContaining({
        content: "Answer content",
      })
    )
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
