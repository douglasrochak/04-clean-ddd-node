import { MemoryQuestionsRepo } from "test/memory-questions-repo"
import { makeQuestion } from "test/factories/make-question"
import DeleteQuestionUseCase from "./delete-question"
import { UniqueEntityID } from "@/core/entities"
import { NotAllowedError } from "./errors/not-allowed"

describe("Delete Question Use Case", () => {
  let repo: MemoryQuestionsRepo
  let sut: DeleteQuestionUseCase

  beforeEach(() => {
    repo = new MemoryQuestionsRepo()
    sut = new DeleteQuestionUseCase(repo)
  })

  it("Should be able to delete a question", async () => {
    const id = "question-id"
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID(id)
    )
    await repo.create(newQuestion)

    await sut.execute({
      questionId: id,
      authorId: "author-id",
    })

    expect(repo.items).toHaveLength(0)
  })

  it("Should not be able to delete a question with different authorId", async () => {
    const id = "question-id"
    const newQuestion = makeQuestion({}, new UniqueEntityID(id))
    await repo.create(newQuestion)

    const result = await sut.execute({
      questionId: id,
      authorId: "author-id",
    })

    expect(repo.items).toHaveLength(1)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
