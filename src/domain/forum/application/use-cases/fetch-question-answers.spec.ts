import { makeAnswer } from "test/factories/make-answer"
import FetchQuestionAnswersUseCase from "./fetch-question-answers"
import { MemoryAnswersRepo } from "test/memory-answers-repository"
import { UniqueEntityID } from "@/core/entities"

describe("Fetch Question Answers Use Case", () => {
  let repo: MemoryAnswersRepo
  let sut: FetchQuestionAnswersUseCase

  beforeEach(() => {
    repo = new MemoryAnswersRepo()
    sut = new FetchQuestionAnswersUseCase(repo)
  })

  it("Should be able to fetch question answers", async () => {
    const questionId = new UniqueEntityID("question-1")
    await repo.create(makeAnswer({ questionId }))
    await repo.create(makeAnswer({ questionId }))
    await repo.create(makeAnswer({ questionId }))

    const result = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it("Should be able to fetch paginated question answers", async () => {
    const questionId = new UniqueEntityID("question-1")
    for (let i = 0; i < 22; i++) {
      await repo.create(makeAnswer({ questionId }))
    }

    const result = await sut.execute({
      questionId: questionId.toString(),
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
