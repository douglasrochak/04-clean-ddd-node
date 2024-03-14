import { MemoryAnswersRepo } from "test/memory-answers-repository"
import DeleteAnswerUseCase from "./delete-answer"
import { UniqueEntityID } from "@/core/entities"
import { makeAnswer } from "test/factories/make-answer"
import { NotAllowedError } from "./errors/not-allowed"

describe("Delete Answer Use Case", () => {
  let repo: MemoryAnswersRepo
  let sut: DeleteAnswerUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new DeleteAnswerUseCase(repo)
  })

  it("Should be able to delete answer", async () => {
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

  it("Should not be able to delete answer with different authorId", async () => {
    const id = "answer-id"
    const newAnswer = makeAnswer({}, new UniqueEntityID(id))
    await repo.create(newAnswer)

    const result = await sut.execute({
      answerId: id,
      authorId: "author-id",
    })

    expect(repo.items).toHaveLength(1)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
