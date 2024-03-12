import { MemoryAnswersRepo } from "test/memory-answers-repo"
import DeleteAnswerUseCase from "./delete-answer"
import { UniqueEntityID } from "@/core/entities"
import { makeAnswer } from "test/factories/make-answer"

describe("delete answer use case", () => {
  let repo: MemoryAnswersRepo
  let sut: DeleteAnswerUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new DeleteAnswerUseCase(repo)
  })

  it("should be able to delete a answer", async () => {
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

  it("should not be able to delete a answer with different authorId", async () => {
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
