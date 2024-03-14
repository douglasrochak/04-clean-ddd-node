import { MemoryAnswersRepo } from "test/memory-answers-repo"
import DeleteAnswerUseCase from "./delete-answer"
import { UniqueEntityID } from "@/core/entities"
import { makeAnswer } from "test/factories/make-answer"

describe("Delete Answer Use Case", () => {
  let repo: MemoryAnswersRepo
  let sut: DeleteAnswerUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new DeleteAnswerUseCase(repo)
  })

  it("Should be able to delete an answer", async () => {
    const id = "answer-id"
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID(id)
    )
    await repo.create(newAnswer)

    await sut.execute({
      answerId: id,
      authorId: "author-id",
    })

    expect(repo.items).toHaveLength(0)
  })

  it("Should not be able to delete an answer with different authorId", async () => {
    const id = "answer-id"
    const newAnswer = makeAnswer({}, new UniqueEntityID(id))
    await repo.create(newAnswer)

    await expect(() => {
      return sut.execute({
        answerId: id,
        authorId: "author-id",
      })
    }).rejects.toBeInstanceOf(Error)
    expect(repo.items).toHaveLength(1)
  })
})
